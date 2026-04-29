import { referralSchema } from "@/lib/forms/schemas";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, errors: { formErrors: ["Invalid JSON body"], fieldErrors: {} } },
      { status: 400 }
    );
  }

  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  console.log("[refer]", JSON.stringify(parsed.data));
  return Response.json({ ok: true });
}
