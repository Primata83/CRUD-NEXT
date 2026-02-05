"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Funcionario {
  id: number;
  nome: string;
  endereco: string;
  datanascimento: string;
  salario: number;
  cargo: string;
}

export default function Page() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function buscarFuncionarios() {
    try {
      setCarregando(true);
      setErro(null);

      console.log("Buscando funcionários...");
      const resposta = await fetch("http://localhost:3000/api/funcionarios");

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const data = await resposta.json();
      console.log("Dados recebidos:", data);

      setFuncionarios(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      setErro(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const formatarSalario = (salario: number) => {
    return salario.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-l from-blue-400 to-yellow-400 p-6 text-black">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold mb-6 text-center">Funcionários</h1>
        <div className="bg-white rounded-lg shadow-lg">
          <Table className=" ">
            <TableCaption className="text-gray-400">#HASH</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-900 font-bold pl-5">
                  ID
                </TableHead>
                <TableHead className="text-gray-900">Nome</TableHead>
                <TableHead className="text-gray-900">Cargo</TableHead>
                <TableHead className="text-gray-900">Endereço</TableHead>
                <TableHead className="text-gray-900">Data Nascimento</TableHead>
                <TableHead className="text-gray-900">Salario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium text-gray-900 pl-5">
                    {funcionario.id}
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {funcionario.nome}
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {funcionario.cargo}
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {funcionario.endereco}
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {formatarData(funcionario.datanascimento)}
                  </TableCell>
                  <TableCell className=" text-gray-900">
                    {formatarSalario(funcionario.salario)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
