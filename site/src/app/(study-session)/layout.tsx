import { ResponsiveHeader } from '@/components/responsive-header';
import { ResponsiveFooter } from '@/components/responsive-footer';

export default function StudySessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
