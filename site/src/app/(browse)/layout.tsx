import { ResponsiveHeader } from '@/components/responsive-header';
import { ResponsiveFooter } from '@/components/responsive-footer';

export default function NonFullScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <ResponsiveHeader />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center">{children}</div>

      <ResponsiveFooter />
    </main>
  );
}
