import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { services, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.intro,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link> / <Link href="/services">خدماتنا</Link> / <span>{service.title}</span>
          </nav>
          <div className="page-hero-title">
            <span className="service-icon service-icon-lg"><Icon name={service.icon} size={34} /></span>
            <h1>{service.title}</h1>
          </div>
          <p className="lead">{service.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <h2 className="h-sm">الخدمات الفرعية</h2>
            <div className="subs">
              {service.subs.map((sub, i) => (
                <article key={sub.title} className="sub-card">
                  <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{sub.title}</h3>
                  <p>{sub.desc}</p>
                </article>
              ))}
            </div>

            <h2 className="h-sm">ما الذي تحصل عليه</h2>
            <ul className="benefits">
              {service.benefits.map((b) => (
                <li key={b}><span className="check"><Icon name="check" size={16} /></span>{b}</li>
              ))}
            </ul>
          </div>

          <aside className="sticky-box" id="request">
            <h2 className="h-sm">اطلب هذه الخدمة</h2>
            <p className="muted-dark">املأ النموذج وسيتواصل معك مستشار مختص.</p>
            <ContactForm services={services} defaultService={service.title} />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <header className="section-head"><h2>خدمات أخرى قد تهمك</h2></header>
          <div className="services-grid">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
                <span className="service-icon"><Icon name={s.icon} size={28} /></span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="more">التفاصيل <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
