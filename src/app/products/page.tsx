import SearchBar from "@/components/search-bar";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/utils/constants";
import getProducts from "@/lib/mongodb/products";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import Paginate from "@/components/pagination";
import Image from "next/image";

function ProductsHeader({ initialQuery }: { initialQuery: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <h3 className="hidden text-2xl font-medium text-slate-700 sm:block sm:text-3xl lg:text-4xl">
        Products
      </h3>
      <div className="flex flex-grow items-center gap-4 sm:flex-grow-0">
        <SearchBar initialQuery={initialQuery} />
        <div
          className="my-[2px] w-[3px] self-stretch rounded-full bg-slate-200"
          role="separator"
        ></div>
        {/* TODO: Make this css better or something */}
        <button className="flex items-center gap-2 self-stretch rounded-full border border-solid border-gray-800 px-4 sm:px-4">
          <span className="hidden text-lg lg:block">Add New Product</span>
          <PlusIcon className="h-6 w-6 stroke-slate-800" />
        </button>
      </div>
    </div>
  );
}

/**
 * @param {number} duration the time to wait
 */
function wait(duration: number) {
  return new Promise((res) => setTimeout(res, duration));
}

async function Cards({
  page,
  limit,
  query,
}: {
  page: number;
  limit: number;
  query: string;
}) {
  await wait(1000);
  const products = await getProducts(page, limit, query);
  return (
    <>
      {products[0].productData.map((product) => (
        <div key={product.id}>
          {/* <Image */}
          {/*   src={product.imageURL} */}
          {/*   height={100} */}
          {/*   width={100} */}
          {/*   alt={product.name} */}
          {/* /> */}
          <span>{product.id} </span>
          {product.name.slice(0, 8)}
          <br />
          {product.name.slice(0, 8)}
        </div>
      ))}
    </>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; query?: string };
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

  return (
    <>
      <ProductsHeader initialQuery={query} />
      <Suspense key={query + `${page}`} fallback={<h1>Loading</h1>}>
        <div className="flex-grow overflow-y-scroll">
          <Cards page={page} limit={limit} query={query} />
        </div>
      </Suspense>
      <Paginate limit={limit} currentPage={page} query={query} />
    </>
  );
}
