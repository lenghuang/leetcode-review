export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-base-100 text-base-content">{children}</div>;
}
