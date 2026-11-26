import Link from "next/link";

// Se muestra para cualquier URL que no exista y cuando llamamos notFound()
export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-extrabold text-pink-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-pink-950">Esta página no existe</h1>
      <p className="mt-2 text-pink-700">
        Puede que el producto ya no esté en el catálogo o que el link esté mal.
      </p>
      <Link
        href="/productos"
        className="mt-6 inline-block rounded-lg bg-pink-500 px-5 py-2.5 font-semibold text-white hover:bg-pink-600"
      >
        Ver el catálogo
      </Link>
    </div>
  );
}
