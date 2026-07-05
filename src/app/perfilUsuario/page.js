import {requireRole} from "../../lib/authGuards";
import {PerfilUsuarioClient} from "./PerfilUsuarioClient";

export default async function Cadastro() {
  const user = await requireRole(["MANAGER", "SCHOOL_USER"])

  return <PerfilUsuarioClient />
}
