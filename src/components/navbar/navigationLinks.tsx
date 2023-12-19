"use client";

import { Variants, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerIcon from "./hamburgerIcon";

type NavigationLink = {
  url: string;
  name: string;
};

const navLinks: NavigationLink[] = [
  {
    url: "/",
    name: "Home",
  },
  {
    url: "/about",
    name: "About",
  },
  {
    url: "/products",
    name: "Products",
  },
  {
    url: "/contact-us",
    name: "Contact Us",
  },
];

const hamburgerContainerVariants: Variants = {
  hidden: {
    x: "100%",
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      ease: "easeInOut",
    },
  },
  visible: {
    x: 0,
    transition: {
      ease: "easeOut",
      delayChildren: 0.4,
      staggerChildren: 0.05,
    },
  },
};

const hamburgerLinkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function NavigationLinksDesktop() {
  const currentPath = usePathname();
  const filteredIdx = navLinks.findIndex((link) => link.url === currentPath);
  const [selectedIdx, setSelectedIdx] = useState(filteredIdx);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);

  return (
    <ul
      className="hidden items-center text-zinc-500 md:flex md:gap-5 md:text-lg lg:gap-10 xl:text-xl 2xl:text-2xl"
      onMouseLeave={() => setFocusedIdx(null)}
      aria-label="primary navigation links"
    >
      {navLinks.map((link, idx) => (
        <li key={link.url} className="relative z-10">
          <Link
            href={link.url}
            className={`p-2 outline-offset-8 transition-all duration-500 ease-in-out hover:text-gray-800 focus:text-gray-800 ${
              selectedIdx === idx ? "font-semibold text-gray-800" : ""
            }`}
            onClick={() => setSelectedIdx(idx)}
            onFocus={() => setFocusedIdx(idx)}
            onMouseEnter={() => setFocusedIdx(idx)}
            onKeyDown={(e) => (e.key === "Enter" ? setSelectedIdx(idx) : null)}
          >
            {link.name}
          </Link>
          {focusedIdx === idx && (
            <motion.div
              layoutId="bg-hover"
              className="absolute inset-[-5px] z-[-10] rounded-lg bg-slate-200/60 md:inset-[-10px]"
              transition={{
                ease: "easeInOut",
                duration: 0.2,
              }}
            />
          )}
          {selectedIdx === idx && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-[-34px] left-[-5px] right-[-5px] h-[4px] rounded-sm bg-sky-700"
              transition={{
                duration: 0.3,
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

// mobile version will be fun
export function NavigationLinksMobile() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    setIsOpen((curr) => !curr);
  }
  return (
    <div className="md:hidden">
      <button
        onClick={handleClick}
        className="relative z-[100] rounded-full p-2 outline-offset-2 outline-cyan-400"
        data-open={isOpen}
      >
        <HamburgerIcon />
      </button>
      <motion.ul
        className="absolute bottom-0 left-0 right-0 top-0 z-10 flex translate-x-full flex-col gap-4 bg-white pt-28"
        variants={hamburgerContainerVariants}
        initial={false}
        animate={isOpen ? "visible" : "hidden"}
      >
        {navLinks.map((link) => (
          <motion.li
            key={link.url}
            variants={hamburgerLinkVariants}
            onClick={handleClick}
            className="mx-auto text-3xl"
          >
            {/* TODO: add more personality to the links, use some icons, style on the basis of active links */}
            <Link href={link.url}>{link.name}</Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
