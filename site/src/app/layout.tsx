import { Funnel_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { ResponsiveNav } from '@/components/responsive-nav';
import { AISlopByLen } from '@/components/ai-slop-by-len';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Leetcode Review',
  description: 'Quickly refresh yourself on many leetcode questions.',
};

const geistSans = Funnel_Sans({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center overflow-x-hidden">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <ResponsiveNav />
              </div>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              {/* Show footer on desktop only */}
              <footer className="w-full hidden lg:flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <AISlopByLen />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
