import "./globals.css";

export const metadata = {
  title: "P2TL Analytics - Electricity Analysis Dashboard",
  description:
    "Enterprise-grade P2TL electricity analysis and inspection management dashboard for PLN Indonesia utility analysts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
