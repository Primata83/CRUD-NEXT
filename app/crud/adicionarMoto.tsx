"use client";
import { useState } from "react";

export function AdicionarMoto() {
  //nome = valor atual e setNome altera esse estado
  const [nome, setNome] = useState("");

  async function adicionarMoto() {
    // faz o javaScript esperar a resposta do servidor antes de continuar.
    // guarda o objeto da resposta (não é o JSON ainda, é um objeto
    // dispara uma requisição HTTP para a URL que voce passar.
    // transforma o corpo da resposta em JSON, que é o que você realmente quer usar.
    const resposta = await fetch("http://localhost:3000/api/nomes", {
      //"POST" envia dados para criar um novo recurso
      method: "POST",
      // headers são mais informaçoes enviadas junto da requisição
      // dizendo que o corpo da requisição esta em formato JSON
      headers: {
        "Content-Type": "application/json",
      },
      // body é o conteudo que sera enviado na requisição
      // // JSON.stringify transforma o objeto JS em string JSON
      // // nesse caso, enviamos { nome } para o backend
      body: JSON.stringify({ nome }),
    });
    // transforma o corpo da resposta em JSON
    // aqui o JavaScript espera o servidor devolver os dados antes de continuar
    const dados = await resposta.json();
    // exibe no console o objeto já convertido em JSON
    // para verificar se a requisição funcionou e quais dados vieram
    console.log(dados);
    // atualiza o estado 'nome' para vazio
    // isso limpa o input depois de adicionar a moto
    setNome("");

    // Recarrega a pagina para mostrar a nova moto
    window.location.reload();
  }

  return (
    <div>
      <h2 className="font-bold">Adicionar Nova Moto</h2>
      <input
        type="text"
        placeholder="Nome da moto"
        //é o evento disparado sempre que o valor do input muda (quando o usuario digita algo).
        value={nome}
        //é uma arrow function que recebe o evento (e) como parâmetro
        // atualiza o estado nome com esse novo valor
        onChange={(e) => setNome(e.target.value)}
        className="mb-5"
      />
      <button className="cursor-pointer" onClick={adicionarMoto}>
        Adicionar
      </button>
    </div>
  );
}
