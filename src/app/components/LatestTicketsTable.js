import {PriorityLabel} from "./PriorityLabel"
import {StatusLabel} from "./StatusLabel"

const tickets = [
    {
        id: "#CH-2024-879",
        title: "Vazamento nos banheiros",
        priority: "alta",
        status: "inProgress",
        openedAt: "11/05/2024 - 15:30",
        estimate: "13/05 às 14:00",
    },
    {
        id: "#CH-2024-879",
        title: "Vazamento nos banheiros",
        priority: "media",
        status: "completed",
        openedAt: "11/05/2024 - 15:30",
        estimate: "13/05 às 14:00",
    },
    {
        id: "#CH-2024-879",
        title: "Vazamento nos banheiros",
        priority: "baixa",
        status: "completed",
        openedAt: "11/05/2024 - 15:30",
        estimate: "13/05 às 14:00",
    },
    {
        id: "#CH-2024-879",
        title: "Vazamento nos banheiros",
        priority: "baixa",
        status: "completed",
        openedAt: "11/05/2024 - 15:30",
        estimate: "13/05 às 14:00",
    },
]

export function LatestTicketsTable() {
    return (
        <section className="mt-16 bg-branco py-7 px-8 rounded-lg border border-azul-escuro w-full">
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-black">Últimos chamados</h2>
                <p className="mt-6">
                    Acompanhe as solicitações mais recentes
                </p>
            </div>

            <table className="w-full table-fixed border-collapse">
                <colgroup>
                    <col className="w-[22%]"/>
                    <col className="w-[20%]"/>
                    <col className="w-[22%]"/>
                    <col className="w-[20%]"/>
                    <col className="w-[16%]"/>
                </colgroup>

                <thead>
                <tr className="text-center font-semibold uppercase tracking-wider text-black">
                    <th className="px-3 pb-6 text-left">ID / CHAMADO</th>
                    <th className="px-3 pb-6">PRIORIDADE</th>
                    <th className="px-3 pb-6">STATUS</th>
                    <th className="px-3 pb-6">ABERTO EM</th>
                    <th className="px-3 pb-6">ESTIMATIVA</th>
                </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-400 last:border-b-0">
                                <td className="px-3 py-6 align-middle">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-azul-escuro">
                                            {ticket.id}
                                        </span>
                                        <span className="max-w-38 font-semibold leading-tight text-black">
                                            {ticket.title}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-3 py-6 text-center align-middle">
                                    <div className="flex justify-center">
                                        <PriorityLabel priority={ticket.priority}/>
                                    </div>
                                </td>

                                <td className="px-3 py-6 text-center align-middle">
                                    <div className="flex justify-center">
                                        <StatusLabel status={ticket.status}/>
                                    </div>
                                </td>

                                <td className="px-3 py-6 text-center align-middle text-lg text-black">
                                    {ticket.openedAt}
                                </td>

                                <td className="px-3 py-6 text-center align-middle text-lg text-black">
                                    {ticket.estimate}
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}