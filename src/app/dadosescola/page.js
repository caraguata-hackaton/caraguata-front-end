"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { AsideNavbar } from "../components/AsideNavbar";
import { RiGraduationCapFill } from "react-icons/ri";
import { RiProjector2Fill } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";

const comodos = [
  "Salas de aula",
  "Banheiros",
  "Laboratório de Informática",
  "Biblioteca",
  "Sala de Recursos",
  "Depósito de Limpeza",
  "Ventiladores",
  "Ar-condicionados",
  "Bebedouros",
  "Geladeiras",
  "Extintores",
];

const equipamentos = [
  "Internet",
  "Computadores",
  "Notebooks",
  "Tablets",
  "Monitores",
  "Teclados",
  "Mouses",
  "Impressoras",
  "Projetores",
  "Telas interativas",
  "Caixas de Som",
  "Microfones",
  "Roteadores",
];

function BotaoSimNao() {
  const [selecionado, setSelecionado] = useState("");

  const classeBase =
    "w-[88px] h-7 rounded-md border border-azul-escuro flex items-center justify-center font-medium cursor-pointer transition-colors";

  return (
    <div className="flex justify-center gap-4">
      <button
        type="button"
        onClick={() => setSelecionado("sim")}
        className={`${classeBase} ${
          selecionado === "sim"
            ? "bg-azul-escuro text-white"
            : "bg-azul-bebe text-black"
        }`}
      >
        Sim
      </button>

      <button
        type="button"
        onClick={() => setSelecionado("nao")}
        className={`${classeBase} ${
          selecionado === "nao"
            ? "bg-azul-escuro text-white"
            : "bg-azul-bebe text-black"
        }`}
      >
        Não
      </button>
    </div>
  );
}

function LinhaItem({ nome }) {
  return (
    <div className="contents">
      <p className="font-medium text-lg">{nome}</p>

      <div className="flex justify-center">
        <BotaoSimNao />
      </div>

      <div className="flex justify-center">
        <input
          type="number"
          min={0}
          className="bg-azul-bebe outline-none rounded-md w-[140px] h-10 border text-center border-azul-escuro text-black"
        />
      </div>
    </div>
  );
}

function SecaoInfraestrutura({ titulo, Icone, itens, className = "" }) {
  return (
    <section className={className}>
      <div className="flex flex-row items-center">
        <Icone size={44} />

        <h2 className="font-bold text-3xl ml-2 mt-1">
          {titulo}
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-3 items-center gap-y-4">
        <h3 className="font-bold text-2xl">
          Item
        </h3>

        <h3 className="font-bold text-2xl text-center">
          Possui?
        </h3>

        <h3 className="font-bold text-2xl text-center">
          Quantidade
        </h3>

        {itens.map((item) => (
          <LinhaItem key={item} nome={item} />
        ))}
      </div>
    </section>
  );
}

export default function DadosEscola() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="flex flex-1">
          <AsideNavbar />

          <main className="py-16 w-[75%] mx-auto">
            <h1 className="font-bold text-4xl">
              Equipamentos e Infraestrutura
            </h1>

            <p className="font-normal text-lg mt-7">
              Informe abaixo os ambientes e equipamentos disponíveis na escola
            </p>

            <div className="bg-branco mt-5 w-full rounded-md border border-azul-escuro px-20 py-10">
              <SecaoInfraestrutura
                titulo="Cômodos"
                Icone={RiGraduationCapFill}
                itens={comodos}
              />

              <SecaoInfraestrutura
                titulo="Equipamentos"
                Icone={RiProjector2Fill}
                itens={equipamentos}
                className="mt-20"
              />
            </div>

            <div className="flex justify-between mt-8">
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
          </main>
        </div>
      </div>
    </>
  );
}