export function AsideNavbar({ children }) {
    return (
        <aside className="flex flex-col p-4 w-64 shrink-0 bg-branco border-r border-azul-clarinho">
            {children}
        </aside>
    )
}