import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#0f0d0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased bg-[#0f0d0b] text-[#fcfaf5] min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
