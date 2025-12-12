import AcaoBotao from "./botao";
import { adicionarMoto, getMotos } from "./moto";

export default async function CrudPage() {
  const motos = await getMotos();

  return (
    <div>
      <div>
        <h2>Lista de Motos</h2>
        <ul>
          {motos.map((moto: string) => (
            <li key={moto}>{moto}</li>
          ))}
        </ul>
      </div>

      <form action={adicionarMoto.bind(null, "Ducati")}>
        <AcaoBotao />
      </form>
    </div>
  );
}
