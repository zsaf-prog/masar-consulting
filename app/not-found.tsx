import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <div className="container">
        <h1>404</h1>
        <p className="lead">الصفحة التي تبحث عنها غير موجودة.</p>
        <Link href="/" className="btn btn-gold">العودة للرئيسية</Link>
      </div>
    </section>
  );
}
