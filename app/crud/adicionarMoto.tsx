"use client";
import { useState } from "react";

export function AdicionarMoto() {
  const [nome, setNome] = useState("");

  async function adicionarMoto() {
    const resposta = await fetch("http://localhost:3000/api/nomes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    const dados = await resposta.json();
    console.log(dados);
    setNome(""); // Limpa o input

    // Recarrega a pagina para mostrar a nova moto
    window.location.reload();
  }

  return (
    <div>
      <h2>Adicionar Nova Moto</h2>
      <input
        type="text"
        placeholder="Nome da moto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button onClick={adicionarMoto}>Adicionar</button>
    </div>
  );
}
