"use client";
import { useState, useEffect } from "react";
import { AdicionarMoto } from "./adicionarMoto";
import { EditarMoto } from "./editarMoto";

type Moto = {
  id: number;
  nome: string;
};

interface AdicionarMotoProps {
  onAdicionar: () => Promise<void>;
}

export default function Page() {
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
    <div className="min-h-screen bg-gradient from-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-wide">
            Cadastro de Motos
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {motos.map((moto) => (
            <div
              key={moto.id}
              className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col gap-4">
                {/* Nome */}
                <h2 className="text-xl font-semibold text-blue-400">
                  {moto.nome}
                </h2>

                {/* Ações */}
                <EditarMoto
                  id={moto.id}
                  nomeAtual={moto.nome}
                  onExcluir={buscarMotos}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
