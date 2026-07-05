import {Header} from "../components/Header";
import {AsideNavbar} from "../components/AsideNavbar";
import {NotificationBanner} from "../components/NotificationBanner";
import {FiPlus} from "react-icons/fi";
import Link from "next/link";
import {SupportCard} from "../components/SupportCard";
import {LatestTicketsTable} from "../components/LatestTicketsTable";
import {SchoolHealthCard} from "../components/SchoolHealthCard";

export default function ManagementPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header/>

            <div className="flex flex-1 min-h-0">
                <AsideNavbar/>

                <section className="px-28 py-14 w-[75%] mx-auto">
                    <NotificationBanner/>

                    <main className="">
                        <header className="flex my-16 justify-between">
                            <h1 className="font-semibold text-4xl">Olá! EMEF Carlos Altero Ortega</h1>

                            <Link href="/" className="flex items-center gap-3 bg-azul-escuro px-10 py-4 rounded-lg hover:bg-azul-claro transition">
                                <FiPlus size={30} className="text-white"/>

                                <p className="font-bold text-white text-lg">Novo chamado</p>
                            </Link>
                        </header>

                        <section className="flex justify-between gap-10">
                            <div>
                                <div className="flex justify-between">
                                    <SupportCard numCards={10} text="Chamados em aberto" />

                                    <SupportCard numCards={2} text="Chamados em andamento"/>
                                </div>

                                <LatestTicketsTable />
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