// define o tipo de dados do estado da aplicação. Nomes do objeto com id e idCounter,
// propriedade somente leitura que gera o proximo id
type StateType = {
  nomes: { id: number; nome: string; cilindrada: number }[];
  idCounter: number;
};
// exteção do objeto global (globalThis) para armazenar o estado das motos.
// Isso permite que o estado persista entre diferentes requisições durante o runtime da aplicação
// (util em desenvolvimento e ambiente serverless)
const globalForState = globalThis as unknown as {
  motosState?: StateType;
};
// inicialização do estado global, verifica se o estado ja existe no objeto global.
// se não existir, cria um novo estado com os dados iniciais.
if (!globalForState.motosState) {
  globalForState.motosState = {
    nomes: [
      { id: 1, nome: "Suzuki", cilindrada: 1200 },
      { id: 2, nome: "Yamaha", cilindrada: 600 },
      { id: 3, nome: "Kawasaki", cilindrada: 600 },
    ],
    // getter que calcula dinamicamente o proximo id disponivel
    // se existirem motos: retorna o maior id atual +1
    // se não existir motos retorna 1
    get idCounter() {
      return this.nomes.length > 0
        ? Math.max(...this.nomes.map((m) => m.id)) + 1
        : 1;
    },
  };
}
// exporta a referencia ao estado global para ser usado nos endpoints
// todos os endpoits compartilham a mesma instancia do estado
const state = globalForState.motosState;

export default state;
