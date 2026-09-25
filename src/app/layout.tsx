import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
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
    <html lang="fr" className={googleSans.variable}>
      <body className="font-sans antialiased bg-[#fcfaf5] text-[#292524] min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}

