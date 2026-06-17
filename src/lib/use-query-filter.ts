"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseQueryFilterOptions = {
  param: string;
  allowedValues: string[];
  fallback?: string;
};

export function useQueryFilter({
  param,
  allowedValues,
  fallback = "All",
}: UseQueryFilterOptions) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const allowed = useMemo(
    () => new Set([fallback, ...allowedValues]),
    [allowedValues, fallback],
  );
  const rawValue = searchParams.get(param);
  const activeValue = rawValue && allowed.has(rawValue) ? rawValue : fallback;

  const writeValue = useCallback(
    (nextValue: string) => {
      const params = new URLSearchParams(queryString);

      if (nextValue === fallback) {
        params.delete(param);
      } else {
        params.set(param, nextValue);
      }

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    },
    [fallback, param, pathname, queryString, router],
  );

  useEffect(() => {
    if (rawValue && !allowed.has(rawValue)) {
      writeValue(fallback);
    }
  }, [allowed, fallback, rawValue, writeValue]);

  return [activeValue, writeValue] as const;
}
