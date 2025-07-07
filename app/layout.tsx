import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css"; 

// Load Lato from Google Fonts
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Website Kalibulus",
  description: "Website Profil Dusun Kalibulus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={lato.variable}>
      <body className={`font-lato antialiased m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}