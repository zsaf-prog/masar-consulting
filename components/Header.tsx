"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label={site.name}>
          <span className="logo-mark">{site.shortName.charAt(0)}</span>
          <span className="logo-text">{site.name}</span>
        </Link>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="القائمة"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`nav ${open ? "open" : ""}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact#request" className="btn btn-primary btn-sm">
            احجز استشارة
          </Link>
        </nav>
      </div>
    </header>
  );
}
