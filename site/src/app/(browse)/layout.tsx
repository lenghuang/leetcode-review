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
        <div className="w-full max-w-7xl flex flex-col gap-4 p-4">
          <div className="flex-1 w-full flex flex-col gap-4">{children}</div>
        </div>
      </div>

      <ResponsiveFooter />
    </main>
  );
}
