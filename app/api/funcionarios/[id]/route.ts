import db from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const funcionariosId = parseInt(id, 10);

    const { nome, endereco, dataNascimento, cargo } = await request.json();

    if (isNaN(funcionariosId)) {
      return new Response("ID inválido", { status: 400 });
    }

    const result = await db.query(
      "UPDATE funcionarios SET nome = $1, endereco = $2, dataNascimento = $3, cargo = $4 WHERE id = $5 RETURNING *",
      [nome, endereco, dataNascimento, cargo, funcionariosId]
    );

    if (result.rowCount === 0) {
      return new Response("Funcionário não encontrado", { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("PUT erro:", error);
    return new Response("Erro ao atualizar funcionario", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const funcionariosId = parseInt(id, 10);

    if (isNaN(funcionariosId)) {
      return new Response("ID invalido", { status: 400 });
    }

    const result = await db.query(
      "DELETE FROM funcionarios WHERE id = $1 RETURNING *",
      [funcionariosId]
    );

    if (result.rowCount === 0) {
      return new Response("Funcionario não encontrado", { status: 404 });
    }

    return Response.json({ message: "Funcionario deletado com sucesso" });
  } catch (error) {
    console.error("DELETE erro", error);
  }
}
