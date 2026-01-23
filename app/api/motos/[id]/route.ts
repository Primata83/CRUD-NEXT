// PUT @@@@@@@@@@@@@@@@@@@@@@@
import db from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const motoId = parseInt(id, 10);
    const { nome, fabricante_id, cilindrada_id, cor_id } = await request.json();

    if (isNaN(motoId)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const result = await db.query(
      "UPDATE modelos SET nome = $1, fabricante_id = $2, cilindrada_id = $3, cor_id = $4 WHERE id = $5 RETURNING id",
      [nome, fabricante_id, cilindrada_id, cor_id, motoId],
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Moto não encontrada" }, { status: 404 });
    }

    // Busca os dados completos com JOINs
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
      [motoId],
    );

    return Response.json(fullData.rows[0]);
  } catch (error) {
    console.error("PUT erro:", error);
    return Response.json(
      {
        error: "Erro ao atualizar modelo",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}

// DELETE @@@@@@@@@@@@@@@@@@@@@@@
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const motoId = parseInt(id, 10);

    if (isNaN(motoId)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const result = await db.query(
      "DELETE FROM modelos WHERE id = $1 RETURNING *",
      [motoId],
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Moto não encontrada" }, { status: 404 });
    }

    return Response.json({
      message: "Moto deletada com sucesso",
      deletado: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE erro:", error);
    return Response.json(
      {
        error: "Erro ao deletar modelo",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}
