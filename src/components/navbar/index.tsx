import Image from "next/image";
import Logo from "@/assets/MEI Logo.png";
import {
  NavigationLinksDesktop,
  NavigationLinksMobile,
} from "./navigationLinks";

export default function Navbar() {
  return (
    <div className="w-screen">
      <nav
        className="mx-auto my-4 flex w-[calc(100%-1rem)] items-center justify-between rounded-3xl bg-slate-100 px-4 py-4 sm:w-[calc(100%-2rem)] md:px-12 xl:px-16"
        aria-label="main-menu"
      >
        <picture>
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
    </div>
  );
}
