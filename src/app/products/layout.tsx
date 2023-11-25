export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-grow">{children}</div>;
}
