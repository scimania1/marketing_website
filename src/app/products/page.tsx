import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/utils/constants";
import getProducts, { getTags } from "@/lib/mongodb/products";
import { Suspense } from "react";
import Paginate from "@/components/pagination";
import ProductCard from "@/components/product-card";

function wait(duration: number) {
  return new Promise((res) => setTimeout(res, duration));
}

async function Tags() {
  const tags = await getTags();
  return (
    <div className="mb-4 grid grid-flow-col gap-2">
      <div className="flex flex-nowrap gap-1 overflow-x-auto overflow-y-hidden whitespace-nowrap py-5">
        {tags.map(
          (tag, idx) =>
            !!tag && (
              <span key={idx} className="flex-grow bg-slate-100">
                {`"${tag}"`}{" "}
              </span>
            ),
        )}
      </div>
      <button>Sort the fields</button>
    </div>
  );
}

async function ProductGrid({
  page,
  limit,
  query,
}: {
  page: number;
  limit: number;
  query: string;
}) {
  // await wait(1000);
  const products = await getProducts(page, limit, query);
  if (products[0].productData.length === 0) {
    return <h2>No results Found</h2>;
  }
  return (
    <div className="grid gap-4 px-2 sm:grid-cols-2 sm:px-3 md:grid-cols-3 md:px-4 lg:grid-cols-4">
      {products[0].productData.map((product) => (
        <ProductCard
          key={`${product.id}${product.name}`}
          id={product.id}
          name={product.name}
          imageURL={product.imageURL}
          sizes={product.sizes}
        />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    query?: string;
    category?: string;
  };
}) {
  const page =
    typeof searchParams.page === "string"
      ? Number(searchParams.page)
      : DEFAULT_PAGE;
  const limit =
    typeof searchParams.limit === "string"
      ? Number(searchParams.limit)
      : DEFAULT_LIMIT;
  const query =
    typeof searchParams.query === "string" ? searchParams.query : "";
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "";

  return (
    <>
      <Tags />
      <Suspense key={query + `${page}`} fallback={<h1>Loading</h1>}>
        <div className="scrollbar-remove flex-grow overflow-y-auto">
          <ProductGrid page={page} limit={limit} query={query} />
        </div>
      </Suspense>
      <Paginate limit={limit} currentPage={page} query={query} />
    </>
  );
}
