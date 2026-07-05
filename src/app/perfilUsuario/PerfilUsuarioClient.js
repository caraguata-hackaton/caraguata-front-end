"use client"

import {BiPencil} from "react-icons/bi";
import {Header} from "../components/Header";
import {AsideNavbar} from "../components/AsideNavbar";

export function PerfilUsuarioClient() {
    return (
        <>
            <Header />

            <div className="flex flex-1 min-h-screen bg-background">
                <AsideNavbar>

                </AsideNavbar>

                <div className="flex flex-col w-[75%] mx-auto py-10">
                    <h1 className="text-4xl font-bold mt-10 text-azul-escuro mb-2">
                        Perfil do Usuário
                    </h1>
                    <p className="text-azul-escuro font-medium text-lg">
                        Visualize e edite suas informações pessoais.
                    </p>

                    <form className="w-full bg-white mt-8 rounded-3xl flex flex-col p-8 shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="nome"
                                    className="text-sm font-bold text-azul-escuro mb-1.5"
                                >
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    defaultValue="Maria Souza"
                                    className="border border-gray-200 text-gray-700 rounded-lg p-3 w-full focus:outline-none focus:border-azul-escuro"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-bold text-azul-escuro mb-1.5"
                                >
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue="mariasouza@seduc.sp.gov.br"
                                    className="border border-gray-200 text-gray-700 rounded-lg p-3 w-full focus:outline-none focus:border-azul-escuro"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="telefone"
                                    className="text-sm font-bold text-azul-escuro mb-1.5"
                                >
                                    Telefone
                                </label>
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    defaultValue="(11) 98765-4321"
                                    className="border border-gray-200 text-gray-700 rounded-lg p-3 w-full focus:outline-none focus:border-azul-escuro"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="matricula"
                                    className="text-sm font-bold text-azul-escuro mb-1.5"
                                >
                                    Matrícula
                                </label>
                                <input
                                    type="text"
                                    id="matricula"
                                    name="matricula"
                                    defaultValue="876543"
                                    className="border border-gray-200 text-gray-700 rounded-lg p-3 w-full focus:outline-none focus:border-azul-escuro"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mt-6 w-full">
                            <label
                                htmlFor="escola"
                                className="text-sm font-bold text-azul-escuro mb-1.5"
                            >
                                Escola Vinculada
                            </label>
                            <input
                                type="text"
                                id="escola"
                                name="escola"
                                defaultValue="Ciefi Profª Antônia Ribeiro Da Silva"
                                disabled
                                className="border border-gray-100 bg-gray-50 text-gray-400 rounded-lg p-3 w-full cursor-not-allowed focus:outline-none"
                            />
                        </div>

                        <div className="flex justify-end items-center mt-8">
                            <button
                                type="reset"
                                className="text-azul-escuro font-bold tracking-wider text-base uppercase me-10 hover:opacity-80 transition-opacity"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-azul-escuro text-white font-medium py-2.5 px-6 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
                            >
                                <BiPencil className="text-lg" />
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}