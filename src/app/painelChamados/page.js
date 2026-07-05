"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { AsideNavbar } from "../components/AsideNavbar";
import { Header } from "../components/Header";

const MapaDinamico = dynamic(() => import("./MapaChamados"), { ssr: false });

export default function PainelChamados() {
  const [chamados, setChamados] = useState([
    {
      id: "#CH-2026-001",
      escola: "EMEF Profª Débora Valle da Silva Pilon",
      local: "Laboratório de Informática",
      prioridade: "Alta",
      status: "Aberto",
      lat: -23.635,
      lng: -45.438,
      categoria: "Elétrica",
    },
    {
      id: "#CH-2026-002",
      escola: "EMEF Dr. Carlos de Almeida Rodrigues",
      local: "Quadra Poliesportiva",
      prioridade: "Média",
      status: "Concluído",
      lat: -23.6185,
      lng: -45.4125,
      categoria: "Manutenção",
    },
    {
      id: "#CH-2026-003",
      escola: "EMEF EMEF Profº Luiz Ribeiro Muniz",
      local: "Biblioteca",
      prioridade: "Baixa",
      status: "Aberto",
      lat: -23.642,
      lng: -45.455,
      categoria: "Prateleira quebrada",
    },
    {
      id: "#CH-2026-004",
      escola: "EMEF Profª Maria Aparecida Ujvari",
      local: "Refeitório",
      prioridade: "Alta",
      status: "Em Andamento",
      lat: -23.605,
      lng: -45.405,
      categoria: "Hidráulica",
    },
    {
      id: "#CH-2026-005",
      escola: "EMEF Profº Euclydes Ferreira",
      local: "Secretaria",
      prioridade: "Média",
      status: "A caminho",
      lat: -23.628,
      lng: -45.421,
      categoria: "TI/Rede",
    },
    { 
    id: "#CH-2026-006",
      escola: "EMEF Profª Débora Valle da Silva Pilon",
      local: "Laboratório de Informática",
      prioridade: "Alta",
      status: "Aberto",
      lat: -23.635,
      lng: -45.438,
      categoria: "Elétrica",
    },
        {
      id: "#CH-2026-007",
      escola: "EMEF Profº Euclydes Ferreira",
      local: "Secretaria",
      prioridade: "Média",
      status: "A caminho",
      lat: -23.628,
      lng: -45.421,
      categoria: "TI/Rede",
    },
        {
      id: "#CH-2026-009",
      escola: "EMEF EMEF Profº Luiz Ribeiro Muniz",
      local: "Biblioteca",
      prioridade: "Baixa",
      status: "Aberto",
      lat: -23.642,
      lng: -45.455,
      categoria: "Prateleira quebrada",
    },
  ]);

  const [filtroPrioridade, setFiltroPrioridade] = useState("Todas");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroEscola, setFiltroEscola] = useState("Todas");
  const [coordenadaFoco, setCoordenadaFoco] = useState(null);
  
  const itensPorPagina = 5;

  const chamadosFiltrados = useMemo(() => {
    return chamados.filter((c) => {
      const atendeEscola = filtroEscola === "Todas" || c.escola === filtroEscola;
      const atendePrioridade = filtroPrioridade === "Todas" || c.prioridade === filtroPrioridade;
      const atendeStatus = filtroStatus === "Todos" || c.status === filtroStatus;
      return atendeEscola && atendePrioridade && atendeStatus;
    });
  }, [chamados, filtroEscola, filtroPrioridade, filtroStatus]);

  const totalPaginas = Math.ceil(chamadosFiltrados.length / itensPorPagina);
  const startIndex = (paginaAtual - 1) * itensPorPagina;
  const usuariosPaginados = chamadosFiltrados.slice(startIndex, startIndex + itensPorPagina);

  const stats = useMemo(
    () => ({
      urgentes: chamados.filter((c) => c.prioridade === "Alta").length,
      abertos: chamados.filter((c) => c.status === "Aberto").length,
      andamento: chamados.filter((c) => c.status === "Em Andamento").length,
    }),
    [chamados],
  );

  const statusColors = {
    "Aberto": "bg-cinza-claro text-cinza-escuro",
    "Em Andamento": "bg-yellow-200 text-yellow-800",
    "A caminho": "bg-azul-bebezinho text-azul-escuro",
    "Concluído": "bg-verde-claro text-verde-escuro"
  };

  const handleSelecionarEscola = (escola) => {
    const item = chamados.find((c) => c.escola === escola);
    if (item) {
      setCoordenadaFoco([item.lat, item.lng]);
    }
  };

  const separador = ","; 
  const linhas = chamadosFiltrados.map((u) =>
     [u.categoria, u.id, u.escola, u.status].map((campo) => `"${campo}"`).join(separador)
  );

  return (
    <>
    <Header />
    <div className="min-h-screen flex">

                <AsideNavbar />

      <main className="w-[75%] mx-auto flex flex-col gap-6 mt-10">

        <header>
          <h2 className="text-2xl font-bold text-black">Visão Geral de Chamados</h2>
          <p className="text-gray-500">Monitore solicitações de todas as unidades escolares.</p>
        </header>

        <section className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white border rounded-lg border-azul-escuro">
            <span className="text-xs font-bold text-red-800 uppercase">Urgentes</span>
            <p className="text-2xl font-bold">{stats.urgentes}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg border-azul-escuro">
            <span className="text-xs font-bold text-cyan-900 uppercase">Em aberto</span>
            <p className="text-2xl font-bold">{stats.abertos}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg border-azul-escuro">
            <span className="text-xs font-bold text-gray-700 uppercase">Em andamento</span>
            <p className="text-2xl font-bold">{stats.andamento}</p>
          </div>
        </section>

        <section className="w-full p-4 bg-white rounded-lg shadow-sm border border-neutral-200 flex items-end gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-black">Filtrar por Escola</label>
            <select
              className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 focus:outline-none"
              onChange={(e) => {
                handleSelecionarEscola(e.target.value);
                setFiltroEscola(e.target.value);
              }}
            >
              <option value="Todas">Todas as Escolas</option>
              {chamados.map((c) => (
                <option key={c.id} value={c.escola}>{c.escola}</option>
              ))}
            </select>
          </div>

          <div className="w-40">
            <label className="text-xs font-medium">Gravidade</label>
            <select
              value={filtroPrioridade}
              onChange={(e) => setFiltroPrioridade(e.target.value)}
              className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 text-xs"
            >
              <option value="Todas">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <div className="w-40 text-xs">
            <label className="text-xs font-medium">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 text-xs"
            >
              <option value={"Todos"}>Todos</option>
              <option value={"Aberto"}>Aberto</option>
              <option value={"Em Andamento"}>Em andamento</option>
              <option value={"A caminho"}>A caminho</option>
              <option value={"Concluído"}>Concluído</option>
            </select>
          </div>

          <button
            onClick={() => setCoordenadaFoco(null)}
            className="p-3 text-azul-escuro hover:bg-gray-100 rounded"
          >
            <MdOutlineFilterAltOff size={24} />
          </button>
        </section>

        <section className="w-full p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
          <div className="hidden md:flex bg-gray-100 border-b border-neutral-200 px-4 py-3 font-semibold text-xs uppercase text-black gap-4">
            <div className="w-32">ID / Chamado</div>
            <div className="flex-1">Escola</div>
            <div className="w-28">Local</div>
            <div className="w-28 text-center">Prioridade</div>
            <div className="w-28 text-center">Status</div>
            <div className="w-32">Aberto em</div>
          </div>

          <div className="flex flex-col">
            {usuariosPaginados.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row border-b border-neutral-200 px-4 py-4 gap-2 hover:bg-gray-50 items-center md:items-center justify-center">
                <div className="w-full md:w-32">
                  <div className="text-cyan-900 text-xs font-bold">{item.id}</div>
                  <div className="text-sm font-semibold">{item.categoria}</div>
                </div>
                <div className="w-70 text-sm text-gray-700">{item.escola}</div>
                <div className="w-50 text-sm font-medium ">{item.local}</div>
                <div className="w-28">
                  <div className={`px-2 py-1 rounded text-center text-xs font-bold uppercase ${item.prioridade === "Alta" ? "bg-rose-200 text-vermelho" : item.prioridade === "Média" ? "bg-orange-200 text-orange-800" : "bg-teal-200 text-teal-900"}`}>
                    {item.prioridade}
                  </div>
                </div>
                <div className="w-30">
                  <div className={`px-2 py-1 rounded text-center text-xs font-bold uppercase ${statusColors[item.status] || "bg-gray-200"}`}>
                    {item.status}
                  </div>
                </div>
                <div className="w-32 text-sm">11/05/2024 - 15:30</div>
              </div>
            ))}
          </div>
        </section>

                <div className="px-8 py-5 bg-input-bg border-t border-azul-escuro border-opacity-20 flex justify-between items-center">
          <span className="text-azul-escuro text-sm font-medium">
            Mostrando {chamadosFiltrados.length === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + itensPorPagina, chamadosFiltrados.length)} de{' '}
            {chamadosFiltrados.length} chamados
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className={`p-2 rounded-lg transition ${paginaAtual === 1 ? 'text-azul-escuro opacity-50 cursor-not-allowed' : 'text-black hover:bg-verde-pastel'}`}
            >
              <IoChevronBack size={18} />
            </button>

            {Array.from({ length: totalPaginas || 1 }, (_, i) => i + 1).map((pagina) => (
              <button
                key={pagina}
                onClick={() => setPaginaAtual(pagina)}
                className={`w-8 h-8 rounded-lg text-sm font-bold flex justify-center items-center transition ${paginaAtual === pagina ? 'bg-azul-escuro text-white' : 'text-black hover:bg-verde-pastel'}`}
              >
                {pagina}
              </button>
            ))}

            <button
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              className={`p-2 rounded-lg transition ${paginaAtual === totalPaginas || totalPaginas === 0 ? 'text-azul-escuro opacity-50 cursor-not-allowed' : 'text-black hover:bg-azul-claro'}`}
            >
              <IoChevronForward size={18} />
            </button>
          </div>
        </div>

        <section className="w-full h-125 p-4">
          <MapaDinamico
            key={coordenadaFoco ? coordenadaFoco.join("-") : "default"}
            chamados={chamadosFiltrados}
            localizacaoAtiva={coordenadaFoco}
          />
        </section>


      </main>
    </div>
    </>
  );
}