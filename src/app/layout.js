import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SWAGGER — Moda que representa você.",
    template: "%s | SWAGGER",
  },
  description:
    "SWAGGER é uma loja de moda que representa quem você é. Descubra roupas e acessórios para o seu estilo.",
  openGraph: {
    title: "SWAGGER — Moda que representa você.",
    description:
      "SWAGGER é uma loja de moda que representa quem você é. Descubra roupas e acessórios para o seu estilo.",
    siteName: "SWAGGER",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-50">
        <CartProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
            <CartDrawer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
