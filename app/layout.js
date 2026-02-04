import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Next.js CSR vs SSR Demo",
  description: "Learn the difference between Client-Side Rendering, Server-Side Rendering, and Hydration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
