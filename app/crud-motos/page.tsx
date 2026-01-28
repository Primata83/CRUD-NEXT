"use client";
import { useState, useEffect } from "react";
import { AdicionarMoto } from "./adicionarMoto";
import { EditarMoto } from "./editarMoto";

type Moto = {
  id: number;
  nome: string;
};

export default function Page() {
  // MUDANÇA: PaginaMotos → Page
  const [motos, setMotos] = useState<Moto[]>([]);

  async function buscarMotos() {
    const resposta = await fetch("http://localhost:3000/api/motos");
    const data = await resposta.json();
    setMotos(data);
  }

  useEffect(() => {
    buscarMotos();
  }, []);

  return (
    <div className="bg-gray-700 p-6 text-white">
      <h1 className="font-bold text-2xl mb-6">Lista de Motos</h1>
      <AdicionarMoto onAdicionar={buscarMotos} />

      <div className="mt-4">
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
