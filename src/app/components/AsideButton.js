import Link from "next/link";

export function AsideButton({ icon, text, destination, active }) {
    return (
        <Link href={destination} className={`rounded-lg flex px-4 py-3 items-center gap-3 hover:brightness-70 ${active ? "bg-azul-clarinho" : ""} transition`}>
            {icon}

            <p className="font-bold text-azul-preto">{text}</p>
        </Link>
    )
}