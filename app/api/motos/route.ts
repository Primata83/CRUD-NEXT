import state from "../dados";

export async function GET() {
  //retorna um objeto json contendo uma lista das motos
  return Response.json({
    mensagem: "Lista de Motos",
    nomes: state.nomes,
    //array com todas as motos armazenadas no state
  });
}
// recebe no corpo da requisição um objeto com a propriedade 'nome'
// e adiciona uma nova moto ao array state com id unico
export async function POST(req: any) {
  // req = objeto da requisição contendo o corpo com os dados da moto
  const body = await req.json();
  // constante que extrai as variavel do body
  const { nome, cilindrada } = body;
  // adiciona a nova moto ao array state com um id unico e incremental
  // (aqui se usa o contador atual do estado)
  state.nomes.push({ id: state.idCounter, nome, cilindrada });
  // retorna uma resposta confirmando que a operação foi concluida
  return Response.json({
    mensagem: "Moto Adicionada",
  });
}
