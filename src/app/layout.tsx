// This layout is minimal to support rendering a raw HTML page.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
