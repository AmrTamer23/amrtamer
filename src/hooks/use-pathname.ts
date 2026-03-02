import { useState, useEffect } from "react";

/**
 * Replacement for usePathname() from next/navigation.
 * Listens to Astro's page-load event (ViewTransitions) and popstate.
 */
export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    function onNavigate() {
      setPathname(window.location.pathname);
    }

    // Astro's ViewTransitions fires this after every navigation
    document.addEventListener("astro:page-load", onNavigate);
    window.addEventListener("popstate", onNavigate);

    return () => {
      document.removeEventListener("astro:page-load", onNavigate);
      window.removeEventListener("popstate", onNavigate);
    };
  }, []);

  return pathname;
}
