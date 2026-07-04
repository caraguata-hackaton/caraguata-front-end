import { Header } from "../components/Header";
import {AsideNavbar} from "../components/AsideNavbar";

export default function ManagementPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <div className="flex flex-1 min-h-0">
                <AsideNavbar />

                <main className="flex-1 p-6">
                    Conteúdo
                </main>
            </div>
        </div>
    )
}