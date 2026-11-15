import Link from "next/link";
import Icon from "@/components/Icon";
import { faqs, packages, reasons, sectors, services, site, steps } from "@/lib/site";

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="m-hero">
        <div className="container m-hero-grid">
          <div>
            <span className="pill">استشارات · تطوير أعمال · تنظيم مؤسسي</span>
            <h1>
              كل منشأة ناجحة
              <br />
              بدأت <mark>بمسار واضح</mark>
            </h1>
            <p className="lead">
              نساعد الشركات ورواد الأعمال على اتخاذ قرارات أذكى، وتنظيم أعمالهم، والنمو بثقة، من خلال
              فريق من المستشارين ذوي الخبرة الميدانية.
            </p>
            <div className="hero-actions">
              <Link href="/contact#request" className="btn btn-primary">احجز جلستك المجانية</Link>
              <Link href="/services" className="btn btn-ghost">خدماتنا</Link>
            </div>
            <ul className="m-stats">
              {site.stats.map((s) => (
                <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
              ))}
            </ul>
          </div>

          <div className="m-visual" aria-hidden="true">
            <svg viewBox="0 0 420 420" className="m-path">
              <circle cx="210" cy="210" r="200" className="ring" />
              <circle cx="210" cy="210" r="140" className="ring" />
              <path d="M60 320 C 140 300, 120 200, 210 200 S 300 110, 360 90" className="route" />
              <circle cx="60" cy="320" r="10" className="node" />
              <circle cx="210" cy="200" r="10" className="node" />
              <circle cx="360" cy="90" r="14" className="node node-end" />
            </svg>
            <div className="m-float m-float-1"><Icon name="chart" size={20} /> نمو الإيرادات <b>+38%</b></div>
            <div className="m-float m-float-2"><Icon name="check" size={20} /> خطة جاهزة للتنفيذ</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-head section-head-row">
            <div>
              <span className="eyebrow">ماذا نقدّم</span>
              <h2>ست مجالات استشارية متكاملة</h2>
            </div>
            <Link href="/services" className="btn btn-outline btn-sm">كل الخدمات <Icon name="arrow" size={16} /></Link>
          </header>
          <div className="m-services">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="m-service">
                <span className="service-icon"><Icon name={s.icon} size={26} /></span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </div>
                <span className="m-arrow"><Icon name="arrow" size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <header className="section-head">
            <span className="eyebrow">منهجيتنا</span>
            <h2>من التشخيص إلى النتائج</h2>
          </header>
          <ol className="m-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-head center">
            <span className="eyebrow">باقات مرنة</span>
            <h2>اختر البداية المناسبة لمنشأتك</h2>
            <p>الأسعار بالريال وتقديرية؛ نحدد السعر النهائي بعد جلسة التشخيص.</p>
          </header>
          <div className="packages">
            {packages.map((p) => (
              <article key={p.name} className={`package ${p.featured ? "featured" : ""}`}>
                {p.featured && <span className="badge">الأكثر طلبًا</span>}
                <h3>{p.name}</h3>
                <p className="package-for">{p.for}</p>
                <p className="price">{p.price} {p.price.startsWith("من") && <small>ريال</small>}</p>
                <ul>
                  {p.features.map((f) => <li key={f}><Icon name="check" size={16} /> {f}</li>)}
                </ul>
                <Link href="/contact#request" className={`btn ${p.featured ? "btn-accent" : "btn-outline"}`}>اطلب الباقة</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container split">
          <div>
            <span className="eyebrow">لماذا مسار</span>
            <h2>شركاء في النتيجة، لا مجرد مستشارين</h2>
            <ul className="chips chips-dark">
              {sectors.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="reasons">
            {reasons.map((r) => (
              <div key={r.title} className="reason">
                <span className="check"><Icon name="check" size={18} /></span>
                <div><h3>{r.title}</h3><p>{r.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <header>
            <span className="eyebrow">الأسئلة الشائعة</span>
            <h2>لديك سؤال؟</h2>
            <p className="muted-dark">إن لم تجد إجابتك هنا، راسلنا مباشرة عبر الواتساب.</p>
            <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> اسألنا الآن
            </a>
          </header>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <h2>ابدأ مسارك اليوم</h2>
            <p>جلسة تشخيص مجانية مدتها 30 دقيقة مع أحد مستشارينا.</p>
          </div>
          <div className="cta-actions">
            <Link href="/contact#request" className="btn btn-accent">احجز الجلسة</Link>
          </div>
        </div>
      </section>
    </>
  );
}
