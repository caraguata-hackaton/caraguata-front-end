import { requireRole } from "@/lib/authGuards"
import { PainelChamadosClient } from "./PainelChamadosClient"

export default async function PainelChamadosPage() {
  const user = await requireRole(["MANAGER"])

  return <PainelChamadosClient user={user} />
}