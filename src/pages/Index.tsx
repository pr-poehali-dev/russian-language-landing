import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import AgeGate, { AgeDenied } from "@/components/dickfon/AgeGate";
import Navbar from "@/components/dickfon/Navbar";
import ProductsSection from "@/components/dickfon/ProductsSection";
import ProductModal from "@/components/dickfon/ProductModal";
import { PRODUCTS, DAYS, MONTHS, YEARS } from "@/components/dickfon/data";

export default function Index() {
  const [ageVerified, setAgeVerified] = useState(() => sessionStorage.getItem("ageVerified") === "true");
  const [ageDenied, setAgeDenied] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(10);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  const homeRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const contactsRef = useRef<HTMLElement>(null);

  const handleAgeCheck = () => {
    const d = DAYS[dayIndex];
    const m = monthIndex + 1;
    const y = YEARS[yearIndex];
    const birth = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const diff = today.getMonth() - birth.getMonth();
    if (diff < 0 || (diff === 0 && today.getDate() < birth.getDate())) age--;
    if (age >= 18) {
      sessionStorage.setItem("ageVerified", "true");
      setAgeVerified(true);
    } else {
      setAgeDenied(true);
    }
  };

  const scrollToContacts = () => {
    setActiveProduct(null);
    contactsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (ageDenied) return <AgeDenied />;

  if (!ageVerified) {
    return (
      <AgeGate
        dayIndex={dayIndex}
        monthIndex={monthIndex}
        yearIndex={yearIndex}
        onDayChange={setDayIndex}
        onMonthChange={setMonthIndex}
        onYearChange={setYearIndex}
        onConfirm={handleAgeCheck}
      />
    );
  }

  const selectedProduct = activeProduct !== null
    ? PRODUCTS.find((p) => p.id === activeProduct)
    : null;

  const navItems = [
    { label: "Главная", ref: homeRef },
    { label: "Товары", ref: productsRef },
    { label: "Контакты", ref: contactsRef },
  ];

  return (
    <div className="min-h-screen bg-[#1a0a2e] text-white overflow-x-hidden">
      <Navbar items={navItems} />

      <ProductsSection
        homeRef={homeRef}
        productsRef={productsRef}
        onProductClick={setActiveProduct}
      />

      {/* CONTACTS */}
      <section id="contacts-section" ref={contactsRef} className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-cormorant text-[#F5D060] italic text-lg mb-3">свяжитесь с нами</p>
            <h2 className="font-oswald text-5xl md:text-6xl uppercase tracking-tight text-white">
              Контакты
            </h2>
            <div className="w-16 h-px bg-[#F5D060] mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (993) 103-07-83", sub: "Круглосуточно, без выходных" },
              { icon: "Globe", label: "Где найти", value: "Ищите DICKFON в сети", sub: "Интернет-магазин" },
              { icon: "Mail", label: "Email", value: "dickfon88@gmail.com", sub: "Ответим быстро" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#F5D060]/30 transition-all"
              >
                <div className="w-12 h-12 bg-[#F5D060]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={c.icon} size={20} className="text-[#F5D060]" />
                </div>
                <p className="font-oswald text-xs uppercase tracking-widest text-white/40 mb-1">{c.label}</p>
                <p className="font-rubik text-white text-base mb-1">{c.value}</p>
                <p className="font-rubik text-white/40 text-sm">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6 text-center">
        <p className="font-rubik text-white/30 text-sm">
          Вся информация на сайте охраняется авторским правом, копирование запрещено
        </p>
      </footer>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setActiveProduct(null)}
          onOrder={scrollToContacts}
        />
      )}
    </div>
  );
}