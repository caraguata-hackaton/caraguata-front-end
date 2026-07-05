import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

export function Header() {
    return (
        <header
            className="w-full flex py-9 px-12 justify-between shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] bg-branco z-10">
            <Link href="/" className="font-bold text-azul-escuro text-2xl">SEDUC Gestão</Link>

            <nav className="flex gap-4">
                <button className="cursor-pointer text-azul-escuro">
                    <FaBell size={36}/>
                </button>

                <button className="cursor-pointer text-azul-escuro">
                    <IoPersonCircleOutline size={40}/>
                </button>
            </nav>
        </header>
    )
}