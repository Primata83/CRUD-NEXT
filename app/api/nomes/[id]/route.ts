import state from "../../dados";

export async function PATCH(
  req: any,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const idMoto = parseInt(params.id);
  const body = await req.json();
  const novoNome = body.nomeNovo;

  const index = state.nomes.findIndex((moto) => moto.id === idMoto);

  if (index !== -1) {
    state.nomes[index] = { ...state.nomes[index], nome: novoNome };

    return Response.json({
      mensagem: `Moto com ID ${idMoto} atualizada para ${novoNome}!`,
      listaAtual: state.nomes,
    });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const deletarID = parseInt(id);

  const index = state.nomes.findIndex((m) => m.id === deletarID);

  const remover = state.nomes[index];

  state.nomes.splice(index, 1);

  return Response.json({
    mensagem: `Moto com ID ${deletarID} deletada com sucesso.`,
    remover,
    listaAtual: state.nomes,
  });
}
