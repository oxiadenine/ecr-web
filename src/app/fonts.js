import { Orbitron, Monoton } from "next/font/google";

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  display: "swap",
  subsets: ["latin"]
});

export const monoton = Monoton({
  variable: "--font-monoton",
  weight: ["400"],
  subsets: ["latin"]
});
