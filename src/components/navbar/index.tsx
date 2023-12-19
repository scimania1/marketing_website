import Image from "next/image";
import Logo from "@/assets/MEI Logo.png";
import {
  NavigationLinksDesktop,
  NavigationLinksMobile,
} from "./navigationLinks";

export default function Navbar() {
  return (
    <nav
      className="flex flex-grow items-center justify-between rounded-3xl bg-white px-4 py-4 sm:px-8 md:px-14 lg:px-16"
      aria-label="main-menu"
    >
      <picture className="z-20">
        <Image
          src={Logo}
          alt="Modern Engineers (India) Logo"
          className="aspect-[3/2] w-[4rem] object-contain sm:w-[6rem]"
          priority={true}
        />
      </picture>
      <NavigationLinksDesktop />
      <NavigationLinksMobile />
    </nav>
  );
}
