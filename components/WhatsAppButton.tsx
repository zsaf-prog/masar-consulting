import { site } from "@/lib/site";
import Icon from "./Icon";

export default function WhatsAppButton() {
  const text = encodeURIComponent(`مرحبًا ${site.shortName}، أرغب في الاستفسار عن خدماتكم.`);
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${site.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
