"use server";

import { revalidatePath } from "next/cache";

const serverMotos = ["Yamaha", "Suzuki", "Kawawaki", "Honda"];

export async function adicionarMoto(nome: string) {
  serverMotos.push(nome);
  console.log("moto adicionada:", nome);
  revalidatePath("/crud");
}

export async function getMotos() {
  return serverMotos;
}
