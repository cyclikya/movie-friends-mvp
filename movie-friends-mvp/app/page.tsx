export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
          Тестовая версия для друзей
        </p>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Выбирай фильмы вместе с друзьями и сохраняй, что уже посмотрел
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Личный список фильмов и сериалов, статусы просмотра, оценки,
          коллекции и будущая комната для совместного выбора фильма на вечер.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/search"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Найти фильм
          </a>

          <a
            href="/my-list"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-900"
          >
            Мой список
          </a>
        </div>
      </section>
    </main>
  );
}