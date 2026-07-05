import {requireRole} from "@/lib/authGuards";
import {NewTicketClient} from "@/app/novoChamado/NovoChamadoClient";

export default async function HomePage() {
  const user = await requireRole(["SCHOOL_USER"])

  return <NewTicketClient user={user} school={user.school} />
}