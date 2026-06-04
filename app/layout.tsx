import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site, SITE_URL, IS_STAGING } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} – Денонощни траурни услуги в Стамболийски`,
    template: `%s | ${site.name}`,
  },
  description:
    "Денонощна погребална агенция АМИН в гр. Стамболийски. Организация на погребения, кремации, транспорт и паметници в цялата страна.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  // favicon се генерира автоматично от app/icon.svg (App Router конвенция);
  // тук добавяме само apple-touch icon.
  icons: {
    apple: "/icon.svg",
  },
  robots: {
    index: !IS_STAGING,
    follow: !IS_STAGING,
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: site.name,
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bg"
      className={`${playfair.variable} ${montserrat.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Към съдържанието
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
