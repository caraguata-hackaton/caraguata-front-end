import { MdGridView } from "react-icons/md"
import { LuMonitor, LuSofa, LuZap, LuDroplet } from "react-icons/lu"

const healthItems = [
    {
        label: "Infraestrutura",
        value: 72,
        color: "#3A7D3A",
        Icon: MdGridView,
    },
    {
        label: "Tecnologia",
        value: 84,
        color: "#2E7D32",
        Icon: LuMonitor,
    },
    {
        label: "Mobiliário",
        value: 32,
        color: "#B91C1C",
        Icon: LuSofa,
    },
    {
        label: "Elétrica",
        value: 60,
        color: "#F59E0B",
        Icon: LuZap,
    },
    {
        label: "Hidráulica",
        value: 100,
        color: "#2E7D32",
        Icon: LuDroplet,
    },
]

function selectGraphicColor(score) {
    if (score <= 40) return "var(--color-vermelho)"
    if (score <= 60) return "var(--color-amarelo)"

    return "var(--color-verde)"
}

export function SchoolHealthCard({ score = 10 }) {
    return (
        <aside className="w-80 rounded-lg border border-azul-escuro bg-branco px-8 py-10">
            <h2 className="text-3xl font-bold text-black">Saúde da escola</h2>

            <div className="mt-9 flex justify-center">
                <div className="flex h-52 w-52 items-center justify-center rounded-full"
                    style={{
                        background: `conic-gradient(${selectGraphicColor(score)} ${score}%, var(--color-branco) 0)`,
                    }}>

                    <div className="flex h-42 w-42 items-center justify-center rounded-full bg-branco">
                        <span className="text-5xl font-black" style={{ color: selectGraphicColor(score) }}>
                          {score}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
                {healthItems.map((item) => {
                    const Icon = item.Icon

                    return (
                        <div key={item.label} className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-branco text-azul-preto">
                                <Icon size={32} />
                            </div>

                            <div className="flex-1">
                                <p className="mb-2 text-base font-semibold text-black">
                                    {item.label}
                                </p>

                                <div className="h-3 w-full overflow-hidden rounded-full bg-branco">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${item.value}%`,
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}