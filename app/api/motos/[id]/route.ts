// recebe o id da moto via parametro de rota e o nome do corpo na requisição.
// busca moto pelo id, atualiza e retorna a confirmação com a lista atualizada
import state from "../../dados";

export async function PATCH(
  // req objeto da requisição contendo o corpo com o novo nome
  // params = contexto da rota contendo id da moto
  req: any,
  context: { params: Promise<{ id: string }> }
) {
  // aguarda a resolução da promisse dos paremetros da rota
  const params = await context.params;
  // converte o id da string para numero inteiro
  const idFabricante = parseInt(params.id);
  // converte o corpo da requisição de string JSON para um objeto javascript

  const dadosAtualizados = await req.json();
  // localiza a posição (índice) da moto no array através do ID
  const index = state.fabricante.findIndex(
    (fabricante) => fabricante.id === idFabricante
  );
  // verifica se a fabricante foi encontrada (indice diferente de -1)
  if (index !== -1) {
    // atualiza a fabricante mantendo o id original e alterando apenas o nome
    // usa spread operator (...) para preservar outras propriedades se existirem
    state.fabricante[index] = {
      ...state.fabricante[index],
      ...dadosAtualizados,
    };
    // retorna a confirmação da atualização com a lista completa atualizada
    return Response.json({
      mensagem: `Fabricante com ID ${idFabricante} atualizado!`,
      listaAtual: state.fabricante,
    });
  }
}
// recebe o id da fabricante via parametro (url)
export async function DELETE(
  // req objeto da requisição
  req: Request,
  // context = contexto da rota contendo parametros (id da fabricante)
  context: { params: Promise<{ id: string }> }
) {
  // desestrutura e guarda resoluçao da promisse dos parametros
  const { id } = await context.params;
  // converte o id da string para numeros inteiros
  const deletarID = parseInt(id);
  // busca o indice da fabricante no array pelo ID
  const index = state.fabricante.findIndex((m) => m.id === deletarID);
  // armazena a referencia da fabricante que sera removida (para dar resposta)
  const remover = state.fabricante[index];
  // splice(index 1) remove 1 elemento a partir do indice especificado
  state.fabricante.splice(index, 1);
  // retorna a confirmação da exclusão com os dados da fabricante removida
  return Response.json({
    mensagem: `Fabricante com ID ${deletarID} deletada com sucesso.`,
    remover,
    listaAtual: state.fabricante,
  });
}
