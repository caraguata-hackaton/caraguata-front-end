import { BsExclamationCircle } from "react-icons/bs";
import Link from "next/link";

export function NotificationBanner() {
    return (
        <div className="flex p-5 border border-azul-escuro rounded-lg bg-branco gap-4">
            <BsExclamationCircle size={40} className="text-azul-escuro"/>

            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-xl">Nova notificação!</h2>

                <p className="text-xl font-medium">
                    Você teve novas atualizações no chamado: <Link href="/" className="text-azul-escuro underline">#554</Link>.
                </p>
            </div>
        </div>
    )
}