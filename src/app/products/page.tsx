import SearchBar from "@/components/search-bar";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/utils/constants";
import getProducts from "@/lib/mongodb/products";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import Paginate from "@/components/pagination";

// TODO:
// - [x] Make the padding-y larger
// - [ ] Make header sections for the products which has the word Products, search bar and an add Product Button
// - [ ] Make the product Cards
// - [ ] then create the update and add new product section

// ISSUES:
// - [x] decodeURIComponent issue
// - [x] on route change, input query should be changed

function ProductsHeader({ initialQuery }: { initialQuery: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="hidden text-2xl font-medium text-slate-700 sm:block sm:text-3xl lg:text-4xl">
        Products
      </h3>
      <div className="flex flex-grow items-center gap-4 sm:flex-grow-0">
        <SearchBar initialQuery={initialQuery} />
        <div
          className="my-[2px] w-[3px] self-stretch rounded-full bg-slate-200"
          role="separator"
        ></div>
        <button className="flex items-center gap-2 self-stretch rounded-full border border-solid border-gray-800 px-4 sm:px-4">
          <span className="hidden text-lg lg:block">Add New Product</span>
          <PlusIcon className="h-6 w-6 stroke-slate-800" />
        </button>
      </div>
    </div>
  );
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
  const products = await getProducts(page, limit, query);
  return (
    <>
      {products[0].productData.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
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
    <div className="relative h-full flex-grow rounded-3xl bg-slate-100 px-4 py-6 sm:px-6 sm:py-8">
      {/*Here we are going to have a header*/}
      <ProductsHeader initialQuery={query} />
      <Suspense fallback={<h1>Loading</h1>}>
        <Cards page={page} limit={limit} query={query} />
      </Suspense>
      {/*Then have the Products*/}
      {/*Pagination*/}
      <Paginate limit={limit} currentPage={page} query={query} />
    </div>
  );
}
