type StateType = {
  fabricante: { id: number; fabricante: string; cilindrada: number }[];
  idCounter: number;
};

const globalForState = globalThis as unknown as {
  fabricanteState?: StateType;
};

if (!globalForState.fabricanteState) {
  globalForState.fabricanteState = {
    fabricante: [
      { id: 1, fabricante: "Suzuki", cilindrada: 1200 },
      { id: 2, fabricante: "Yamaha", cilindrada: 600 },
      { id: 3, fabricante: "Kawasaki", cilindrada: 600 },
    ],
    get idCounter() {
      return this.fabricante.length > 0
        ? Math.max(...this.fabricante.map((m) => m.id)) + 1
        : 1;
    },
  };
}
const state = globalForState.fabricanteState;

export default state;
