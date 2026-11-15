// Reçoit les demandes du formulaire et les envoie par e-mail via Resend.
// Variables d'environnement (Vercel → Settings → Environment Variables) :
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (optionnel)
// Sans ces variables, le formulaire fonctionne en mode démo (pas d'e-mail envoyé).

const esc = (s: unknown) =>
  String(s ?? "")
    .slice(0, 5000)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!body) return Response.json({ error: "طلب غير صالح" }, { status: 400 });

  // Pot de miel anti-spam
  if (body.website) return Response.json({ ok: true });

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (name.length < 2) return Response.json({ error: "يرجى إدخال الاسم" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: "البريد الإلكتروني غير صحيح" }, { status: 400 });
  if (message.length < 10) return Response.json({ error: "يرجى كتابة تفاصيل الطلب" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    console.log("[contact] demo mode — request received:", { name, email, service: body.service });
    return Response.json({ ok: true, demo: true });
  }

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7">
      <h2>طلب جديد من الموقع</h2>
      <p><b>الاسم:</b> ${esc(name)}</p>
      <p><b>المنشأة:</b> ${esc(body.company)}</p>
      <p><b>البريد:</b> ${esc(email)}</p>
      <p><b>الجوال:</b> ${esc(body.phone)}</p>
      <p><b>الخدمة:</b> ${esc(body.service) || "استفسار عام"}</p>
      <p><b>التفاصيل:</b><br>${esc(message).replace(/\n/g, "<br>")}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `طلب خدمة: ${body.service || "استفسار عام"} — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] resend error", res.status, await res.text());
    return Response.json({ error: "تعذّر إرسال الطلب، حاول لاحقًا" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
