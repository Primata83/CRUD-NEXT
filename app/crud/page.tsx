"use client";
import { useState } from "react";

async function listarMotos() {
  const resposta = await fetch("http://localhost:3000/api/nomes");
  return resposta.json();
}

export default async function Motos() {
  const data = await listarMotos();

  return (
    <div>
      <h1 className="font-bold text-xl">Lista de Motos</h1>
      {data.nomes.map((motos: { id: number; nome: string }) => (
        <p key={motos.id}>{motos.nome}</p>
      ))}
    </div>
  );
}
