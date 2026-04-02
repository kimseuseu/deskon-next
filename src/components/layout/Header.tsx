"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { navigation, NavItem } from "@/data/navigation";
import MobileNav from "./MobileNav";

export default function Header() {
  const router = useRouter();
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if current page has a dark hero (homepage, service pages, etc.)
    const checkScroll = () => {
      const heroEl = document.querySelector("[data-hero-dark]");
      if (heroEl) {
        // Transparent header when inside the dark hero area
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setScrolled(heroBottom <= 80); // 80 = header height
      } else {
        // No dark hero: always scrolled (white bg)
        setScrolled(true);
      }
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          mobileOpen ? "opacity-0 pointer-events-none" : ""
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-end gap-2 shrink-0">
            <Image
              src="/images/ex_aovo_symbol.png"
              alt="AOVO"
              width={32}
              height={40}
              className={`h-10 w-auto object-contain transition-all duration-500 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
            <span className="flex items-baseline gap-1.5 -mb-[2px]">
              <span style={{ fontFamily: "var(--font-syne), sans-serif" }} className={`text-3xl font-semibold tracking-tight leading-none transition-colors duration-500 ${
                scrolled ? "text-primary" : "text-white"
              }`}>
                AOVO
              </span>
              <span style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }} className={`text-sm font-normal tracking-wide leading-none transition-colors duration-500 ${
                scrolled ? "text-primary/50" : "text-white/50"
              }`}>
                group
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2.5 font-paperlogy text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                    activeDropdown === index
                      ? "text-accent"
                      : scrolled
                        ? "text-primary/80 hover:text-primary"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 origin-left ${
                      activeDropdown === index ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      activeDropdown === index
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-xl shadow-black/8 border border-gray-100/80 py-2 min-w-[240px] overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <span className="text-[11px] font-medium uppercase tracking-widest text-accent/70">
                          {item.labelEn}
                        </span>
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-surface transition-colors duration-150 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent group-hover:scale-125 transition-all duration-150" />
                          <span className="font-medium whitespace-nowrap">{child.label}</span>
                          <span className="ml-auto text-[11px] text-gray-400 group-hover:text-accent/60 transition-colors whitespace-nowrap">
                            {child.labelEn}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex items-center">
              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ${
                  searchOpen ? "w-56 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="상품 검색..."
                    className="w-full h-9 pl-3 pr-2 text-sm bg-surface border border-gray-200 rounded-full outline-none focus:border-accent transition-colors"
                    onBlur={() => {
                      if (!searchQuery) setTimeout(() => setSearchOpen(false), 150);
                    }}
                  />
                </form>
              </div>
              <button
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) {
                    router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  } else {
                    setSearchOpen(!searchOpen);
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }
                }}
                className={`p-2.5 rounded-full transition-colors duration-200 group ${scrolled ? "hover:bg-surface" : "hover:bg-white/10"}`}
                aria-label="검색"
              >
                <svg
                  className={`w-5 h-5 transition-colors duration-500 ${scrolled ? "text-primary/70 group-hover:text-primary" : "text-white/80 group-hover:text-white"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className={`relative p-2.5 rounded-full transition-colors duration-200 group ${scrolled ? "hover:bg-surface" : "hover:bg-white/10"}`}
              aria-label="장바구니"
            >
              <svg
                className={`w-5 h-5 transition-colors duration-500 ${scrolled ? "text-primary/70 group-hover:text-primary" : "text-white/80 group-hover:text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-bold leading-none px-1">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-colors duration-200 ${scrolled ? "hover:bg-surface" : "hover:bg-white/10"}`}
              aria-label="메뉴"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                    scrolled ? "bg-primary" : "bg-white"
                  } ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`}
                />
                <span
                  className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                    scrolled ? "bg-primary" : "bg-white"
                  } ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                    scrolled ? "bg-primary" : "bg-white"
                  } ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
