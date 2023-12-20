import { Suspense } from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow overflow-y-hidden pb-2">
      <div className="relative flex h-full flex-grow flex-col rounded-3xl bg-slate-50 px-4 py-4">
        <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
      </div>
    </main>
  );
}
