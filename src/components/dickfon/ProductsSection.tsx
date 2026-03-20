import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS, Product } from "./data";

// Цвета неонового свечения снизу для каждого товара
const CARD_GLOW: Record<number, string> = {
  1: "rgba(220, 160, 40, 0.7)",
  2: "rgba(40, 160, 220, 0.65)",
  3: "rgba(200, 80, 20, 0.65)",
};

interface ProductsSectionProps {
  homeRef: React.RefObject<HTMLElement>;
  productsRef: React.RefObject<HTMLElement>;
  onProductClick: (id: number) => void;
}

export default function ProductsSection({ homeRef, productsRef, onProductClick }: ProductsSectionProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section
        ref={homeRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-cormorant text-[#F5D060] text-lg italic tracking-widest mb-4 text-glow-gold">
            — самый скандальный гаджет —
          </p>
          <h1 className="font-oswald text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none mb-6 hero-gradient-text">
            DICK
            <br />
            <span style={{ WebkitTextFillColor: "white", filter: "drop-shadow(0 0 18px rgba(255,255,255,0.12))" }}>
              FON
            </span>
          </h1>
          <p className="font-rubik text-white/55 text-lg md:text-xl max-w-lg mx-auto mb-12">
            Идеальный подарок для мальчишника, девичника, корпоратива или Дня рождения. Взорви вечеринку с DICKFON!
          </p>
          <button
            onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="btn-capsule btn-capsule-blue text-base px-8 py-4"
          >
            Смотреть товары
            <Icon name="ArrowDown" size={18} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/25" />
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products-section" ref={productsRef} className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-cormorant text-[#F5D060] italic text-lg mb-3 text-glow-gold">наши модели</p>
            <h2 className="font-oswald text-5xl md:text-6xl uppercase tracking-tight text-white text-glow-white">
              Dickfon
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {PRODUCTS.map((product: Product) => (
              <div
                key={product.id}
                className="product-card group"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                {/* Нижнее цветное свечение */}
                <div
                  className="product-card-glow"
                  style={{ background: CARD_GLOW[product.id] }}
                />

                {/* Стеклянный контейнер */}
                <div className="product-card-inner">
                  {/* Изображение — без обрезки, полностью */}
                  <div
                    className="relative overflow-hidden flex items-center justify-center"
                    style={{
                      background: `radial-gradient(ellipse at 50% 55%, ${product.color}22 0%, transparent 72%)`,
                      minHeight: "220px",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-103"
                        style={{ maxHeight: "280px", display: "block" }}
                      />
                    ) : (
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl my-8"
                        style={{
                          background: `radial-gradient(circle, ${product.color}20, transparent)`,
                          boxShadow: `0 0 40px ${product.color}25`,
                        }}
                      >
                        🎤
                      </div>
                    )}
                    <span className="badge-glass absolute top-4 right-4 z-10">
                      {product.badge}
                    </span>
                  </div>

                  {/* Текст + кнопки */}
                  <div className="p-5 relative z-10">
                    <p className="font-rubik text-white/30 text-xs uppercase tracking-widest mb-2">
                      {product.category}
                    </p>

                    {/* Название товара в стеклянной кнопке */}
                    <div className="mb-3">
                      <span className="product-name-tag">
                        {product.name}
                      </span>
                    </div>

                    <p className="font-rubik text-white/38 text-sm mb-4">{product.volume}</p>

                    <div className="flex items-center justify-between">
                      <span
                        className="font-oswald text-2xl text-[#F5D060]"
                        style={{ textShadow: "0 0 16px rgba(245,208,96,0.4)" }}
                      >
                        {product.price}
                      </span>
                      {/* Прозрачная стеклянная капсула «Подробнее» */}
                      <span className="btn-capsule btn-capsule-clear text-xs py-2 px-3 pointer-events-none" style={{ fontSize: "0.68rem" }}>
                        Подробнее
                        <Icon name="ArrowRight" size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
