import Icon from "@/components/ui/icon";
import { Product } from "./data";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onOrder: () => void;
}

export default function ProductModal({ product, onClose, onOrder }: ProductModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(5, 2, 12, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      <div
        className="glass-modal relative max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="close-btn absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
        >
          <Icon name="X" size={18} className="text-white/70" />
        </button>

        <div
          className="h-52 rounded-t-[30px] flex items-center justify-center relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${product.color}35 0%, ${product.color}10 40%, transparent 75%)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
            }}
          />
          <span className="text-7xl relative z-10" style={{ filter: "drop-shadow(0 0 30px rgba(255,255,255,0.2))" }}>🎤</span>
          <span className="badge-glass absolute top-4 left-4">
            {product.badge}
          </span>
        </div>

        <div className="p-8 relative z-10">
          <p className="font-rubik text-white/35 text-xs uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h2
            className="font-oswald text-3xl uppercase tracking-wide text-white mb-1"
            style={{ textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          >
            {product.seoTitle}
          </h2>
          <p className="font-rubik text-white/45 text-sm mb-6">{product.volume}</p>

          <div className="font-rubik text-white/70 text-base leading-relaxed mb-8 whitespace-pre-line">
            {product.description}
          </div>

          <div className="flex items-center justify-between">
            <span
              className="font-oswald text-3xl text-[#F5D060]"
              style={{ textShadow: "0 0 24px rgba(245,208,96,0.45)" }}
            >
              {product.price}
            </span>
            <button
              onClick={onOrder}
              className="btn-liquid"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
