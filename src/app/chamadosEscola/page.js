import { ChamadosEscolaClient } from "./ChamadosEscolaClient"
import {requireRole} from "@/lib/authGuards";

export default async function ChamadosEscolaPage() {
    const user = await requireRole(["SCHOOL_USER"])

    return <ChamadosEscolaClient user={user} school={user.school} />
}