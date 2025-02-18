export default function StudySessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col min-h-screen">{children}</main>;
}
