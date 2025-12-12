import state from "../dados";

export async function GET() {
  return Response.json({
    mensagem: "Lista de Motos",
    nomes: state.nomes,
  });
}

export async function POST(req: any) {
  const body = await req.json();
  const nome = body.nome;
  state.nomes.push({ id: state.idCounter, nome });
  return Response.json({
    mensagem: "Moto Adicionada",
  });
}
