'use client';
import { AsideNavbar } from "../components/AsideNavbar";
import { Header } from "../components/Header";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6"; 
import Link from "next/link"; 
import { useState } from "react";
import { RegistrationConfirmation } from "../components/RegistrationConfirmation";


export default function Cadastro() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Header />

      <div className="flex flex-1 min-h-screen bg-background">
        <AsideNavbar />

        <div className="flex flex-col w-[75%] mx-auto py-10">
          <h1 className="text-4xl font-bold text-black mb-2">
            Cadastrar Usuário
          </h1>
          <p className="text-azul-escuro font-medium text-lg">
            Configure as credenciais e acessos do novo docente no sistema.
          </p>

          <div className="w-full bg-white mt-8 rounded-3xl flex flex-col p-8 shadow-sm border border-gray-100">
            
            <div className="flex items-center mb-6">
              <div className="bg-azul-bebezinho w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <BsPersonFill className="text-2xl text-azul-escuro" />
              </div>
              <p className="text-xl ms-4 font-bold text-black">
                Dados Pessoais
              </p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              <div className="flex flex-col">
                <label htmlFor="nome" className="text-sm font-bold text-azul-escuro mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome completo..."
                  className="border border-azul-escuro text-azul-escuro rounded-lg p-3 w-full focus:outline-none"
                />
              </div>

        
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-bold text-azul-escuro mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemplo@gmail.com"
                  className="border border-azul-escuro text-azul-escuro rounded-lg p-3 w-full focus:outline-none"
                />
              </div>

             
              <div className="flex flex-col">
                <label htmlFor="telefone" className="text-sm font-bold text-azul-escuro mb-1.5">
                  Telefone
                </label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  className="border border-azul-escuro text-azul-escuro rounded-lg p-3 w-full focus:outline-none"
                />
              </div>

              {/* Matrícula */}
              <div className="flex flex-col">
                <label htmlFor="matricula" className="text-sm font-bold text-azul-escuro mb-1.5">
                  Matrícula
                </label>
                <input
                  type="text"
                  id="matricula"
                  name="matricula"
                  placeholder="Digite a matrícula..."
                  className="border border-azul-escuro text-azul-escuro rounded-lg p-3 w-full focus:outline-none"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="escola" className="text-sm font-bold text-azul-escuro mb-1.5">
                  Escola Vinculada
                </label>
                <div className="relative w-full">
                  <select
                    id="escola"
                    name="escola"
                    className="appearance-none bg-white border border-azul-escuro rounded-lg p-3 pr-10 w-full text-azul-escuro focus:outline-none cursor-pointer"
                  >
                    <option value="option" disabled selected hidden>
                      Selecione a unidade escolar.
                    </option>
                    <option value="escola1">Escola  1</option>
                    <option value="escola2">Escola  2</option>
                  </select>
                  <MdOutlineKeyboardArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none text-xl" />
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-between items-center mt-10 w-full px-2">
            <Link
              href="/"
              className="text-azul-escuro font-bold tracking-wider text-xl uppercase  hover:opacity-80 transition-opacity"
            >
              Cancelar
            </Link>
            
            <button onClick={() => setModalAberto(true)} className="bg-azul-escuro text-white font-bold rounded-lg py-4 px-8 flex items-center justify-center text-lg hover:opacity-90 transition-opacity">
              CADASTRAR USUÁRIO <FaArrowRight className="ml-3 text-lg" />
            </button>
            <RegistrationConfirmation isOpen={modalAberto} />
          </div>

        </div>
      </div>
    </>
  );
}