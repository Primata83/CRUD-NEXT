"use client";
import { useState, useEffect } from "react";

type Moto = {
  fabricante: string;
  modelo: string;
  cilindrada: string;
  cor: string;
  ano: string;
};

export default function Page() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function buscarMotos() {
    try {
      setCarregando(true);
      setErro(null);

      console.log("Buscando motos...");
      const resposta = await fetch("http://localhost:3000/api/motos");

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const data = await resposta.json();
      console.log("Dados recebidos:", data);

      setMotos(data);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
      setErro(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {
    buscarMotos();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-400 p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold">Motos da Minha Trilha</h1>
        </div>
        {!carregando && motos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {motos.map((moto, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.06]"
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">
                    {moto.fabricante} {moto.modelo}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cilindrada:</span>
                      <span className="text-white font-medium">
                        {moto.cilindrada}cc
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cor:</span>
                      <span className="text-white font-medium capitalize">
                        {moto.cor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ano:</span>
                      <span className="text-white font-medium">{moto.ano}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
