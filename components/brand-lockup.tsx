import Image from "next/image";
import Link from "next/link";

export function BrandSymbol({ className = "brand-symbol", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/orchard-mark.png"
      alt=""
      aria-hidden="true"
      className={className}
      width={512}
      height={512}
      sizes="42px"
      priority={priority}
    />
  );
}

export function BrandLockup({ href, footer = false }: { href: string; footer?: boolean }) {
  return (
    <Link className={footer ? "brand footer-brand" : "brand"} href={href} aria-label="Orchard to Global home">
      <BrandSymbol priority={!footer} />
      <span className="brand-name">Orchard <i>to</i> Global</span>
    </Link>
  );
}
