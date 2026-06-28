export function buildListingsSearchUrl({
  keyword = "",
  state = "",
  price = "",
  types = "",
  sizes = "",
  verification = "",
  minPrice = "",
  maxPrice = "",
  sort = "",
  page = "",
} = {}) {
  const params = new URLSearchParams();

  const trimmedKeyword = keyword.trim();
  if (trimmedKeyword) params.set("q", trimmedKeyword);
  if (state && state !== "All States") params.set("state", state);
  if (price && price !== "Any Price") params.set("price", price);
  if (types) params.set("types", types);
  if (sizes) params.set("sizes", sizes);
  if (verification) params.set("verification", verification);
  if (minPrice) params.set("minPrice", String(minPrice));
  if (maxPrice) params.set("maxPrice", String(maxPrice));
  if (sort && sort !== "latest") params.set("sort", sort);
  if (page && Number(page) > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/properties?${query}` : "/properties";
}

export function parseListingsSearchParams(searchParams) {
  return {
    keyword: searchParams.get("q") ?? "",
    state: searchParams.get("state") ?? "",
    price: searchParams.get("price") ?? "",
    types: searchParams.get("types") ?? "",
    sizes: searchParams.get("sizes") ?? "",
    verification: searchParams.get("verification") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    sort: searchParams.get("sort") ?? "latest",
    page: Number(searchParams.get("page") ?? "1") || 1,
  };
}

export function buildResultsLabel(filters, { total = 0 } = {}) {
  const parts = [];

  if (filters.keyword) parts.push(`matching "${filters.keyword}"`);
  if (filters.state) parts.push(`in ${filters.state}`);
  if (filters.price && filters.price !== "Any Price") {
    parts.push(`at ${filters.price.toLowerCase()}`);
  }

  const countLabel = `${total} ${total === 1 ? "property" : "properties"}`;

  if (parts.length === 0) {
    return `${countLabel} across Nigeria`;
  }

  return `${countLabel} ${parts.join(" ")}`;
}

export function toggleListParam(current, value) {
  const list = current
    ? current.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const index = list.indexOf(value);
  if (index >= 0) list.splice(index, 1);
  else list.push(value);

  return list.join(",");
}
