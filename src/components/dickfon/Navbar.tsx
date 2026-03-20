import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavItem {
  label: string;
  ref?: React.RefObject<HTMLElement>;
  onClick?: () => void;
}

interface NavbarProps {
  items: NavItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const [navOpen, setNavOpen] = useState(false);

  const handleClick = (item: NavItem) => {
    setNavOpen(false);
    if (item.onClick) {
      item.onClick();
    } else if (item.ref) {
      item.ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Логотип */}
        <button
          onClick={() => handleClick(items[0])}
          className="font-oswald text-xl tracking-widest text-[#F5D060] uppercase hover:opacity-80 transition-opacity text-glow-gold"
        >
          DICKFON
        </button>

        {/* Desktop — стеклянные капсулы */}
        <div className="hidden md:flex items-center gap-3">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className="btn-nav-capsule"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setNavOpen(!navOpen)}
        >
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {navOpen && (
        <div
          className="md:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-3"
          style={{
            background: "rgba(8, 5, 16, 0.95)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className="btn-nav-capsule w-full"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
