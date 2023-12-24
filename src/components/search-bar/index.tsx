"use client";

import createUrl from "@/utils/createUrl";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const crossRef = useRef<SVGSVGElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.length === 0) {
      params.delete("query");
    } else {
      params.set("query", query);
    }
    params.delete("page");
    router.push(createUrl(pathname, params));
  }, 300);
  return (
    <div
      className="test relative flex flex-grow items-center gap-2 rounded-full bg-slate-200 py-2 pl-5 pr-6 transition-colors duration-300 focus-within:outline-1 focus-within:outline-black sm:flex-grow-0 sm:py-3 md:py-4"
      role="searchbox"
    >
      {/* <label className="absolute" htmlFor="search"> */}
      {/*   Search */}
      {/* </label> */}
      <MagnifyingGlassIcon
        className="h-7 w-7 stroke-slate-600"
        aria-label="search icon"
      />
      <input
        aria-roledescription="search bar to filter the products"
        aria-label="search bar"
        role="search"
        type="text"
        id="search"
        className="text-md w-full bg-transparent pr-7 text-slate-600 outline-0 focus:outline-0 sm:text-lg "
        defaultValue={searchParams.get("query") || ""}
        onChange={(e) => {
          if (crossRef.current) {
            if (e.target.value.length !== 0) {
              crossRef.current.dataset.showCross = "true";
            } else {
              crossRef.current.dataset.showCross = "";
            }
          }
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
        ref={inputRef}
        autoComplete="off"
        onFocus={() => inputRef.current?.select()}
      />
      <XCircleIcon
        ref={crossRef}
        className="absolute right-5 hidden h-7 w-7 cursor-pointer fill-slate-500 transition-colors duration-300 hover:fill-slate-600 data-[show-cross=true]:block"
        onClick={() => {
          if (inputRef.current && crossRef.current) {
            inputRef.current.value = "";
            crossRef.current.dataset.showCross = "";
            inputRef.current.focus();
            handleSearch("");
          }
        }}
      />
    </div>
  );
}
