type StateType = {
  nomes: { id: number; nome: string }[];
  readonly idCounter: number;
};

const globalForState = globalThis as unknown as {
  motosState?: StateType;
};

if (!globalForState.motosState) {
  globalForState.motosState = {
    nomes: [
      { id: 1, nome: "Suzuki" },
      { id: 2, nome: "Yamaha" },
      { id: 3, nome: "Kawasaki" },
    ],
    get idCounter() {
      return this.nomes.length > 0
        ? Math.max(...this.nomes.map((m) => m.id)) + 1
        : 1;
    },
  };
}

const state = globalForState.motosState;

export default state;
