import { tmdbRequest } from "@/lib/tmdb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");
    const type = searchParams.get("type") ?? "multi";
    const page = searchParams.get("page") ?? "1";

    if (!query) {
      return Response.json(
        {
          ok: false,
          message: "Query is required",
        },
        { status: 400 }
      );
    }

    const path =
      type === "movie"
        ? "/search/movie"
        : type === "tv"
          ? "/search/tv"
          : "/search/multi";

    const data = await tmdbRequest({
      path,
      searchParams: {
        query,
        page,
        language: "ru-RU",
        include_adult: false,
      },
    });

    return Response.json({
      ok: true,
      results: data.results,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}