import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { reasons, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعرّف على ${site.name}: قصتنا ورؤيتنا ورسالتنا وقيمنا في خدمة الشركات ورواد الأعمال.`,
  alternates: { canonical: "/about" },
};

const values = [
  { title: "النزاهة", desc: "نتعامل بشفافية ونلتزم بما نعد به." },
  { title: "الإتقان", desc: "نهتم بالتفاصيل لأن الأخطاء الصغيرة مكلفة." },
  { title: "الشراكة", desc: "نجاح عملائنا هو مقياس نجاحنا." },
  { title: "السرية", desc: "نحمي بيانات عملائنا كما نحمي بياناتنا." },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link> / <span>من نحن</span></nav>
          <h1>من نحن</h1>
          <p className="lead">{site.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">قصتنا</span>
            <h2>خبرة ميدانية في خدمة قرارك</h2>
            <p>
              انطلقت {site.shortName} من قناعة بسيطة: الاستشارة الجيدة لا تنتهي بتقرير، بل بنتيجة يلمسها
              العميل. لذلك يجمع فريقنا بين مستشارين عملوا سنوات داخل الشركات، ومختصين في المالية والموارد
              البشرية والتقنية.
            </p>
            <p>
              اليوم نخدم مئات المنشآت في قطاعات مختلفة، من المشاريع الناشئة إلى الشركات المتوسطة، ونقدّم
              لها حلولًا متكاملة تغطي التأسيس والإدارة والمحاسبة والاستشارات.
            </p>
          </div>
          <ul className="stats stats-box">
            {site.stats.map((s) => (
              <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container vm-grid">
          <article className="vm-card">
            <span className="eyebrow">رؤيتنا</span>
            <h2>أن تجد كل منشأة طموحة مسارها الواضح نحو النمو</h2>
            <p>نطمح إلى بيئة أعمال تكون فيها الإجراءات الإدارية ميسّرة، ويتفرغ فيها رواد الأعمال للإبداع.</p>
          </article>
          <article className="vm-card vm-dark">
            <span className="eyebrow">رسالتنا</span>
            <h2>استشارات عملية تتحول إلى نتائج ملموسة</h2>
            <p>نقدّم خدمات أعمال وإدارة واستشارات متكاملة بجودة عالية وشفافية تامة، مبنية على فهم عميق لاحتياج كل عميل.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-head">
            <span className="eyebrow">قيمنا</span>
            <h2>ما يوجّه عملنا كل يوم</h2>
          </header>
          <div className="values">
            {values.map((v) => (
              <div key={v.title} className="value">
                <span className="check"><Icon name="check" size={18} /></span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container reasons reasons-wide">
          {reasons.map((r) => (
            <div key={r.title} className="reason">
              <span className="check"><Icon name="check" size={18} /></span>
              <div><h3>{r.title}</h3><p>{r.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <h2>لنتحدث عن منشأتك</h2>
            <p>جلسة تعارف مجانية لفهم احتياجك واقتراح الحل الأنسب.</p>
          </div>
          <div className="cta-actions">
            <Link href="/contact#request" className="btn btn-gold">احجز جلسة</Link>
          </div>
        </div>
      </section>
    </>
  );
}
