import Link from "next/link";
import type { Producto } from "@/types/producto";

// Sin "use client": no usa hooks, así que puede renderizarse en el servidor
// y se reutiliza tanto en Server como en Client Components.
// Record<Categoria, string> obliga a cubrir TODAS las categorías: si agregamos
// una nueva al tipo, TypeScript nos avisa que falta su emoji.
export const iconos: Record<Producto["categoria"], string> = {
  mouse: "🖱️",
  teclado: "⌨️",
  headset: "🎧",
  monitor: "🖥️",
};

export default function ProductCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/productos/${producto.id}`}
      className="group flex flex-col rounded-xl border border-pink-200 bg-white p-5 transition hover:border-pink-400 hover:bg-pink-50/60"
    >
      {/* No tenemos imágenes aún; el emoji hace de placeholder visual */}
      <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-pink-50 text-5xl">
        {iconos[producto.categoria]}
      </div>

      <span className="text-xs uppercase tracking-wide text-pink-600">
        {producto.categoria}
      </span>
      <h3 className="mt-1 font-semibold text-pink-950 group-hover:text-pink-600">
        {producto.nombre}
      </h3>
      <p className="text-sm text-pink-700">{producto.marca}</p>

      {/* mt-auto empuja el precio al fondo para que todas las cards alineen */}
      <p className="mt-auto pt-4 text-lg font-bold text-pink-900">${producto.precio}</p>
    </Link>
  );
}
