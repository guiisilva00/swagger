import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { getProducts } from "@/services/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SWAGGER — Street is an attitude.",
    template: "%s | SWAGGER",
  },
  description:
    "SWAGGER é uma marca de streetwear urbano e ousado. Descubra roupas e acessórios com identidade de rua.",
  openGraph: {
    title: "SWAGGER — Street is an attitude.",
    description:
      "SWAGGER é uma marca de streetwear urbano e ousado. Descubra roupas e acessórios com identidade de rua.",
    siteName: "SWAGGER",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const products = await getProducts();
  const validProductIds = products.map((product) => product.id);
  const searchIndex = products.map(
    ({ id, title, image, price, category }) => ({
      id,
      title,
      image,
      price,
      category,
    })
  );

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <CartProvider validProductIds={validProductIds}>
            <FavoritesProvider>
              <TopBar />
              <Header searchIndex={searchIndex} />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
