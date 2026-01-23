// GET @@@@@@@@@@@@@@@@@@@@@@@
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT
    f.fabricante AS fabricante,
    m.nome AS modelo,
    c.nome AS cilindrada,
    co.nome AS cor,
    a.nome AS ano
FROM modelos m
JOIN fabricante f 
    ON f.id = m.fabricante_id
JOIN cilindradas c 
    ON c.id = m.cilindrada_id
JOIN cor co 
    ON co.id = m.cor_id
  JOIN ano a
    ON a.id = co.ano_id
ORDER BY f.id, m.id;
    `);
    return Response.json(result.rows);
  } catch (err) {
    console.error("GET erro:", err);
    return new Response("Erro ao buscar motos", { status: 500 });
  }
}

// POST @@@@@@@@@@@@@@@@@@@@@@@
export async function POST(request: Request) {
  try {
    const { nome, fabricante_id, cilindrada_id, cor_id } = await request.json();

    const result = await db.query(
      "INSERT INTO modelos (nome, fabricante_id, cilindrada_id, cor_id) VALUES ($1, $2, $3, $4) RETURNING id",
      [nome, fabricante_id, cilindrada_id, cor_id],
    );

    const id = result.rows[0].id;
    const fullData = await db.query(
      `SELECT
        m.id,
        f.fabricante AS fabricante,
        m.nome AS modelo,    
        c.nome AS cilindrada,
        co.nome AS cor,
        a.nome AS ano
      FROM modelos m
      JOIN fabricante f ON f.id = m.fabricante_id
      JOIN cilindradas c ON c.id = m.cilindrada_id
      JOIN cor co ON co.id = m.cor_id
      JOIN ano a ON a.id = co.ano_id
      WHERE m.id = $1`,
      [id],
    );

    return Response.json(fullData.rows[0]);
  } catch (err) {
    console.error("POST erro:", err);
    return Response.json(
      {
        error: "Erro ao criar modelo",
        details: err instanceof Error ? err.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}
