// define o tipo de dados do estado da aplicação. fabricas do objeto com id e idCounter,
// propriedade somente leitura que gera o proximo id
type StateType = {
  fabricante: { id: number; fabricante: string; cilindrada: number }[];
  idCounter: number;
};
// exteção do objeto global (globalThis) para armazenar o estado das motos.
// Isso permite que o estado persista entre diferentes requisições durante o runtime da aplicação
// (util em desenvolvimento e ambiente serverless)
const globalForState = globalThis as unknown as {
  fabricanteState?: StateType;
};
// inicialização do estado global, verifica se o estado ja existe no objeto global.
// se não existir, cria um novo estado com os dados iniciais.
if (!globalForState.fabricanteState) {
  globalForState.fabricanteState = {
    fabricante: [
      { id: 1, fabricante: "Suzuki", cilindrada: 1200 },
      { id: 2, fabricante: "Yamaha", cilindrada: 600 },
      { id: 3, fabricante: "Kawasaki", cilindrada: 600 },
    ],
    // getter que calcula dinamicamente o proximo id disponivel
    // se existirem motos: retorna o maior id atual +1
    // se não existir motos retorna 1
    get idCounter() {
      return this.fabricante.length > 0
        ? Math.max(...this.fabricante.map((m) => m.id)) + 1
        : 1;
    },
  };
}
// exporta a referencia ao estado global para ser usado nos endpoints
// todos os endpoits compartilham a mesma instancia do estado
const state = globalForState.fabricanteState;

export default state;
