import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "تأسيس الشركات، الخدمات الحكومية، الخدمات الإدارية، المحاسبة والضرائب، الاستشارات ودراسات الجدوى، ودعم رواد الأعمال.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link> / <span>خدماتنا</span></nav>
          <h1>خدماتنا</h1>
          <p className="lead">حلول متكاملة لكل مرحلة من مراحل منشأتك، من الفكرة إلى التوسع.</p>
        </div>
      </section>

      <section className="section">
        <div className="container services-list">
          {services.map((s) => (
            <article key={s.slug} className="service-row">
              <div className="service-row-head">
                <span className="service-icon"><Icon name={s.icon} size={28} /></span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.short}</p>
                </div>
              </div>
              <ul className="sub-list">
                {s.subs.map((sub) => (
                  <li key={sub.title}><Icon name="check" size={16} /> {sub.title}</li>
                ))}
              </ul>
              <Link href={`/services/${s.slug}`} className="btn btn-outline btn-sm">
                تفاصيل الخدمة <Icon name="arrow" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
