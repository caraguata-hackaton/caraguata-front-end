import { Header } from "../components/Header"
import { AsideNavbar } from "../components/AsideNavbar"
import { NotificationBanner } from "../components/NotificationBanner"
import { FiPlus } from "react-icons/fi"
import Link from "next/link"
import { SupportCard } from "../components/SupportCard"
import { LatestTicketsTable } from "../components/LatestTicketsTable"
import { SchoolHealthCard } from "../components/SchoolHealthCard"
import { getLatestTickets, getTicketCountByStatus } from "@/lib/getTickets"
import {AsideButton} from "../components/AsideButton";
import {MdGridView} from "react-icons/md";
import {LuTicketMinus} from "react-icons/lu";
import {RiGraduationCapLine} from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {requireRole} from "@/lib/authGuards";

export default async function ManagementPage() {

    const [user, latestTickets, openTicketsCount, inProgressTicketsCount] =
        await Promise.all([
            requireRole(["SCHOOL_USER"]),
            getLatestTickets(4),
            getTicketCountByStatus("OPEN"),
            getTicketCountByStatus("IN_PROGRESS"),
        ])

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <div className="flex flex-1 min-h-0">
                <AsideNavbar>
                    <AsideButton icon={ <MdGridView size={20}/> } text="Visão Geral" destination="/homeEscola" active={true}/>
                    <AsideButton icon={ <LuTicketMinus size={20}/> } text="Meus Chamados" destination="/chamadosEscola"/>
                    <AsideButton icon={ <RiGraduationCapLine size={20}/> } text="Dados da Unidade" destination="/gestao"/>
                    <AsideButton icon={ <AiOutlineQuestionCircle size={20}/> } text="Suporte" destination="/suporte"/>
                </AsideNavbar>

                <section className="px-28 py-14 w-[75%] mx-auto">
                    <NotificationBanner />

                    <main>
                        <header className="flex my-16 justify-between">
                            <div>
                                <h1 className="font-semibold text-4xl">
                                    Bem-vindo(a) {user.name}!
                                </h1>
                            </div>

                            <Link
                                href="/novoChamado"
                                className="flex items-center gap-3 bg-azul-escuro px-10 py-4 rounded-lg hover:bg-azul-claro transition"
                            >
                                <FiPlus size={30} className="text-white" />

                                <p className="font-bold text-white text-lg">Novo chamado</p>
                            </Link>
                        </header>

                        <section className="flex justify-between gap-10">
                            <div className="flex-1">
                                <div className="flex justify-between gap-8">
                                    <SupportCard
                                        numCards={openTicketsCount}
                                        text="Chamados em aberto"
                                    />

                                    <SupportCard
                                        numCards={inProgressTicketsCount}
                                        text="Chamados em andamento"
                                    />
                                </div>

                                <LatestTicketsTable tickets={latestTickets} />
                            </div>

                            <aside>
                                <SchoolHealthCard />
                            </aside>
                        </section>
                    </main>
                </section>
            </div>
        </div>
    )
}