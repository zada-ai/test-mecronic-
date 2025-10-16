 
export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  // lightweight wrapper so client pages can call server endpoints with consistent defaults
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init && (init as any).headers),
    },
    credentials: 'same-origin',
  });

  return res;
}

