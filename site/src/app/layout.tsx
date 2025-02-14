import { Funnel_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { ResponsiveHeader } from '@/components/responsive-header';
import { ResponsiveFooter } from '@/components/responsive-footer';

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
          <main className="min-h-screen flex flex-col">
            {/* Navbar */}
            <ResponsiveHeader />

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center">{children}</div>

            <ResponsiveFooter />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
