const statusStyles = {
    open: "bg-blue-100 text-blue-700",
    inProgress: "bg-cinza-claro text-cinza-escuro",
    completed: "bg-verde-claro text-verde-escuro",
    canceled: "bg-vermelho-claro text-vermelho",
}

const statusLabels = {
    open: "ABERTO",
    inProgress: "EM ANDAMENTO",
    completed: "CONCLUÍDO",
    canceled: "CANCELADO",
}
export function StatusLabel({ status }) {
    return (
        <div className={`rounded-lg px-2 py-2 text-sm  ${statusStyles[status]} items-center justify-center flex font-bold`}>
            {statusLabels[status]}
        </div>
    )
}