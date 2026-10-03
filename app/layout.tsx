import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fronteiras do Cálculo | Uma jornada de Cálculo I",
  description: "Explore o território e descubra a matemática em uma aventura universitária de Cálculo I.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
