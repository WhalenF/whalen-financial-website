/**
 * Microsoft Graph API client.
 *
 * Implements the OAuth 2.0 client credentials flow against Microsoft Entra ID
 * and exposes a thin `graphFetch` wrapper that prepends the Graph base URL and
 * a bearer token. The access token is cached in module-level memory and
 * refreshed 60s before its declared expiry.
 *
 * Spec: docs/superpowers/specs/2026-04-29-whalen-website-phase2-design.md §2.
 */

const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0";

interface CachedToken {
  value: string;
  expiresAt: number;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type?: string;
}

let cachedToken: CachedToken | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Graph API client cannot operate without it.`,
    );
  }
  return value;
}

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const tenantId = requireEnv("GRAPH_TENANT_ID");
  const clientId = requireEnv("GRAPH_CLIENT_ID");
  const clientSecret = requireEnv("GRAPH_CLIENT_SECRET");

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to acquire Graph access token: ${response.status} ${response.statusText} — ${errorBody}`,
    );
  }

  const data = (await response.json()) as TokenResponse;
  if (!data.access_token || typeof data.expires_in !== "number") {
    throw new Error(
      `Malformed token response from Microsoft Entra ID: ${JSON.stringify(data)}`,
    );
  }

  cachedToken = {
    value: data.access_token,
    // Refresh 60s before the declared expiry to avoid using a token that
    // expires mid-request.
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return cachedToken.value;
}

export async function graphFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const token = await getAccessToken();
  const url = path.startsWith("http") ? path : `${GRAPH_BASE_URL}${path}`;

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Graph request failed: ${init?.method ?? "GET"} ${url} — ` +
        `${response.status} ${response.statusText} — ${errorBody}`,
    );
  }

  return response;
}
