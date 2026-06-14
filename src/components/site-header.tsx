"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { primaryNavigation, secondaryNavigation } from "@/data/navigation";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("studio-theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("studio-theme", theme);
  }, [theme]);

  const nextTheme = theme === "light" ? "dark" : "light";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand-mark" aria-label="Ray Studio home">
        Ray Studio
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {primaryNavigation.map((item) => (
          <Link
            aria-current={isActiveRoute(pathname, item.href) ? "page" : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className="icon-button"
          aria-label={`Switch to ${nextTheme} theme`}
          onClick={() => setTheme(nextTheme)}
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link href="/contact" className="contact-button">
          <Mail size={16} />
          Contact
        </Link>
        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-site-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen ? (
        <div className="mobile-nav-panel" id="mobile-site-navigation">
          <nav aria-label="Mobile primary navigation">
            {primaryNavigation.map((item) => (
              <Link
                aria-current={isActiveRoute(pathname, item.href) ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                <span>{item.label}</span>
                <small>{item.description}</small>
              </Link>
            ))}
          </nav>
          <div className="mobile-nav-secondary" aria-label="Mobile secondary navigation">
            {secondaryNavigation.map((item) => (
              <Link href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
