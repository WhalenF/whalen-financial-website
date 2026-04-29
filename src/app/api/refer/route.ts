import { referralSchema } from "@/lib/forms/schemas";
import { appendReferralRow } from "@/lib/db/queries";

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

  try {
    await appendReferralRow({
      ...parsed.data,
      submitted_at: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    });
  } catch (err) {
    console.error("[refer] db error:", err);
    return Response.json(
      { ok: false, error: "Submission failed — please contact us directly" },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
