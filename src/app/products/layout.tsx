import SearchBar from "@/components/search-bar";
import { Suspense } from "react";

function ProductsHeader() {
  return (
    <>
      <div className="flex items-center justify-between py-4 sm:px-4">
        <h3 className="hidden text-2xl font-medium text-slate-700 sm:block sm:text-3xl lg:text-4xl">
          Products
        </h3>
        <div className="flex flex-grow items-center gap-4 sm:flex-grow-0">
          <SearchBar placeholder="Search Products..." />
        </div>
      </div>
    </>
  );
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow overflow-y-hidden pb-0 sm:pb-2">
      <div className="relative flex h-full w-full flex-grow flex-col overflow-x-hidden rounded-2xl bg-white px-4 pb-12 pt-1 sm:rounded-3xl sm:pt-4">
        <ProductsHeader />
        <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
      </div>
    </main>
  );
}
