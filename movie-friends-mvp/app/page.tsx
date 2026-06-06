import Link from "next/link";

const features = [
  {
    title: "Личный список",
    description:
      "Сохраняй фильмы и сериалы, отмечай статусы, оценки и избранное.",
  },
  {
    title: "Прогресс сериалов",
    description:
      "Запоминай сезон и серию, на которой остановился, без заметок и хаоса.",
  },
  {
    title: "Выбор с друзьями",
    description:
      "Создавай комнату, голосуйте за фильмы и находите совпадения.",
  },
];

export default function Home() {
  return (
    <main className="px-5">
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col justify-center py-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            MVP для выбора фильмов и трекинга просмотров
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Выбрать фильм стало проще.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Movie Friends помогает искать фильмы и сериалы, сохранять их в
            личный список, отмечать просмотренное и выбирать, что посмотреть
            вместе с друзьями.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/search"
              className="rounded-full bg-white px-6 py-3 text-center font-medium text-black transition hover:bg-white/90"
            >
              Найти фильм
            </Link>

            <Link
              href="/my-list"
              className="rounded-full border border-white/15 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10"
            >
              Мой список
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <h2 className="text-xl font-medium">{feature.title}</h2>
              <p className="mt-3 leading-7 text-white/60">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}