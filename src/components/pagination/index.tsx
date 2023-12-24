import getProducts from "@/lib/mongodb/products";
import Pagination from "./pagination-item";

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
  const totalPages = Math.ceil(totalItems / limit);
  // Maybe we can just use this because it is cached and we don't need its loading to be linked to the cards
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 flex w-full items-center justify-center rounded-3xl bg-slate-50 px-10 py-6 shadow-[0_-2px_3px_3px_hsla(0,0%,0%,0.03)] sm:justify-between"
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
      <nav aria-label="pagination navigation">
        <Pagination
          totalPages={totalPages}
          showControls={true}
          currentPage={currentPage}
        />
        {/* <h6>{`${products[0].productData[0]._id}`}</h6> */}
      </nav>
    </div>
  );
}
