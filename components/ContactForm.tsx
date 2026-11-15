"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({
  services,
  defaultService = "",
}: {
  services: { slug: string; title: string }[];
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "تعذّر إرسال الطلب");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <strong>تم استلام طلبك بنجاح ✓</strong>
        <p>سيتواصل معك أحد مستشارينا خلال يوم عمل واحد.</p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <label>
          الاسم الكامل *
          <input name="name" required minLength={2} autoComplete="name" />
        </label>
        <label>
          اسم المنشأة
          <input name="company" autoComplete="organization" />
        </label>
      </div>
      <div className="form-row">
        <label>
          البريد الإلكتروني *
          <input name="email" type="email" required dir="ltr" autoComplete="email" />
        </label>
        <label>
          رقم الجوال
          <input name="phone" type="tel" dir="ltr" autoComplete="tel" />
        </label>
      </div>
      <label>
        الخدمة المطلوبة
        <select name="service" defaultValue={defaultService}>
          <option value="">استفسار عام</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        تفاصيل الطلب *
        <textarea name="message" required minLength={10} rows={5} />
      </label>
      {/* champ anti-spam invisible */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {status === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "جارٍ الإرسال…" : "إرسال الطلب"}
      </button>
    </form>
  );
}
