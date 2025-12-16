"use client";
import { useState, useEffect } from "react";
import { AdicionarMoto } from "./adicionarMoto";
import { EditarMoto } from "./ediarMoto";

type Moto = {
  id: number;
  nome: string;
};

export default function PaginaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    async function buscarMotos() {
      const resposta = await fetch("http://localhost:3000/api/nomes");
      const data = await resposta.json();
      setMotos(data.nomes);
    }

    buscarMotos();
  }, []);

  return (
    <div className="bg-gray-700 p-6">
      <h1 className="font-bold text-2xl mb-6 ">Lista de Motos</h1>
      <AdicionarMoto />
      <div>
        {motos.map((moto) => (
          <EditarMoto key={moto.id} id={moto.id} nomeAtual={moto.nome} />
        ))}
      </div>
    </div>
  );
}
