"use client";

import { useState } from "react";

type SearchResult = {
  id: number;
  media_type?: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/tmdb/search?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Search failed");
      }

      setResults(
        data.results.filter((item: SearchResult) => {
          const type = item.media_type;

          return type === "movie" || type === "tv" || !type;
        })
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Поиск фильмов и сериалов</h1>

        <p className="mt-2 text-sm opacity-70">
          Введи название фильма или сериала. Данные загружаются из TMDB.
        </p>

        <div className="mt-6 flex gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Например: Avatar, Интерстеллар, Friends"
            className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 outline-none"
          />

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="rounded-lg bg-white px-5 py-3 text-black disabled:opacity-50"
          >
            {isLoading ? "Ищу..." : "Найти"}
          </button>
        </div>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item) => {
            const title = item.title || item.name || "Без названия";

            const year =
              item.release_date?.slice(0, 4) ||
              item.first_air_date?.slice(0, 4) ||
              "Год неизвестен";

            const type =
              item.media_type === "tv"
                ? "Сериал"
                : item.media_type === "movie"
                  ? "Фильм"
                  : "Тайтл";

            return (
              <article
                key={`${item.media_type}-${item.id}`}
                className="rounded-xl border border-white/10 p-4"
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                    alt={title}
                    className="mb-3 aspect-[2/3] w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="mb-3 flex aspect-[2/3] items-center justify-center rounded-lg bg-white/10 text-sm opacity-70">
                    Нет постера
                  </div>
                )}

                <div className="mb-2 flex items-center gap-2 text-xs opacity-70">
                  <span>{type}</span>
                  <span>{year}</span>
                </div>

                <h2 className="text-lg font-medium">{title}</h2>

                <p className="mt-1 text-sm opacity-70">
                  Рейтинг: {item.vote_average?.toFixed(1) ?? "нет"}
                </p>

                {item.overview && (
                  <p className="mt-3 line-clamp-4 text-sm opacity-70">
                    {item.overview}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}