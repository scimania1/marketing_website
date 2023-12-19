import { Suspense } from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow overflow-y-hidden pb-2">
      <div className="flex flex-grow">
        <div className="relative flex h-full flex-grow flex-col rounded-3xl bg-slate-50">
          <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
        </div>
      </div>
    </main>
  );
}
