import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "./Components/Wrapper/Wrapper";

const satoshi = localFont({
  src: [
    {
      path: "./Global/Fonts/Satoshi/Fonts/WEB/fonts/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./Global/Fonts/Satoshi/Fonts/WEB/fonts/Satoshi-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const publicaPlay = localFont({
  src: [
    {
      path: "./Global/Fonts/FaceType - PublicaPlay-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-publica-play",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Endopai",
  description: "Endopai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${publicaPlay.variable} bodyTag`}
        suppressHydrationWarning
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
