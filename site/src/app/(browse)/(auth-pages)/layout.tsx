export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-4">{children}</div>;
}
