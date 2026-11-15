import Link from "next/link";
import { services, site } from "@/lib/site";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="logo logo-light">
            <span className="logo-mark">{site.shortName.charAt(0)}</span>
            <span className="logo-text">{site.name}</span>
          </Link>
          <p className="footer-about">{site.description}</p>
          <div className="social">
            {site.social.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3>خدماتنا</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>روابط</h3>
          <ul>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/services">جميع الخدمات</Link></li>
            <li><Link href="/contact#request">طلب خدمة</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h3>تواصل</h3>
          <ul className="contact-list">
            <li><Icon name="phone" size={18} /><a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr">{site.phone}</a></li>
            <li><Icon name="mail" size={18} /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><Icon name="pin" size={18} /><span>{site.address}</span></li>
            <li><Icon name="clock" size={18} /><span>{site.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.</span>
        <span>موقع تجريبي لأغراض العرض{site.credit ? ` — ${site.credit}` : ""}</span>
      </div>
    </footer>
  );
}
