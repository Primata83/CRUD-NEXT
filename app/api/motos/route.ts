// GET @@@@@@@@@@@@@@@@@@@@@@@
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM fabricante ORDER BY id ASC");
    return Response.json(result.rows);
  } catch (err) {
    console.error("GET erro:", err);
  }
}

// POST @@@@@@@@@@@@@@@@@@@@@@@
export async function POST(request: Request) {
  try {
    const { fabricante, cilindrada } = await request.json();
    const result = await db.query(
      "INSERT INTO fabricante (fabricante, cilindrada) VALUES ($1, $2) RETURNING *",
      [fabricante, cilindrada]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error("POST erro:", err);
  }
}
