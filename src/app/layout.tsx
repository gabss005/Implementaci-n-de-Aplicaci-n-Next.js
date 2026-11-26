import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import AnioActual from "@/components/AnioActual";
import Navbar from "@/components/Navbar";
import "./globals.css";

// next/font descarga la fuente en build y la sirve desde nuestro dominio:
// sin parpadeo de texto y sin request extra a Google en producción.
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// Metadata a nivel raíz: título y descripción para SEO y pestaña del navegador.
// metadataBase sale de una variable de entorno (ver .env.example) para que los
// links absolutos (Open Graph, etc.) apunten al dominio real en producción.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: { default: "ClickZone", template: "%s | ClickZone" },
  description:
    "Catálogo de periféricos gaming: mouse, teclados, headsets y monitores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="min-h-screen bg-white text-pink-900">
        {/* Suspense porque Navbar usa usePathname y en rutas dinámicas
            (/productos/[id]) el pathname no se conoce al prerenderizar.
            Con Cache Components activado, Next exige esta frontera. */}
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-pink-200 bg-pink-50/60 py-6 text-center text-sm text-pink-700">
          © <AnioActual /> ClickZone · Proyecto académico UDB
        </footer>
      </body>
    </html>
  );
}
