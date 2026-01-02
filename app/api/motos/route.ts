import state from "../dados";

export async function GET() {
  //retorna um objeto json contendo uma lista das motos
  return Response.json({
    mensagem: "Lista de Fabricantes",
    fabricantes: state.fabricante,
    //array com todas as motos armazenadas no state
  });
}
// recebe no corpo da requisição um objeto com a propriedade 'fabricante'
// e adiciona uma nova moto ao array state com id unico
export async function POST(req: any) {
  // req = objeto da requisição contendo o corpo com os dados da moto
  const body = await req.json();
  // constante que extrai as variavel do body
  const { fabricante, cilindrada } = body;
  // adiciona a nova moto ao array state com um id unico e incremental
  // (aqui se usa o contador atual do estado)
  state.fabricante.push({ id: state.idCounter, fabricante, cilindrada });
  // retorna uma resposta confirmando que a operação foi concluida
  return Response.json({
    mensagem: "Fabrica Adicionada",
  });
}
