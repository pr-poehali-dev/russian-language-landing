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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1e0d35] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
        >
          <Icon name="X" size={18} className="text-white/70" />
        </button>

        <div
          className="h-48 rounded-t-3xl flex items-center justify-center relative"
          style={{
            background: `radial-gradient(circle at center, ${product.color}25 0%, #1a0a2e 80%)`,
          }}
        >
          <span className="text-7xl">🎤</span>
          <span className="absolute top-4 left-4 font-oswald text-xs uppercase tracking-widest bg-[#F5D060] text-[#1a0a2e] px-3 py-1 rounded-full">
            {product.badge}
          </span>
        </div>

        <div className="p-8">
          <p className="font-rubik text-white/40 text-xs uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h2 className="font-oswald text-3xl uppercase tracking-wide text-white mb-1">
            {product.seoTitle}
          </h2>
          <p className="font-rubik text-white/50 text-sm mb-6">{product.volume}</p>

          <div className="font-rubik text-white/75 text-base leading-relaxed mb-8 whitespace-pre-line">
            {product.description}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-oswald text-3xl text-[#F5D060]">{product.price}</span>
            <button
              onClick={onOrder}
              className="bg-[#F5D060] hover:bg-[#F0C830] text-[#1a0a2e] font-oswald text-base uppercase tracking-widest px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,208,96,0.4)]"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
