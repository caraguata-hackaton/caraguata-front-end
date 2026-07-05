import { FaBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";
import logoImage from '../../../public/logo.png'

export function Header() {
    return (
        <header
            className="w-full flex py-7 px-12 justify-between shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] bg-branco z-10">
            <Image src={logoImage} alt="Logotipo do sistema SIMEC" width={262}/>

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