"use client";
import { useState } from "react";

type Props = {
  id: number;
  nomeAtual: string;
};

export function EditarMoto({ id, nomeAtual }: Props) {
  const [novoNome, setNovoNome] = useState("");
  const [editando, setEditando] = useState(false);

  async function editarMoto() {
    await fetch(`http://localhost:3000/api/nomes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeNovo: novoNome,
      }),
    });

    setEditando(false);
    setNovoNome("");
    window.location.reload();
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      {!editando && (
        <strong
          style={{ cursor: "pointer" }}
          onClick={() => {
            setEditando(true);
            setNovoNome(nomeAtual);
          }}
        >
          {nomeAtual}
        </strong>
      )}

      {editando && (
        <>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <button className="cursor-pointer" onClick={editarMoto}>
            Salvar
          </button>
        </>
      )}
    </div>
  );
}
