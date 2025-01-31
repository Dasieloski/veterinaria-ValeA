export async function GET() {
  return new Response(
    JSON.stringify({
      DATABASE_URL: process.env.DATABASE_URL ?? "No encontrada",
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? "No encontrada",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
