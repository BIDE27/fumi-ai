import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FUMI AI — L'Intelligence Artificielle Souveraine Africaine & Polyvalente",
  description: "FUMI est l'IA souveraine africaine d'élite : code informatique, sciences, sagesse ancestrale, langues africaines et productivité de pointe.",
  icons: {
    icon: "/images/fumi/fumi_avatar.png",
    apple: "/images/fumi/fumi_avatar.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#fcfaf5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased bg-[#fcfaf5] text-[#292524] min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
