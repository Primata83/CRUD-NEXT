// GET @@@@@@@@@@@@@@@@@@@@@@@@@
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM funcionarios ORDER BY id ASC");
    return Response.json(result.rows);
  } catch (err) {
    console.error("GET erro:", err);
    return new Response("Erro ao buscar funcionarios", { status: 500 });
  }
}

// POST @@@@@@@@@@@@@@@@@@@@@@@@@
export async function POST(request: Request) {
  try {
    const { nome, endereco, dataNascimento, cargo } = await request.json();

    const result = await db.query(
      "INSERT INTO funcionarios (nome, endereco, dataNascimento, cargo) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, endereco, dataNascimento, cargo]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error("POST erro:", err);
    return new Response("Erro ao adicionar funcionario", { status: 500 });
  }
}
