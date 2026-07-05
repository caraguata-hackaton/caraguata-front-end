const statusStyles = {
    inProgress: {style: "bg-cinza text-cinza-escuro", text: "EM ANDAMENTO"},
    completed: {style: "bg-verde-claro text-verde-escuro", text: "CONCLUÍDO"},
    canceled: {style:"bg-vermelho-claro text-vermelho", text: "CANCELADO"},
}

export function StatusLabel({ status }) {
    const statusObject = statusStyles[status] || statusStyles.low

    return (
        <div className={`rounded-lg px-2 py-1 ${statusObject.style} items-center justify-center flex font-bold`}>
            {statusObject.text}
        </div>
    )
}