import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "P2TL Analytics - Electricity Analysis Dashboard",
  description:
    "Enterprise-grade P2TL electricity analysis and inspection management dashboard for PLN Indonesia utility analysts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              fontSize: "14px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
