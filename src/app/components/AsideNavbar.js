import { AsideButton } from "./AsideButton";
import { MdGridView } from "react-icons/md";
import { LuTicketMinus } from "react-icons/lu";
import { RiGraduationCapLine } from "react-icons/ri";

export function AsideNavbar() {
    return (
        <aside className="flex flex-col p-4 w-64 shrink-0 bg-branco border-r border-azul-clarinho">
            <AsideButton icon={ <MdGridView size={20}/> } text="Dashboard" destination="/gestao"/>
            <AsideButton icon={ <LuTicketMinus size={20}/> } text="Chamados" destination="/gestao"/>
            <AsideButton icon={ <RiGraduationCapLine size={20}/> } text="Dados da escola" destination="/gestao"/>
        </aside>
    )
}