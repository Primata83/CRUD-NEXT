// recebe o id do funcionario via parametro de rota e o nome do corpo da requisição.
// busca o funcionario pelo id, atualiza e retorna a confirmação com a lista atualizada
import state from "../dados";

export async function PATCH(
  // req = objeto da requisição contendo o corpo com o novo nome
  // params = contexto da rota contendo id da moto
  req: any,
  context: { params: Promise<{ id: string }> }
) {
  // aguarda a resolução da promisse dos parametros da rota
  const params = await context.params;
  // converte o id da string para numero inteiro
  const idFuncionario = parseInt(params.id);
  // converte o corpo da requisição de string JSON para um objeto javascript
  const dadosAtualizados = await req.json();
  // localiza a posição (índice) da moto no array através do ID
  const index = state.funcionario.findIndex(
    (funcionario) => funcionario.id === idFuncionario
  );
  // verifica se o funcionario foi encontrado (indice diferente de -1)
  if (index !== -1) {
    // atualiza o funcionario mantendo o id original e alterando apenas os dados
    // usa spread operatos (...) para preservar outras propriedades, se existirem
    state.funcionario[index] = {
      ...state.funcionario[index],
      ...dadosAtualizados,
    };
    // retorna a onfirmação da atualização com a lista completa atualizada
    return Response.json({
      mensagem: `Funcionario com ID ${idFuncionario} atualizado!`,
      listaAtual: state.funcionario,
    });
  }
}

// recebe o id do funcionario via parametro (url) para deletar ele
export async function DELETE(
  // req = objeto da requisição
  req: Request,
  // context = contexto da rota contendo parametros (id da moto)
  context: { params: Promise<{ id: string }> }
) {
  // desestrutura e guarda resolução da promisse dos parametros
  const { id } = await context.params;
  // converte o id da string para numeros inteiros
  const deletarID = parseInt(id);
  // busca o indice do funcionario no array pelo ID
  const index = state.funcionario.findIndex((f) => f.id === deletarID);
  // armazena a referencia do funcionario na posição encontrada
  const remover = state.funcionario[index];
  // splice(index 1) remove 1 elemento a partir do indice especificado
  state.funcionario.splice(index, 1);
  // retorna a demissão do funcionario
  return Response.json({
    mensagem: `Funcionario com o ID ${deletarID} demitido!`,
    remover,
    listaAtual: state.funcionario,
  });
}
