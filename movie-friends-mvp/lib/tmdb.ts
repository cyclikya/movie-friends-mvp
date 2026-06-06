const TMDB_BASE_URL = "https://api.themoviedb.org/3";

type TmdbRequestOptions = {
  path: string;
  searchParams?: Record<string, string | number | boolean | undefined>;
};

export async function tmdbRequest({ path, searchParams }: TmdbRequestOptions) {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is not set");
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(`TMDB request failed: ${response.status} ${text}`);
  }

  return response.json();
}