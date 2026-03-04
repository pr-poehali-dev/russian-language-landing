import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const DICKFON_DESCRIPTION = "Хотите удивить друзей и взорвать любую вечеринку? Представляем вашему вниманию самый скандальный и веселый гаджет — микрофон в виде члена! Эта модель, которую в народе ласково называют «Писькафон» или Dickfon, создана для тех, кто любит петь громко и смеяться от души. Это не просто шутка, а полноценный микрофон-фаллос, который отлично справляется со своими прямыми обязанностями. Благодаря микрофону в форме члена ваш вокал будет звучать чисто и громко, а необычный дизайн гарантированно станет хитом вечера.";

const PRODUCTS = [
  {
    id: 1,
    name: "DICKFON для Караоке",
    category: "Хит вечеринок",
    price: "15 000 ₽",
    volume: "Встроенный динамик · Беспроводной",
    badge: "Хит",
    color: "#D4A843",
    description: DICKFON_DESCRIPTION,
    details: [
      { label: "Тип", value: "Для караоке" },
      { label: "Подключение", value: "Bluetooth" },
      { label: "Батарея", value: "До 6 часов" },
      { label: "Подарок", value: "Упаковка" },
    ],
  },
  {
    id: 2,
    name: "DICKFON Петличка",
    category: "Для контента",
    price: "12 000 ₽",
    volume: "Петличный микрофон · Компактный",
    badge: "Новинка",
    color: "#A8C4D4",
    description: DICKFON_DESCRIPTION,
    details: [
      { label: "Тип", value: "Петличка" },
      { label: "Подключение", value: "3.5 мм / USB-C" },
      { label: "Длина", value: "120 см" },
      { label: "Подарок", value: "Упаковка" },
    ],
  },
  {
    id: 3,
    name: "DICKFON Эксклюзив",
    category: "Лимитированная серия",
    price: "По запросу",
    volume: "Премиум · Ограниченный тираж",
    badge: "Лимитед",
    color: "#C47B3A",
    description: DICKFON_DESCRIPTION,
    details: [
      { label: "Тип", value: "Эксклюзив" },
      { label: "Серия", value: "Лимитированная" },
      { label: "Комплект", value: "Полный" },
      { label: "Подарок", value: "VIP упаковка" },
    ],
  },
];

export default function Index() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [ageDenied, setAgeDenied] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const homeRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const contactsRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    setNavOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAgeCheck = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    if (age >= 18) {
      setAgeVerified(true);
    } else {
      setAgeDenied(true);
    }
  };

  if (ageDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0a2e]">
        <div className="text-center px-6">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="font-oswald text-3xl text-[#F5D060] mb-4 uppercase tracking-widest">
            Доступ запрещён
          </h2>
          <p className="font-rubik text-white/70 text-lg max-w-sm mx-auto">
            Вам должно быть не менее 18 лет для посещения данного сайта.
          </p>
        </div>
      </div>
    );
  }

  if (!ageVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0a2e] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4B0082]/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5D060]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-md w-full">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#F5D060]/60 rounded-full flex items-center justify-center">
              <span className="font-oswald text-[#F5D060] text-2xl font-bold tracking-tight leading-none">18+</span>
            </div>
            <h1 className="font-oswald text-4xl md:text-5xl text-white uppercase tracking-[0.15em] mb-3">
              Добро пожаловать
            </h1>
            <p className="font-cormorant text-[#F5D060] text-xl italic">
              Магазин элитных напитков
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="font-rubik text-white/80 text-sm mb-6 leading-relaxed">
              Данный сайт содержит информацию об алкогольной продукции.
              <br />
              Пожалуйста, подтвердите свой возраст.
            </p>

            <div className="mb-2 text-left">
              <label className="font-oswald text-[#F5D060]/80 text-xs uppercase tracking-widest mb-2 block">
                Дата рождения
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-rubik text-base outline-none focus:border-[#F5D060]/60 focus:bg-white/15 transition-all [color-scheme:dark]"
              />
            </div>

            <p className="font-rubik text-white/40 text-xs mb-6 text-left">
              Формат: день / месяц / год
            </p>

            <button
              onClick={handleAgeCheck}
              disabled={!birthDate}
              className="w-full bg-[#F5D060] hover:bg-[#F0C830] disabled:opacity-40 disabled:cursor-not-allowed text-[#1a0a2e] font-oswald text-lg uppercase tracking-widest py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,208,96,0.4)]"
            >
              Подтвердить возраст
            </button>
          </div>

          <p className="font-rubik text-white/30 text-xs mt-6">
            Продажа алкоголя лицам до 18 лет запрещена
          </p>
        </div>
      </div>
    );
  }

  const selectedProduct =
    activeProduct !== null ? PRODUCTS.find((p) => p.id === activeProduct) : null;

  return (
    <div className="min-h-screen bg-[#1a0a2e] text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a0a2e]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo(homeRef)}
            className="font-oswald text-xl tracking-widest text-[#F5D060] uppercase hover:opacity-80 transition-opacity"
          >
            DICKFON
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Главная", ref: homeRef },
              { label: "Товары", ref: productsRef },
              { label: "Контакты", ref: contactsRef },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.ref)}
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
            {[
              { label: "Главная", ref: homeRef },
              { label: "Товары", ref: productsRef },
              { label: "Контакты", ref: contactsRef },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.ref)}
                className="font-rubik text-sm text-white/70 hover:text-[#F5D060] transition-colors uppercase tracking-widest text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        ref={homeRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#4B0082]/40 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5D060]/8 rounded-full blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(245,208,96,0.5) 40px, rgba(245,208,96,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(245,208,96,0.5) 40px, rgba(245,208,96,0.5) 41px)`,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-cormorant text-[#F5D060] text-lg italic tracking-widest mb-4">
            — самый скандальный гаджет —
          </p>
          <h1
            className="font-oswald text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none mb-6"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #F5D060 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DICK
            <br />
            <span style={{ WebkitTextFillColor: "white" }}>FON</span>
          </h1>
          <p className="font-rubik text-white/60 text-lg md:text-xl max-w-lg mx-auto mb-10">
            Идеальный подарок для мальчишника, девичника, корпоратива или Дня рождения. Взорви вечеринку с «Писькафоном»!
          </p>
          <button
            onClick={() => scrollTo(productsRef)}
            className="inline-flex items-center gap-3 bg-[#F5D060] hover:bg-[#F0C830] text-[#1a0a2e] font-oswald text-base uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,208,96,0.5)] hover:scale-105"
          >
            Смотреть товары
            <Icon name="ArrowDown" size={18} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/30" />
        </div>
      </section>

      {/* PRODUCTS */}
      <section ref={productsRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-cormorant text-[#F5D060] italic text-lg mb-3">наши модели</p>
            <h2 className="font-oswald text-5xl md:text-6xl uppercase tracking-tight text-white">
              Dickfon
            </h2>
            <div className="w-16 h-px bg-[#F5D060] mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#F5D060]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2 cursor-pointer"
                onClick={() => setActiveProduct(product.id)}
              >
                <div
                  className="h-56 flex items-center justify-center relative"
                  style={{
                    background: `radial-gradient(circle at center, ${product.color}20 0%, transparent 70%)`,
                  }}
                >
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
                    style={{
                      background: `radial-gradient(circle, ${product.color}25, transparent)`,
                      boxShadow: `0 0 40px ${product.color}25`,
                    }}
                  >
                    🎤
                  </div>
                  <span className="absolute top-4 right-4 font-oswald text-xs uppercase tracking-widest bg-[#F5D060] text-[#1a0a2e] px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                </div>

                <div className="p-6">
                  <p className="font-rubik text-white/40 text-xs uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-oswald text-2xl text-white uppercase tracking-wide mb-1 group-hover:text-[#F5D060] transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-rubik text-white/50 text-sm mb-4">{product.volume}</p>

                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-2xl text-[#F5D060]">{product.price}</span>
                    <span className="flex items-center gap-1 font-rubik text-xs text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-widest">
                      Подробнее
                      <Icon name="ArrowRight" size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section ref={contactsRef} className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-cormorant text-[#F5D060] italic text-lg mb-3">свяжитесь с нами</p>
            <h2 className="font-oswald text-5xl md:text-6xl uppercase tracking-tight text-white">
              Контакты
            </h2>
            <div className="w-16 h-px bg-[#F5D060] mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67", sub: "Пн–Вс, 9:00–22:00" },
              { icon: "MapPin", label: "Адрес", value: "Москва, ул. Арбат, 12", sub: "Самовывоз доступен" },
              { icon: "Mail", label: "Email", value: "info@elitlavka.ru", sub: "Ответим за 2 часа" },
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

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="font-oswald text-2xl uppercase tracking-widest text-white mb-6 text-center">
              Написать нам
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-rubik text-sm placeholder-white/30 outline-none focus:border-[#F5D060]/60 transition-all"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-rubik text-sm placeholder-white/30 outline-none focus:border-[#F5D060]/60 transition-all"
              />
            </div>
            <textarea
              placeholder="Ваш вопрос или заказ..."
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-rubik text-sm placeholder-white/30 outline-none focus:border-[#F5D060]/60 transition-all resize-none mb-4"
            />
            <button className="w-full bg-[#F5D060] hover:bg-[#F0C830] text-[#1a0a2e] font-oswald text-base uppercase tracking-widest py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,208,96,0.4)]">
              Отправить
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6 text-center">
        <p className="font-rubik text-white/30 text-sm">
          © 2024 Элит·Лавка — Продажа алкоголя лицам до 18 лет запрещена
        </p>
      </footer>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveProduct(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative bg-[#1e0d35] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <Icon name="X" size={18} className="text-white/70" />
            </button>

            <div
              className="h-48 rounded-t-3xl flex items-center justify-center relative"
              style={{
                background: `radial-gradient(circle at center, ${selectedProduct.color}25 0%, #1a0a2e 80%)`,
              }}
            >
              <span className="text-7xl">🍶</span>
              <span className="absolute top-4 left-4 font-oswald text-xs uppercase tracking-widest bg-[#F5D060] text-[#1a0a2e] px-3 py-1 rounded-full">
                {selectedProduct.badge}
              </span>
            </div>

            <div className="p-8">
              <p className="font-rubik text-white/40 text-xs uppercase tracking-widest mb-1">
                {selectedProduct.category}
              </p>
              <h2 className="font-oswald text-4xl uppercase tracking-wide text-white mb-2">
                {selectedProduct.name}
              </h2>
              <p className="font-rubik text-white/50 text-sm mb-6">{selectedProduct.volume}</p>

              <p className="font-rubik text-white/75 text-base leading-relaxed mb-8">
                {selectedProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {selectedProduct.details.map((d) => (
                  <div key={d.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="font-rubik text-white/40 text-xs uppercase tracking-widest mb-1">
                      {d.label}
                    </p>
                    <p className="font-oswald text-white text-lg">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-oswald text-3xl text-[#F5D060]">{selectedProduct.price}</span>
                <button className="bg-[#F5D060] hover:bg-[#F0C830] text-[#1a0a2e] font-oswald text-base uppercase tracking-widest px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,208,96,0.4)]">
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}