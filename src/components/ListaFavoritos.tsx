"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/productos";
import { useFavoritos } from "@/lib/listas";

export default function ListaFavoritos() {
  const { ids, alternar, listo } = useFavoritos();

  // Hasta hidratar no sabemos qué hay guardado; evitamos un parpadeo de "vacío"
  if (!listo) return <p className="text-pink-700">Cargando favoritos...</p>;

  // Cruzamos los ids guardados con el catálogo. Si un id ya no existe
  // (producto borrado), simplemente no aparece.
  const favoritos = productos.filter((p) => ids.includes(p.id));

  if (favoritos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-pink-700">Todavía no tenés favoritos.</p>
        <Link
          href="/productos"
          className="mt-4 inline-block rounded-lg bg-pink-500 px-5 py-2.5 font-semibold text-white hover:bg-pink-600"
        >
          Explorar catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {favoritos.map((p) => (
        <div key={p.id} className="space-y-2">
          <ProductCard producto={p} />
          <button
            onClick={() => alternar(p.id)}
            className="w-full rounded-lg border border-pink-300 bg-white py-2 text-sm text-pink-800 hover:border-pink-500 hover:bg-pink-50"
          >
            Quitar de favoritos
          </button>
        </div>
      ))}
    </div>
  );
}
