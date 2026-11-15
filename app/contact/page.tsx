import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: `تواصل مع ${site.name} لطلب خدمة أو استفسار عبر النموذج أو الواتساب أو البريد الإلكتروني.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const cards = [
    { icon: "whatsapp" as const, title: "واتساب", value: "راسلنا مباشرة", href: `https://wa.me/${site.whatsapp}` },
    { icon: "phone" as const, title: "الهاتف", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: "mail" as const, title: "البريد الإلكتروني", value: site.email, href: `mailto:${site.email}` },
    { icon: "pin" as const, title: "العنوان", value: site.address },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link> / <span>تواصل معنا</span></nav>
          <h1>تواصل معنا</h1>
          <p className="lead">يسعدنا الإجابة على استفساراتك واستقبال طلبات الخدمة. {site.hours}.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-cards">
            {cards.map((c) => {
              const inner = (
                <>
                  <span className="service-icon"><Icon name={c.icon} size={24} /></span>
                  <div>
                    <h3>{c.title}</h3>
                    <p dir={c.icon === "phone" || c.icon === "mail" ? "ltr" : undefined}>{c.value}</p>
                  </div>
                </>
              );
              return c.href ? (
                <a key={c.title} href={c.href} className="contact-card" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={c.title} className="contact-card">{inner}</div>
              );
            })}
            <div className="social social-dark">
              {site.social.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">{s.name}</a>
              ))}
            </div>
          </div>

          <div className="form-box" id="request">
            <h2 className="h-sm">طلب خدمة أو استفسار</h2>
            <ContactForm services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
