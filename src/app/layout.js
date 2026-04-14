import "./globals.css";

export const metadata = {
  title: "MarCRM — 6-Pipeline Agency CRM",
  description: "CRM with web scraping and ICP scoring for multi-business-line agencies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
