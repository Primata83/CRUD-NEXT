// PUT @@@@@@@@@@@@@@@@@@@@@@@
import db from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const motoId = parseInt(id, 10);

    if (isNaN(motoId)) {
      return new Response("ID inválido", { status: 400 });
    }

    const { fabricante, cilindrada } = await request.json();

    const result = await db.query(
      "UPDATE fabricante SET fabricante = $1, cilindrada = $2 WHERE id = $3 RETURNING *",
      [fabricante, cilindrada, motoId]
    );

    if (result.rowCount === 0) {
      return new Response("Moto não encontrada", { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("PUT erro:", error);
    return new Response("Erro ao atualizar fabricante", { status: 500 });
  }
}

// DELETE @@@@@@@@@@@@@@@@@@@@@@@
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const motoId = parseInt(id, 10);

    if (isNaN(motoId)) {
      return new Response("ID inválido", { status: 400 });
    }

    const result = await db.query(
      "DELETE FROM fabricante WHERE id = $1 RETURNING *",
      [motoId]
    );

    if (result.rowCount === 0) {
      return new Response("Moto não encontrada", { status: 404 });
    }

    return Response.json({ message: "Moto deletada com sucesso" });
  } catch (error) {
    console.error("DELETE erro:", error);
    return new Response("Erro ao deletar fabricante", { status: 500 });
  }
}
