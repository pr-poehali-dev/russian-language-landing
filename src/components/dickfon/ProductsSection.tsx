import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS, Product } from "./data";

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
            <span style={{ WebkitTextFillColor: "white", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}>
              FON
            </span>
          </h1>
          <p className="font-rubik text-white/55 text-lg md:text-xl max-w-lg mx-auto mb-12">
            Идеальный подарок для мальчишника, девичника, корпоратива или Дня рождения. Взорви вечеринку с DICKFON!
          </p>
          <button
            onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="btn-liquid"
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

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product: Product) => (
              <div
                key={product.id}
                className="product-card group"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <div
                  className="h-56 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 40% 40%, ${product.color}30 0%, ${product.color}08 50%, transparent 80%)`,
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
                      style={{
                        background: `radial-gradient(circle, ${product.color}30, transparent)`,
                        boxShadow: `0 0 50px ${product.color}30`,
                      }}
                    >
                      🎤
                    </div>
                  )}
                  <span
                    className="absolute top-4 right-4 badge-glass font-oswald text-xs uppercase tracking-widest"
                    style={{ zIndex: 2 }}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="p-6 relative z-10">
                  <p className="font-rubik text-white/35 text-xs uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-oswald text-2xl text-white uppercase tracking-wide mb-1 group-hover:text-[#F5D060] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-rubik text-white/45 text-sm mb-4">{product.volume}</p>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-oswald text-2xl text-[#F5D060]"
                      style={{ textShadow: "0 0 20px rgba(245,208,96,0.4)" }}
                    >
                      {product.price}
                    </span>
                    <span className="flex items-center gap-1 font-rubik text-xs text-white/40 group-hover:text-[#F5D060] transition-colors duration-300 uppercase tracking-widest">
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
    </>
  );
}
