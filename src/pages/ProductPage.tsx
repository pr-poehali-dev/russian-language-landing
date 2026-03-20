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
      <div className="min-h-screen flex items-center justify-center text-white relative" style={{ background: "#0d0618" }}>
        <div className="liquid-bg">
          <div className="liquid-blob liquid-blob-1" />
          <div className="liquid-blob liquid-blob-2" />
        </div>
        <div className="relative z-10 text-center">
          <p className="font-oswald text-2xl mb-4 text-glow-white">Товар не найден</p>
          <button
            onClick={() => navigate("/")}
            className="btn-liquid"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  const productUrl = `https://dickfon.ru/product/${product.slug}`;

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ background: "#0d0618" }}>
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

      {/* Animated liquid background */}
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
          className="btn-glass inline-flex items-center gap-2 mb-10"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* IMAGE */}
          <div
            className="glass-card overflow-hidden flex items-center justify-center min-h-[340px] relative"
            style={{ padding: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 40% 35%, ${product.color}30 0%, ${product.color}08 50%, transparent 80%)`,
              }}
            />
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover max-h-[480px] relative z-10"
              />
            ) : (
              <span className="text-9xl relative z-10" style={{ filter: "drop-shadow(0 0 40px rgba(255,255,255,0.2))" }}>🎤</span>
            )}
            <span className="badge-glass absolute top-4 left-4 z-20">
              {product.badge}
            </span>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-rubik text-white/35 text-xs uppercase tracking-widest mb-1">
                {product.category}
              </p>
              <h1
                className="font-oswald text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight mb-2"
                style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
              >
                {product.name}
              </h1>
              <p className="font-rubik text-white/45 text-sm">{product.volume}</p>
            </div>

            <div
              className="h-px w-12"
              style={{ background: "linear-gradient(90deg, rgba(245,208,96,0.6), transparent)" }}
            />

            <div className="font-rubik text-white/68 text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </div>

            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                className="font-oswald text-3xl text-[#F5D060]"
                style={{ textShadow: "0 0 24px rgba(245,208,96,0.45)" }}
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
                className="btn-liquid"
              >
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-glass py-8 px-6 text-center relative z-10">
        <p className="font-rubik text-white/25 text-sm">
          Вся информация на сайте охраняется авторским правом, копирование запрещено
        </p>
      </footer>
    </div>
  );
}
