"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <h1 className="text-8xl font-bold text-azul-escuro">404</h1>
      <p className="text-3xl mt-4 text-black font-bold">
        Página não encontrada
      </p>
      <p className="text-black text-2xl mt-6">
        A página que você tentou acessar não existe ou foi movida
      </p>
      <button
        type="button"
        onClick={() => router.back()}
        className="bg-azul-escuro text-white font-medium py-2.5 px-6 rounded-md flex items-center gap-2 mt-10 hover:opacity-90 transition-opacity shadow-sm"
      >
        <IoIosArrowBack className="text-white text-lg" />
        VOLTAR PARA A PÁGINA ANTERIOR
      </button>
    </div>
  );
}