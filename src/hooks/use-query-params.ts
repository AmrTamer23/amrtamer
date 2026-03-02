import { useState, useCallback, useEffect } from "react";

interface UseQueryParamOptions {
  defaultValue?: string;
  clearOnDefault?: boolean;
  parse?: (value: string) => string;
  serialize?: (value: string) => string;
}

/**
 * Minimal replacement for nuqs's useQueryState.
 * Reads/writes a single URL search parameter via history.pushState.
 * API is intentionally identical to nuqs's useQueryState.
 */
export function useQueryParam(
  key: string,
  options: UseQueryParamOptions = {}
): [string, (value: string | null) => void] {
  const {
    defaultValue = "",
    clearOnDefault = false,
    parse = (v: string) => v,
    serialize = (v: string) => v,
  } = options;

  const [value, setValue] = useState<string>(() => {
    if (typeof window === "undefined") return defaultValue;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(key);
    return raw !== null ? parse(raw) : defaultValue;
  });

  useEffect(() => {
    function onPopState() {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get(key);
      setValue(raw !== null ? parse(raw) : defaultValue);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [key, defaultValue, parse]);

  const setParam = useCallback(
    (newValue: string | null) => {
      const params = new URLSearchParams(window.location.search);

      if (
        newValue === null ||
        (clearOnDefault && newValue === defaultValue)
      ) {
        params.delete(key);
      } else {
        params.set(key, serialize(newValue));
      }

      const newSearch = params.toString();
      const newUrl =
        window.location.pathname +
        (newSearch ? `?${newSearch}` : "") +
        window.location.hash;

      history.pushState(null, "", newUrl);
      setValue(newValue ?? defaultValue);
    },
    [key, defaultValue, clearOnDefault, serialize]
  );

  return [value, setParam];
}
