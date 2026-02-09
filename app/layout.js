// Root Layout Component
// This is the top-level layout that wraps all pages in the application
// Layouts in Next.js App Router are Server Components by default and are shared across routes

import "./globals.css";
import Navigation from "@/components/Navigation";

// Metadata for SEO and browser display
// This will be applied to all pages unless overridden
export const metadata = {
  title: "Next.js CSR vs SSR Demo",
  description: "Learn the difference between Client-Side Rendering, Server-Side Rendering, and Hydration",
};

// Root layout that provides the HTML structure for all pages
// The <html> and <body> tags are required in the root layout
// Navigation persists across all pages (doesn't re-render on route changes)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Global navigation component - rendered once and persists across routes */}
        <Navigation />
        {/* Main content area where page-specific content is rendered */}
        <main>{children}</main>
      </body>
    </html>
  );
}
