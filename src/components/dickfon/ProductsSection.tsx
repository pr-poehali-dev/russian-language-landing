import Icon from "@/components/ui/icon";
import { PRODUCTS, Product } from "./data";

interface ProductsSectionProps {
  homeRef: React.RefObject<HTMLElement>;
  productsRef: React.RefObject<HTMLElement>;
  onProductClick: (id: number) => void;
}

export default function ProductsSection({ homeRef, productsRef, onProductClick }: ProductsSectionProps) {
  return (
    <>
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
            Идеальный подарок для мальчишника, девичника, корпоратива или Дня рождения. Взорви вечеринку с DICKFON!
          </p>
          <button
            onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
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
            {PRODUCTS.map((product: Product) => (
              <div
                key={product.id}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#F5D060]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2 cursor-pointer"
                onClick={() => onProductClick(product.id)}
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
    </>
  );
}
