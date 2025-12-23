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
  const idMoto = parseInt(params.id);
  // parseia o corpo da requisição para extrair o novo nome
  const body = await req.json();
  const novoNome = body.nomeNovo;
  // localiza a posição (índice) da moto no array através do ID
  const index = state.nomes.findIndex((moto) => moto.id === idMoto);
  // verifica se a moto foi encontrada (indice diferente de -1)
  if (index !== -1) {
    // atualiza a moto mantendo o id original e alterando apenas o nome
    // usa spread operator (...) para preservar outras propriedades se existirem
    state.nomes[index] = { ...state.nomes[index], nome: novoNome };
    // retorna a confirmação da atualização com a lista completa atualizada
    return Response.json({
      mensagem: `Moto com ID ${idMoto} atualizada para ${novoNome}!`,
      listaAtual: state.nomes,
    });
  }
}
// recebe o id da moto via parametro (url)
export async function DELETE(
  // req objeto da requisição
  req: Request,
  // context = contexto da rota contendo parametros (id da moto)
  context: { params: Promise<{ id: string }> }
) {
  // desestrutura e guarda resoluçao da promisse dos parametros
  const { id } = await context.params;
  // converte o id da string para numeros inteiros
  const deletarID = parseInt(id);
  // busca o indice da moto no array pelo ID
  const index = state.nomes.findIndex((m) => m.id === deletarID);
  // armazena a referencia da moto que sera removida (para dar resposta)
  const remover = state.nomes[index];
  // splice(index 1) remove 1 elemento a partir do indice especificado
  state.nomes.splice(index, 1);
  // retorna a confirmação da exclusão com os dados da moto removida
  return Response.json({
    mensagem: `Moto com ID ${deletarID} deletada com sucesso.`,
    remover,
    listaAtual: state.nomes,
  });
}
