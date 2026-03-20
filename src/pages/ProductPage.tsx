import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PRODUCTS } from "@/components/dickfon/data";
import Navbar from "@/components/dickfon/Navbar";
import Icon from "@/components/ui/icon";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const goToSection = (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const navItems = [
    { label: "Главная", onClick: () => navigate("/") },
    { label: "Товары", onClick: () => goToSection("products-section") },
    { label: "Контакты", onClick: () => goToSection("contacts-section") },
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white relative" style={{ background: "#080510" }}>
        <div className="liquid-bg">
          <div className="liquid-blob liquid-blob-1" />
          <div className="liquid-blob liquid-blob-2" />
        </div>
        <div className="relative z-10 text-center">
          <p className="font-oswald text-2xl mb-6 text-glow-white">Товар не найден</p>
          <button onClick={() => navigate("/")} className="btn-capsule btn-capsule-blue">
            На главную
          </button>
        </div>
      </div>
    );
  }

  const productUrl = `https://dickfon.ru/product/${product.slug}`;

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ background: "#080510" }}>
      <Helmet>
        <title>{product.seoTitle}</title>
        <meta name="description" content={product.seoDescription} />
        <link rel="canonical" href={productUrl} />
        <meta property="og:title" content={product.seoTitle} />
        <meta property="og:description" content={product.seoDescription} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
        {product.image && <meta property="og:image" content={product.image} />}
      </Helmet>

      {/* Liquid background */}
      <div className="liquid-bg">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
        <div className="liquid-blob liquid-blob-4" />
      </div>

      <Navbar items={navItems} />

      <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="btn-capsule btn-capsule-clear mb-10"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* IMAGE — без обрезки, полностью */}
          <div
            className="glass-card flex items-center justify-center relative"
            style={{
              padding: 0,
              minHeight: "340px",
              background: `linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.15) 100%)`,
            }}
          >
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${product.color}22 0%, transparent 70%)`,
              }}
            />
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 w-full h-auto object-contain"
                style={{ maxHeight: "520px", display: "block", borderRadius: "20px", padding: "8px" }}
              />
            ) : (
              <span
                className="text-9xl relative z-10 py-12"
                style={{ filter: "drop-shadow(0 0 36px rgba(255,255,255,0.18))" }}
              >
                🎤
              </span>
            )}
            <span className="badge-glass absolute top-4 left-4 z-20">
              {product.badge}
            </span>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-rubik text-white/30 text-xs uppercase tracking-widest mb-3">
                {product.category}
              </p>
              {/* Название товара в стеклянной кнопке */}
              <div className="mb-3">
                <span className="product-name-tag text-lg px-5 py-2">
                  {product.name}
                </span>
              </div>
              <p className="font-rubik text-white/40 text-sm mt-3">{product.volume}</p>
            </div>

            <div
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, rgba(245,208,96,0.7), transparent)`,
                boxShadow: "0 0 6px rgba(245,208,96,0.35)",
              }}
            />

            <div className="font-rubik text-white/65 text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </div>

            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span
                className="font-oswald text-3xl text-[#F5D060]"
                style={{ textShadow: "0 0 20px rgba(245,208,96,0.42)" }}
              >
                {product.price}
              </span>
              <a
                href="/#contacts"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("contacts-section")?.scrollIntoView({ behavior: "smooth" });
                  }, 400);
                }}
                className="btn-capsule btn-capsule-orange"
              >
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-glass py-8 px-6 text-center relative z-10">
        <p className="font-rubik text-white/22 text-sm">
          Вся информация на сайте охраняется авторским правом, копирование запрещено
        </p>
      </footer>
    </div>
  );
}