export default function StudySessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row justify-center">
      <div className="flex flex-col min-h-screen w-full max-w-lg p-4">
        {children}
      </div>
    </main>
  );
}
