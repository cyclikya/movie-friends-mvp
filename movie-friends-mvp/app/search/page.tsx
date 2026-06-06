"use client";

import Image from "next/image";
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
    <main className="px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm text-white/50">TMDB search</p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Поиск фильмов и сериалов
            </h1>

            <p className="mt-4 leading-7 text-white/60">
              Введи название фильма или сериала. Мы найдем данные, постеры,
              описание, год и рейтинг через TMDB.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Например: Avatar, Интерстеллар, Friends"
              className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-5 text-white outline-none transition placeholder:text-white/35 focus:border-white/30"
            />

            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="min-h-12 rounded-2xl bg-white px-7 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Ищу..." : "Найти"}
            </button>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
              {error}
            </div>
          )}
        </section>

        {results.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Результаты</h2>
                <p className="mt-1 text-sm text-white/50">
                  Найдено: {results.length}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:bg-white/[0.07]"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden bg-white/5">
                      {item.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          alt={title}
                          width={342}
                          height={513}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-white/40">
                          Нет постера
                        </div>
                      )}

                      <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs backdrop-blur">
                        {type}
                      </div>

                      <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                        {item.vote_average?.toFixed(1) ?? "нет"}
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-white/45">{year}</p>

                      <h3 className="mt-1 line-clamp-2 min-h-12 text-base font-medium leading-6">
                        {title}
                      </h3>

                      {item.overview && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/50">
                          {item.overview}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}