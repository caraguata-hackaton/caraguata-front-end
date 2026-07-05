import { PriorityLabel } from "./PriorityLabel"
import { StatusLabel } from "./StatusLabel"

function formatTicketId(id) {
    return `#CH-${String(id).padStart(4, "0")}`
}

function formatDateTime(date) {
    if (!date) return "-"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "-"
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
        .format(parsedDate)
        .replace(",", " -")
}

function mapPriority(priority) {
    const priorityMap = {
        LOW: "baixa",
        MEDIUM: "media",
        HIGH: "alta",
        URGENT: "urgente",
    }

    return priorityMap[priority] || "media"
}

function mapStatus(status) {
    const statusMap = {
        OPEN: "open",
        IN_PROGRESS: "inProgress",
        COMPLETED: "completed",
        CANCELED: "canceled",
    }

    return statusMap[status] || "open"
}

export function LatestTicketsTable({ tickets = [] }) {
    return (
        <section className="mt-16 bg-branco py-7 px-8 rounded-lg border border-azul-escuro w-full">
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-black">
                    Últimos chamados
                </h2>

                <p className="mt-6">Acompanhe as solicitações mais recentes</p>
            </div>

            <table className="w-full table-fixed border-collapse">
                <colgroup>
                    <col className="w-[22%]" />
                    <col className="w-[20%]" />
                    <col className="w-[22%]" />
                    <col className="w-[20%]" />
                    <col className="w-[16%]" />
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
                {tickets.length === 0 && (
                    <tr>
                        <td
                            colSpan={5}
                            className="px-3 py-10 text-center text-lg font-medium text-gray-500"
                        >
                            Nenhum chamado encontrado.
                        </td>
                    </tr>
                )}

                {tickets.map((ticket) => (
                    <tr
                        key={ticket.id}
                        className="border-b border-gray-400 last:border-b-0"
                    >
                        <td className="px-3 py-6 align-middle">
                            <div className="flex flex-col">
                  <span className="font-bold text-azul-escuro">
                    {formatTicketId(ticket.id)}
                  </span>

                                <span className="max-w-38 font-semibold leading-tight text-black">
                    {ticket.title}
                  </span>
                            </div>
                        </td>

                        <td className="px-3 py-6 text-center align-middle">
                            <div className="flex justify-center">
                                <PriorityLabel priority={mapPriority(ticket.priority)} />
                            </div>
                        </td>

                        <td className="px-3 py-6 text-center align-middle">
                            <div className="flex justify-center">
                                <StatusLabel status={mapStatus(ticket.status)} />
                            </div>
                        </td>

                        <td className="px-3 py-6 text-center align-middle text-lg text-black">
                            {formatDateTime(ticket.createdAt)}
                        </td>

                        <td className="px-3 py-6 text-center align-middle text-lg text-black">
                            {ticket.estimatedAt
                                ? formatDateTime(ticket.estimatedAt)
                                : "Sem estimativa"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}