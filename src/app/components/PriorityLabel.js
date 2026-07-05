const priorityStyles = {
    high: {style: "bg-vermelho-claro text-vermelho", text: "ALTA"},
    medium: {style: "bg-amarelo-claro text-laranja", text: "MÉDIA"},
    low: {style:"bg-azul-bebezinho text-azul-escuro", text: "BAIXA"},
}

export function PriorityLabel({ priority}) {
    const priorityObject = priorityStyles[priority] || priorityStyles.low

    return (
        <div className={`rounded-lg px-2 py-1 ${priorityObject.style} items-center justify-center flex font-bold`}>
            {priorityObject.text}
        </div>
    )
}