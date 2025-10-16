// lib/api.ts
export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  // normalize headers safely without using `any` to satisfy eslint/ts rules
  const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json' };

  let mergedHeaders: HeadersInit;
  if (!init?.headers) {
    mergedHeaders = defaultHeaders;
  } else if (init.headers instanceof Headers) {
    mergedHeaders = new Headers(init.headers);
    // ensure default headers exist
    for (const [k, v] of Object.entries(defaultHeaders)) {
      if (!mergedHeaders.has(k)) mergedHeaders.set(k, String(v));
    }
  } else if (Array.isArray(init.headers)) {
    // HeadersInit can be [string, string][]
    mergedHeaders = new Headers(init.headers as [string, string][]);
    for (const [k, v] of Object.entries(defaultHeaders)) {
      if (!mergedHeaders.has(k)) mergedHeaders.set(k, String(v));
    }
  } else {
    // it's a Record<string, string>
    mergedHeaders = { ...defaultHeaders, ...(init.headers as Record<string, string>) };
  }

  const res = await fetch(input, {
    ...init,
    headers: mergedHeaders,
    credentials: 'same-origin',
  });

  return res;
}
