"use client";
import { useState } from "react";
// definiçào do formato (tipo) do objeto  (typescript)
// onExcluir: é uma função que não retorna nada
type Props = {
  id: number;
  nomeAtual: string;
  onExcluir: () => void; // o callback esta aqui
};

export function EditarMoto({ id, nomeAtual, onExcluir }: Props) {
  // estado para armazenar o novo nome e função para atualiza-lo, mostrando um campo em branco
  const [novoNome, setNovoNome] = useState("");
  // estado booleano que indica se o campo está em modo de edição
  const [editando, setEditando] = useState(false);

  //função para Editar
  async function editarMoto() {
    // O await pausa a execução até o servidor responder
    // quando a promessa do fetch é resolvida, recebemos um objeto Response e ele é atribuído a variavel.
    await fetch(`http://localhost:3000/api/motos/${id}`, {
      //"PATCH" envia dados para criar um novo recurso
      method: "PATCH",
      // headers são mais informaçoes enviadas junto da requisição
      // dizendo que o corpo da requisição esta em formato JSON
      headers: { "Content-Type": "application/json" },
      // body é o conteudo que sera enviado na requisição
      // // JSON.stringify transforma o objeto JS em string JSON
      // // nesse caso, enviamos { novoNome } para o backend
      body: JSON.stringify({ nomeNovo: novoNome }),
    });
    // sai do modo de edição
    setEditando(false);
    // recarrega a pagina para refletir os dados atualizados
    window.location.reload();
  }

  // função para excluir
  async function excluirMoto() {
    // mostra uma janela de confirmação, retorna true se o usuário clicar em OK
    const confirmacao = confirm("Tem certeza que deseja excluir?");
    // a ação de excluir só prossegue se o usuario confirmar
    if (confirmacao) {
      // O await pausa a execução até o servidor responder
      // quando a promessa do fetch é resolvida, recebemos um objeto Response e ele é atribuído a variavel.
      await fetch(`http://localhost:3000/api/motos/${id}`, {
        // metodo HTTP DELETE: indica ao servidor que o recurso deve ser removido
        method: "DELETE",
      });
      onExcluir(); // chama a função para atualizar a lista na tela
      setEditando(false); // sai do modo de edição após excluir
    }
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* mostra apenas o nome */}
      {!editando && (
        <strong
          className="cursor-pointer"
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
            className="text-green-500 ml-3 cursor-pointer"
          >
            Salvar
          </button>

          <button
            onClick={excluirMoto}
            className="text-red-500 ml-3 cursor-pointer"
          >
            Excluir
          </button>
        </>
      )}
    </div>
  );
}
