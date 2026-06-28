import { useEffect } from "react";

const DEFAULT_TITLE = "SellingPoint — Verified Land Marketplace";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | SellingPoint` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}

export { DEFAULT_TITLE };
