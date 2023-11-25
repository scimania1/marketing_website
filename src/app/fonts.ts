import { Inter, Playfair_Display } from "next/font/google";

export const openSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-primary",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--ff-accent",
  display: "swap",
});
