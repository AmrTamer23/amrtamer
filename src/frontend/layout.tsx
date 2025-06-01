import localFont from "next/font/local/index.js";

const nebula = localFont({
  src: "../lib/fonts/NebulaSans-Book.woff2",
  variable: "--sans",
  display: "swap",
  weight: "400",
});

const palaise = localFont({
  src: "../lib/fonts/STFWaicena-Sans.otf",
  variable: "--palaise",
  display: "swap",
  weight: "400",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
