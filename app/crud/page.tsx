"use client";
import { useState, useEffect } from "react";
import { AdicionarMoto } from "./adicionarMoto";

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
    <div>
      <h1 className="font-bold text-xl mb-3">Lista de Motos</h1>
      <AdicionarMoto />
      <div>
        {motos.map((moto) => (
          <p key={moto.id}>{moto.nome}</p>
        ))}
      </div>
    </div>
  );
}
