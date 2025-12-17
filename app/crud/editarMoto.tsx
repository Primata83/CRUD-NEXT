"use client";
import { useState } from "react";

type Props = {
  id: number;
  nomeAtual: string;
  onExcluir: () => void; // o callback esta aqui
};

export function EditarMoto({ id, nomeAtual, onExcluir }: Props) {
  const [novoNome, setNovoNome] = useState("");
  const [editando, setEditando] = useState(false);

  //função para Editar
  async function editarMoto() {
    await fetch(`http://localhost:3000/api/nomes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomeNovo: novoNome }),
    });
    setEditando(false);
    window.location.reload();
  }

  // função para excluir
  async function excluirMoto() {
    const confirmacao = confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
      await fetch(`http://localhost:3000/api/nomes/${id}`, {
        method: "DELETE",
      });
      onExcluir(); // chama a função para atualizar a lista na tela
      setEditando(false);
    }
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* mostra apenas o nome */}
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

      {/* mostra o input e os botões de salvar e excluir */}
      {editando && (
        <>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            autoFocus
          />

          <button
            onClick={editarMoto}
            style={{ marginLeft: "5px", color: "green" }}
          >
            Salvar
          </button>

          <button
            onClick={excluirMoto}
            style={{ marginLeft: "5px", color: "red" }}
          >
            Excluir
          </button>
        </>
      )}
    </div>
  );
}
