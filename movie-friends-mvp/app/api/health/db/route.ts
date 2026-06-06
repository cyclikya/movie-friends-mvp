import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const usersCount = await prisma.user.count();
    const titlesCount = await prisma.title.count();

    return Response.json({
      ok: true,
      database: "connected",
      usersCount,
      titlesCount,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        database: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}