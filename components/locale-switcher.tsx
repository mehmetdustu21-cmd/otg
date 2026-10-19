import Link from "next/link";
import type { Locale } from "@/lib/copy";

const options: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "nl", label: "NL", name: "Nederlands" }
];

export function LocaleSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav className="locale-switcher" aria-label={label}>
      {options.map((option) => (
        <Link
          key={option.code}
          href={`/${option.code}`}
          hrefLang={option.code}
          aria-label={option.name}
          aria-current={current === option.code ? "page" : undefined}
          className={current === option.code ? "active" : undefined}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
