import { PiGearSixBold } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

export function SupportCard({ numCards, text }) {
    return (
        <div className="relative flex flex-col w-100 py-5 pr-4 pl-7 bg-[linear-gradient(101deg,#2A638F_6.36%,#0C1C29_93.72%)] rounded-lg">
            <div className="relative z-10 flex justify-end">
                <Link href="/chamadosEscola" className="flex items-center font-bold py-1.5 px-2.5 bg-azul-escuro text-white rounded-lg shadow-[0_3px_4px_0_rgba(0,0,0,0.25)]">
                    Ver todos

                    <MdKeyboardArrowRight />
                </Link>
            </div>

            <div className="relative flex flex-col text-white pr-20">
                <p className="font-black text-6xl">{numCards}</p>

                <p className="font-semibold text-lg">{text}</p>
            </div>

            <PiGearSixBold size={85} className="absolute bottom-3 right-3 text-azul-escuro opacity-40"/>
        </div>
    )
}