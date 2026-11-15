import "./globals.css";

export const metadata = {
  title: "إبداع سبأ",
  description: "نظام الصرافة والمحاسبة المتكامل",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
