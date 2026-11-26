import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AccionesProducto from "@/components/AccionesProducto";
import { iconos } from "@/components/ProductCard";
import { productos } from "@/data/productos";

// Le decimos a Next qué ids existen para prerenderizarlos en build.
export function generateStaticParams() {
  return productos.map((p) => ({ id: p.id }));
}

// En Next 15+ params es una Promise
type Props = { params: Promise<{ id: string }> };

// Título dinámico por producto (bueno para SEO y para la pestaña)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const producto = productos.find((p) => p.id === id);
  return { title: producto ? producto.nombre : "Producto no encontrado" };
}

// Server Component: importamos el dato directo (cero JS extra hacia el cliente)
export default async function DetallePage({ params }: Props) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === id);

  // notFound() corta el render y muestra la página 404 de Next
  if (!producto) notFound();

  return (
    <div className="space-y-8">
      <Link
        href="/productos"
        className="text-sm text-pink-700 hover:text-pink-500"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex h-72 items-center justify-center rounded-xl border border-pink-200 bg-pink-50 text-8xl">
          {iconos[producto.categoria]}
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-wide text-pink-600">
            {producto.categoria}
          </span>
          <h1 className="text-3xl font-bold text-pink-950">{producto.nombre}</h1>
          <p className="text-pink-700">{producto.marca}</p>
          <p className="text-3xl font-extrabold text-pink-900">${producto.precio}</p>
          <p className="text-pink-800">{producto.descripcion}</p>

          {/* Único pedazo interactivo de la página: el resto sigue en servidor */}
          <AccionesProducto id={producto.id} />
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold text-pink-950">Especificaciones</h2>
        <dl className="divide-y divide-pink-100 rounded-xl border border-pink-200 bg-white">
          {/* Object.entries porque las specs varían según la categoría */}
          {Object.entries(producto.specs).map(([clave, valor]) => (
            <div key={clave} className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-pink-700">{clave}</dt>
              <dd className="text-right font-medium text-pink-950">{valor}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
