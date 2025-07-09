export function canonicalize(url: URL): string {
  const params = new URLSearchParams(url.searchParams);
  params.delete(SIG_PARAM);
  params.sort();
  return `${url.origin}${url.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
}
