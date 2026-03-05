import { useParams, useNavigate } from "react-router-dom";
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
      <div className="min-h-screen bg-[#1a0a2e] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="font-oswald text-2xl mb-4">Товар не найден</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#F5D060] text-[#1a0a2e] font-oswald uppercase tracking-widest px-6 py-3 rounded-xl"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0a2e] text-white overflow-x-hidden">
      <Navbar items={navItems} />

      <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-rubik text-white/50 hover:text-white transition-colors mb-10 text-sm"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* IMAGE */}
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center min-h-[340px] relative"
            style={{
              background: `radial-gradient(circle at center, ${product.color}20 0%, #12062a 100%)`,
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl max-h-[480px]"
              />
            ) : (
              <span className="text-9xl">🎤</span>
            )}
            <span className="absolute top-4 left-4 font-oswald text-xs uppercase tracking-widest bg-[#F5D060] text-[#1a0a2e] px-3 py-1 rounded-full">
              {product.badge}
            </span>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-rubik text-white/40 text-xs uppercase tracking-widest mb-1">
                {product.category}
              </p>
              <h1 className="font-oswald text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight mb-2">
                {product.name}
              </h1>
              <p className="font-rubik text-white/50 text-sm">{product.volume}</p>
            </div>

            <div className="w-12 h-px bg-[#F5D060]/40" />

            <div className="font-rubik text-white/70 text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-oswald text-3xl text-[#F5D060]">{product.price}</span>
              <a
                href="/#contacts"
                onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => { document.getElementById("contacts-section")?.scrollIntoView({ behavior: "smooth" }); }, 400); }}
                className="bg-[#F5D060] hover:bg-[#F0C830] text-[#1a0a2e] font-oswald text-base uppercase tracking-widest px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,208,96,0.4)]"
              >
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 px-6 text-center">
        <p className="font-rubik text-white/30 text-sm">
          Вся информация на сайте охраняется авторским правом, копирование запрещено
        </p>
      </footer>
    </div>
  );
}