"use client";

import useDebounce from "@/hooks/useDebounce";
import createUrl from "@/utils/createUrl";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 400);

  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRender = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const newParams = new URLSearchParams(searchParams.toString());
    if (debouncedQuery.length === 0) {
      newParams.delete("query");
    } else {
      newParams.set("query", debouncedQuery);
    }
    router.push(createUrl("/products", newParams));
  }, [debouncedQuery, router, searchParams]);

  return (
    <div
      className="flex flex-grow items-center gap-2 rounded-full bg-slate-200 py-3 pl-5 pr-6 focus-within:outline focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-black sm:flex-grow-0"
      role="searchbox"
    >
      <MagnifyingGlassIcon
        className="h-6 w-6 stroke-slate-600 sm:h-9 sm:w-9"
        aria-label="search icon"
      />
      <input
        aria-roledescription="search bar to filter the products"
        aria-label="search bar"
        role="search"
        type="search"
        className="w-full bg-transparent text-lg text-slate-600 selection:bg-sky-700 selection:text-white focus:outline-0 sm:w-[150px] md:w-[250px] lg:w-[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Products ..."
        ref={inputRef}
        onFocus={() => inputRef.current?.select()}
      />
    </div>
  );
}
