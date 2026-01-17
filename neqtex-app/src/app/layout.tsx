import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neqtex | Operational Offload & Cost Relief for Accounting & Legal Teams",
  description: "We help accounting and legal teams stop paying for work they shouldn't be doing. Free operational offload assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/neqtex_logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
