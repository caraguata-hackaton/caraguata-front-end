import { FaRegSquareCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export function RegistrationConfirmation({ isOpen }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-4xl p-10 w-full max-w-2xl flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-200">
        <FaRegSquareCheck className="text-azul-escuro mb-4 w-20 h-20" />

        <h2 className="text-2xl font-extrabold text-azul-escuro mb-4">
          Cadastro realizado com sucesso!
        </h2>

        <p className="text-black font-medium text-base leading-relaxed px-2 mb-8 max-w-md">
          Seu cadastro foi realizado com sucesso! Agora você pode acessar o
          sistema utilizando suas credenciais.
        </p>

        <button
          onClick={() => router.push("/homeEscola")}
          className="bg-azul-escuro text-white font-bold cursor-pointer  tracking-wider rounded-lg py-4 px-8 w-full max-w-sm hover:bg-opacity-90 transition-opacity uppercase text-sm"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}
