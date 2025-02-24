import { ResponsiveHeader } from '@/components/layout/responsive-header';
import { ResponsiveFooter } from '@/components/layout/responsive-footer';

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
      <div className="flex-1 flex flex-col items-center mt-14 mb-16">
        {children}
      </div>

      <ResponsiveFooter />
    </main>
  );
}
