import getProducts from "@/lib/mongodb/products";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// rethink how to approach this
// the code is all over the place right now
function PaginateNumbers({
  currentPage,
  lastPage,
  query,
}: {
  currentPage: number;
  lastPage: number;
  query: string;
}) {
  const numberLimit = 5;
  let paginateArray: number[] = [];
  return (
    <>
      {paginateArray.map((page) => (
        <Link
          key={page}
          href={{
            pathname: "/products",
            query: {
              page: page,
              query: query.length === 0 ? undefined : query,
            },
          }}
        >
          {page}
        </Link>
      ))}
    </>
  );
}

// the current page can just be passed as a prop from the parent
function PaginateButtons({
  currentPage,
  lastPage,
  query,
}: {
  currentPage: number;
  lastPage: number;
  query: string;
}) {
  return (
    <>
      <button
        disabled={currentPage === 1}
        className="group disabled:pointer-events-none"
        aria-label="First Page Button"
      >
        <Link
          href={{
            pathname: "/products",
            query: { page: 1, query: query.length === 0 ? undefined : query },
          }}
        >
          <ChevronDoubleLeftIcon className="h-4 w-4 group-disabled:stroke-slate-400" />
        </Link>
      </button>
      <button
        disabled={currentPage === 1}
        className="group disabled:pointer-events-none"
        aria-label="Previous Page Button"
      >
        <Link
          href={{
            pathname: "/products",
            query: {
              page: currentPage - 1,
              query: query.length === 0 ? undefined : query,
            },
          }}
          prefetch={true}
        >
          <ChevronLeftIcon className="h-4 w-4 group-disabled:stroke-slate-400" />
        </Link>
      </button>
      <PaginateNumbers
        currentPage={currentPage}
        query={query}
        lastPage={lastPage}
      />
      <button
        disabled={currentPage === lastPage}
        className="group disabled:pointer-events-none"
        aria-label="Next Page Button"
      >
        <Link
          href={{
            pathname: "/products",
            query: {
              page: currentPage + 1,
              query: query.length === 0 ? undefined : query,
            },
          }}
          prefetch={true}
        >
          <ChevronRightIcon className="h-4 w-4 group-disabled:stroke-slate-400" />
        </Link>
      </button>
      <button
        disabled={currentPage === lastPage}
        className="group disabled:pointer-events-none"
        aria-label="Last Page Button"
      >
        <Link
          href={{
            pathname: "/products",
            query: {
              page: lastPage,
              query: query.length === 0 ? undefined : query,
            },
          }}
        >
          <ChevronDoubleRightIcon className="h-4 w-4 group-disabled:stroke-slate-400" />
        </Link>
      </button>
    </>
  );
}

export default async function Paginate({
  currentPage,
  limit,
  query,
}: {
  currentPage: number;
  limit: number;
  query: string;
}) {
  // this request is already cached, so no need to worry while using it
  const products = await getProducts(currentPage, limit, query);
  const totalItems =
    products[0].length.length === 0 ? 0 : products[0].length[0].count;
  const startVal = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endVal =
    totalItems < currentPage * limit ? totalItems : currentPage * limit;
  const lastPage = Math.ceil(totalItems / limit);
  // Maybe we can just use this because it is cached and we don't need its loading to be linked to the cards
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-center rounded-3xl px-10 py-6 shadow-[0_-2px_13px_1px_hsla(0,0%,0%,0.03)] sm:justify-between"
      aria-label="Pagination Component"
      aria-description="Pagination Bar"
    >
      {/*two components here: one that shows the results*/}
      <h3 className="hidden sm:block">
        Showing <span className="font-semibold">{startVal}</span> to{" "}
        <span className="font-semibold">{endVal}</span> of{" "}
        <span className="font-semibold">{totalItems}</span> results
      </h3>
      {/*another that is the main pagination component*/}
      <div aria-label="Pagination button">
        <PaginateButtons
          currentPage={currentPage}
          lastPage={lastPage}
          query={query}
        />
        {/* <h6>{`${products[0].productData[0]._id}`}</h6> */}
      </div>
    </div>
  );
}
