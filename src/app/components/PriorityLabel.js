const priorityStyles = {
    baixa: "bg-green-100 text-green-700 border-green-300",
    media: "bg-yellow-100 text-yellow-700 border-yellow-300",
    alta: "bg-red-100 text-red-700 border-red-300",
}

const priorityLabels = {
    baixa: "BAIXA",
    media: "MÉDIA",
    alta: "ALTA",
}

export function PriorityLabel({ priority }) {
    return (
        <div className={`rounded-lg px-2 py-2 ${priorityStyles[priority]} items-center text-sm justify-center flex font-bold`}>
            {priorityLabels[priority]}
        </div>
    )
}