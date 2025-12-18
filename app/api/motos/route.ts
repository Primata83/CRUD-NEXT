import state from "../dados";

export async function GET() {
  //retorna um objeto json contendo uma lista das motos
  return Response.json({
    mensagem: "Lista de Motos",
    nomes: state.nomes,
    //array com todas as motos armazenadas no state
  });
}

export async function POST(req: any) {
  //recebe no corpo da requisição um objeto com a propriedade 'nome' e adiciona uma nova moto ao array state com id unico
  const body = await req.json();
  //req = objeto da requisição contendo o corpo com os dados da moto
  const nome = body.nome;
  // extrai o nome da moto do corpo da requisição
  state.nomes.push({ id: state.idCounter, nome });
  //adiciona uma nova moto ao array com id incremental
  return Response.json({
    mensagem: "Moto Adicionada",
  });
}
