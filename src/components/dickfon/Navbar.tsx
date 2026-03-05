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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a0a2e]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => handleClick(items[0])}
          className="font-oswald text-xl tracking-widest text-[#F5D060] uppercase hover:opacity-80 transition-opacity"
        >
          DICKFON
        </button>

        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className="font-rubik text-sm text-white/70 hover:text-[#F5D060] transition-colors uppercase tracking-widest"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setNavOpen(!navOpen)}
        >
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {navOpen && (
        <div className="md:hidden bg-[#1a0a2e] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className="font-rubik text-sm text-white/70 hover:text-[#F5D060] transition-colors uppercase tracking-widest text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}