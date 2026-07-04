import Link from "next/link";

export function AsideButton({ icon, text, destination }) {
    return (
        <Link href={destination} className="flex px-4 py-3 items-center gap-3 hover:brightness-0">
            {icon}

            <p className="font-bold text-azul-preto">{text}</p>
        </Link>
    )
}