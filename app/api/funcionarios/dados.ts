// define o tipo de dados do estado da aplicação. Nomes do objeto com id e idCounter,
// propriedade somente de leitura que gera o proximo id
type StateType = {
  funcionarios: {
    id: number;
    nome: string;
    endereco: string;
    dataNascimento: string;
    cargo: string;
  }[];
  idCounter: number;
};
// extenção do objeto global (globalThis) para armazenar o estado das motos.
// isto permite que o estado persista entre diferentes requisições durante o runtime da aplicação
// (util em desenvolvimento e ambiente serverless)
const globalForState = globalThis as unknown as {
  funcionariosState?: StateType;
};
// inicialização do estado global, verifica se o estado ja existe no objeto global.
// se não existir, cria um novo estado com os dados iniciais.
if (!globalForState.funcionariosState) {
  globalForState.funcionariosState = {
    funcionarios: [
      {
        id: 1,
        nome: "Hudson Cleiton de Paula",
        endereco: "Marciano Ferreira 244",
        dataNascimento: "19/06/1990",
        cargo: "Desenvolvedor",
      },
    ],
    // getter que calcula dinamicamente o proximo id disponivel
    // se existir motos: retorna o maior id atual +1
    // se não existir motos retorna 1
    get idCounter() {
      return this.funcionarios.length > 0
        ? Math.max(...this.funcionarios.map((f) => f.id)) + 1
        : 1;
    },
  };
}
// exporta a referencia ao estado global para ser usado nos endpoints
// todos os endpoints compartilham a mesma instancia do estado

const state = globalForState.funcionariosState;
export default state;
