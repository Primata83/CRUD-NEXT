import state from "../dados";

export async function PATCH(
  req: any,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const idFuncionario = parseInt(params.id);
  const dadosAtualizados = await req.json();

  const index = state.funcionario.findIndex(
    (funcionario) => funcionario.id === idFuncionario
  );

  if (index !== -1) {
    state.funcionario[index] = {
      ...state.funcionario[index],
      ...dadosAtualizados,
    };

    return Response.json({
      mensagem: `Funcionario com ID ${idFuncionario} atualizado!`,
      listaAtual: state.funcionario,
    });
  }
}
