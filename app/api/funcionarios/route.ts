import state from "./dados";

// retorna um objeto json contendo uma lista das motos
export async function GET() {
  return Response.json({
    mensagem: "Lista de Funcionarios",
    // array com todos os nomes armazenados no ''state''
    funcionario: state.funcionario,
  });
}
export async function POST(req: any) {
  // req = objeto da requisição contendo o corpo com os dados dos funcionarios
  const body = await req.json();
  // constante que extrai as variaveis do body
  const { nome, endereco, dataNascimento, cargo } = body;
  // adiciona um funcionario ao array state com um id unico e incremental
  // (aqui se usa o contador atual do estado)
  state.funcionario.push({
    id: state.idCounter,
    nome,
    endereco,
    dataNascimento,
    cargo,
  });
  return Response.json({
    mensagem: "Funcionario Adicionado",
  });
}
