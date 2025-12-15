"use client";

import { useState } from "react";

export function AdicionarMoto() {
  const [nome, setNome] = useState("");

  async function AdicionarMotos() {
    const resposta = await fetch("http://localhost:3000/api/nomes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
      }),
    });

    const dados = await resposta.json();
    console.log(dados);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome da moto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <button onClick={AdicionarMotos}>Adicionar moto</button>
    </div>
  );
}
