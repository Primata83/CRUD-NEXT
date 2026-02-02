import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type funcionario = {
  funcionario: string;
  endereco: string;
  dataNascimento: string;
  cargo: string;
  salario: string;
};

const funcionarios = [
  {
    id: 1,
    nome: "Hudson Cleiton de Paula",
    endereco: "Rua Marciano Ferreira 244 - Muriaé-MG Boa Familia",
    datanascimento: "1990-06-19T03:00:00.000Z",
    salario: 6500,
    cargo: "Programador",
  },
  {
    id: 2,
    nome: "Jefersom zem de paula",
    endereco: "Rua Jose vitor de moura ramos 129 - Taubaté-SP vila bela",
    datanascimento: "1994-04-21T03:00:00.000Z",
    salario: 5200,
    cargo: "Analista",
  },
  {
    id: 3,
    nome: "Pedro Otavio da Cunha",
    endereco: "Avenida zangada do foguete tesla 315 - tijuca-RJ caotico",
    datanascimento: "1993-10-18T02:00:00.000Z",
    salario: 4800,
    cargo: "QA",
  },
  {
    id: 4,
    nome: "João mesquito antonio",
    endereco: "Avenida marco catroli da cunha 85 - goias-GO Ayrton Senna",
    datanascimento: "1988-02-22T03:00:00.000Z",
    salario: 4500,
    cargo: "Designer",
  },
  {
    id: 5,
    nome: "Raimundo Ferreira Jorge",
    endereco: "Avenida das flores 2100 - Guarapari-ES serrado",
    datanascimento: "1991-08-03T03:00:00.000Z",
    salario: 4300,
    cargo: "DevOps",
  },
];

export default function Page() {
  return (
    <section className="min-h-screen text-center bg-linear-to-r from-orange-700 to-yellow-400 text-white">
      <h1 className="text-2xl font-bold p-4 text-black">Funcionarios</h1>
      <Table>
        <TableCaption>#</TableCaption>
        <TableHeader>
          <TableRow className="justify-between items-center ">
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead className="text-right">Cargo</TableHead>
            <TableHead className="text-right">Salario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funcionarios.map((funcionario) => (
            <TableRow key={funcionario.id}>
              <TableCell className="font-medium">{funcionario.nome}</TableCell>
              <TableCell>{funcionario.endereco}</TableCell>
              <TableCell>{funcionario.datanascimento}</TableCell>
              <TableCell>{funcionario.cargo}</TableCell>
              <TableCell className="text-right">
                {funcionario.salario}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
