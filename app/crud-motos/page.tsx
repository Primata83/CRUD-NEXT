"use client";
import { useState, useEffect } from "react";
import { AdicionarMoto } from "./adicionarMoto";
import { EditarMoto } from "./editarMoto";
// definição do formato (tipo) do objeto moto (typescript)
type Moto = {
  id: number;
  nome: string;
};

export default function PaginaMotos() {
  // estado que armazena a lista de motos vinda da API
  const [motos, setMotos] = useState<Moto[]>([]);
  // função assincrona para buscar os dados da API
  async function buscarMotos() {
    // O Disparo (O Lado Direito): O JavaScript lê primeiro o fetch("url"). Ele "telefona" para o servidor. Nesse exato milésimo de segundo, ele cria uma Promise (a promessa).
    // A Pausa (O Meio): O await entra em cena. Ele diz: "JavaScript, pare tudo nesta função e espere essa promessa ser cumprida!". A execução fica suspensa aqui.
    // A Entrega (O Lado Esquerdo): Quando o servidor responde, a promessa é resolvida. O "embrulho" (objeto Response) chega e, só agora, o sinal de igual (=) funciona, guardando tudo dentro da const resposta.
    const resposta = await fetch("http://localhost:3000/api/motos");
    // transforma o corpo da resposta em JSON
    // aqui o JavaScript espera o servidor devolver os dados antes de continuar
    const data = await resposta.json();
    // atualiza o estado da lista com os nomes que vieram da API
    setMotos(data.nomes);
  }
  // useEffect: É o despertador. Ele toca assim que a página abre e manda rodar o buscarMotos.
  // buscarMotos: É o mensageiro. Ele vai até o servidor, pega os dados e volta.
  useEffect(() => {
    buscarMotos();
  }, []);

  return (
    <div className="bg-gray-700 p-6 text-white">
      <h1 className="font-bold text-2xl mb-6">Lista de Motos</h1>
      <AdicionarMoto />

      <div className="mt-4">
        {/* percorre a lista de motos e, para cada uma delas, cria um componente EditarMoto na tela */}
        {motos.map((moto) => (
          <EditarMoto
            key={moto.id}
            id={moto.id}
            nomeAtual={moto.nome}
            onExcluir={() => buscarMotos()}
          />
        ))}
      </div>
    </div>
  );
}
