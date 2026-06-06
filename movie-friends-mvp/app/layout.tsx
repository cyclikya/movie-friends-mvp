import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Movie Friends",
  description: "Сервис для выбора фильмов с друзьями и трекинга просмотров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070711]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg text-black">
                  MF
                </div>

                <div>
                  <p className="text-sm font-semibold leading-none">
                    Movie Friends
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    watch, rate, choose together
                  </p>
                </div>
              </Link>

              <nav className="flex items-center gap-2 text-sm text-white/70">
                <Link
                  href="/search"
                  className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
                >
                  Поиск
                </Link>

                <Link
                  href="/my-list"
                  className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
                >
                  Мой список
                </Link>

                <Link
                  href="/about"
                  className="hidden rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white sm:block"
                >
                  О проекте
                </Link>
              </nav>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}