"use client";

import { useFormStatus } from "react-dom";

export default function AcaoBotao() {
  const {} = useFormStatus();

  return <button type="submit">Adicionar moto</button>;
}
