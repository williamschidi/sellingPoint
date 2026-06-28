import { useEffect } from "react";
import { DEFAULT_TITLE } from "./useDocumentTitle";

/**
 * Sets document title and meta tags for the current route.
 * TODO: Replace DOM updates with SSR/prerender or react-helmet-async when backend SSR is added.
 *
 * @param {{ title?: string, description?: string, path?: string, type?: string }} meta
 */
export function usePageMeta({
  title = "",
  description = "",
  path = "",
  type = "website",
} = {}) {
  useEffect(() => {
    document.title = title ? `${title} | SellingPoint` : DEFAULT_TITLE;

    const origin = window.location.origin;
    const url = path ? `${origin}${path}` : window.location.href;

    const tags = [
      { name: "description", content: description },
      { property: "og:title", content: title ? `${title} | SellingPoint` : DEFAULT_TITLE },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title ? `${title} | SellingPoint` : DEFAULT_TITLE },
      { name: "twitter:description", content: description },
    ];

    const managed = [];

    for (const tag of tags) {
      if (!tag.content) continue;

      const selector = tag.name
        ? `meta[name="${tag.name}"]`
        : `meta[property="${tag.property}"]`;

      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (tag.name) element.setAttribute("name", tag.name);
        if (tag.property) element.setAttribute("property", tag.property);
        document.head.appendChild(element);
        managed.push(element);
      }

      element.setAttribute("content", tag.content);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (path) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
        managed.push(canonical);
      }
      canonical.setAttribute("href", url);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      for (const element of managed) {
        element.remove();
      }
    };
  }, [title, description, path, type]);
}
