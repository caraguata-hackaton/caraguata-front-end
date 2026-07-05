"use client"

import {useEffect, useMemo, useState} from "react"
import {FiPlus} from "react-icons/fi"
import Link from "next/link"
import {Header} from "../components/Header"
import {AsideButton} from "../components/AsideButton"
import {MdGridView, MdOutlineFilterAltOff} from "react-icons/md"
import {LuTicketMinus} from "react-icons/lu"
import {RiGraduationCapLine} from "react-icons/ri"
import {AiOutlineQuestionCircle} from "react-icons/ai"
import {AsideNavbar} from "../components/AsideNavbar"
import {IoChevronBack, IoChevronForward} from "react-icons/io5"
import {getTickets} from "@/services/ticketService"

const itensPorPagina = 5

const priorityLabel = {
    LOW: "Baixa",
    MEDIUM: "Média",
    HIGH: "Alta",
    URGENT: "Urgente",
}

const statusLabel = {
    OPEN: "Aberto",
    IN_PROGRESS: "Em Andamento",
    COMPLETED: "Concluído",
    CANCELED: "Cancelado",
}

const statusColors = {
    OPEN: "bg-cinza-claro text-cinza-escuro",
    IN_PROGRESS: "bg-yellow-200 text-yellow-800",
    COMPLETED: "bg-verde-claro text-verde-escuro",
    CANCELED: "bg-gray-200 text-gray-700",
}

function getTicketsFromResponse(data) {
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.tickets)) return data.tickets
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data?.result)) return data.result

    return []
}

function getTotalFromResponse(data) {
    return (
        data?.pagination?.total ??
        data?.pagination?.totalItems ??
        data?.total ??
        getTicketsFromResponse(data).length
    )
}

function formatTicketId(id) {
    return `#CH-${String(id).padStart(4, "0")}`
}

function formatDateTime(date) {
    if (!date) return "-"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "-"
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
        .format(parsedDate)
        .replace(",", " -")
}

function getTicketLocal(ticket) {
    const dynamicFields = ticket.dynamicFields || {}

    return (
        dynamicFields.localAfetado ||
        dynamicFields.local ||
        dynamicFields.localOcorrencia ||
        dynamicFields.localDaOcorrencia ||
        dynamicFields.localizacaoExata ||
        dynamicFields.localizacao ||
        "-"
    )
}

async function getCount(params) {
    const data = await getTickets({
        ...params,
        page: 1,
        limit: 1,
    })

    return getTotalFromResponse(data)
}

export function ChamadosEscolaClient({user, school}) {
    const [chamados, setChamados] = useState([])
    const [filtroPrioridade, setFiltroPrioridade] = useState("Todas")
    const [filtroStatus, setFiltroStatus] = useState("Todos")
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [totalChamados, setTotalChamados] = useState(0)

    const [stats, setStats] = useState({
        urgentes: 0,
        abertos: 0,
        andamento: 0,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const totalPaginas = Math.ceil(totalChamados / itensPorPagina)

    const usuariosPaginados = chamados

    const queryParams = useMemo(() => {
        return {
            page: paginaAtual,
            limit: itensPorPagina,
            priority: filtroPrioridade === "Todas" ? undefined : filtroPrioridade,
            status: filtroStatus === "Todos" ? undefined : filtroStatus,
        }
    }, [paginaAtual, filtroPrioridade, filtroStatus])

    useEffect(() => {
        async function loadTickets() {
            try {
                setLoading(true)
                setError("")

                const data = await getTickets(queryParams)

                setChamados(getTicketsFromResponse(data))
                setTotalChamados(getTotalFromResponse(data))
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadTickets()
    }, [queryParams])

    useEffect(() => {
        async function loadStats() {
            try {
                const [highCount, urgentCount, openCount, inProgressCount] =
                    await Promise.all([
                        getCount({priority: "HIGH"}),
                        getCount({priority: "URGENT"}),
                        getCount({status: "OPEN"}),
                        getCount({status: "IN_PROGRESS"}),
                    ])

                setStats({
                    urgentes: highCount + urgentCount,
                    abertos: openCount,
                    andamento: inProgressCount,
                })
            } catch {
                setStats({
                    urgentes: 0,
                    abertos: 0,
                    andamento: 0,
                })
            }
        }

        loadStats()
    }, [])

    function handleChangePrioridade(value) {
        setFiltroPrioridade(value)
        setPaginaAtual(1)
    }

    function handleChangeStatus(value) {
        setFiltroStatus(value)
        setPaginaAtual(1)
    }

    function limparFiltros() {
        setFiltroPrioridade("Todas")
        setFiltroStatus("Todos")
        setPaginaAtual(1)
    }

    const startIndex = totalChamados === 0 ? 0 : (paginaAtual - 1) * itensPorPagina + 1
    const endIndex = Math.min(paginaAtual * itensPorPagina, totalChamados)

    return (
        <>
            <Header/>

            <section className="flex flex-1 min-h-0">
                <AsideNavbar>
                    <AsideButton
                        icon={<MdGridView size={20}/>}
                        text="Visão Geral"
                        destination="/homeEscola"
                    />

                    <AsideButton
                        icon={<LuTicketMinus size={20}/>}
                        text="Meus Chamados"
                        destination="/chamadosEscola"
                        active={true}
                    />

                    <AsideButton
                        icon={<RiGraduationCapLine size={20}/>}
                        text="Dados da Unidade"
                        destination="/gestao"
                    />

                    <AsideButton
                        icon={<AiOutlineQuestionCircle size={20}/>}
                        text="Suporte"
                        destination="/suporte"
                    />
                </AsideNavbar>

                <main className="px-28 py-14 w-[75%] mx-auto">
                    <header className="flex justify-between">
                        <div>
                            <h1 className="font-semibold text-4xl">Meus chamados</h1>

                            <p>Acompanhe as solicitações abertas pela sua escola</p>
                        </div>

                        <Link
                            href="/novoChamado"
                            className="flex items-center gap-3 bg-azul-escuro px-10 py-4 rounded-lg hover:bg-azul-claro transition"
                        >
                            <FiPlus size={30} className="text-white"/>

                            <p className="font-bold text-white text-lg">Novo chamado</p>
                        </Link>
                    </header>

                    <section className="grid grid-cols-3 gap-4 mt-10">
                        <div className="p-4 bg-white border rounded-lg border-azul-escuro">
              <span className="text-xs font-bold text-red-800 uppercase">
                Urgentes
              </span>

                            <p className="text-2xl font-bold">{stats.urgentes}</p>
                        </div>

                        <div className="p-4 bg-white border rounded-lg border-azul-escuro">
              <span className="text-xs font-bold text-cyan-900 uppercase">
                Em aberto
              </span>

                            <p className="text-2xl font-bold">{stats.abertos}</p>
                        </div>

                        <div className="p-4 bg-white border rounded-lg border-azul-escuro">
              <span className="text-xs font-bold text-gray-700 uppercase">
                Em andamento
              </span>

                            <p className="text-2xl font-bold">{stats.andamento}</p>
                        </div>
                    </section>

                    <section
                        className="w-full p-4 bg-white rounded-lg shadow-sm border border-neutral-200 flex items-end gap-4 mt-10">
                        <div className="flex-1">
                            <label className="text-xs font-medium text-black">
                                Escola
                            </label>

                            <select
                                value={school?.name || "Minha escola"}
                                disabled
                                className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 focus:outline-none disabled:opacity-80"
                            >
                                <option value={school?.name || "Minha escola"}>
                                    {school?.name || "Minha escola"}
                                </option>
                            </select>
                        </div>

                        <div className="w-40">
                            <label className="text-xs font-medium">Gravidade</label>

                            <select
                                value={filtroPrioridade}
                                onChange={(event) => handleChangePrioridade(event.target.value)}
                                className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 text-xs"
                            >
                                <option value="Todas">Todas</option>
                                <option value="URGENT">Urgente</option>
                                <option value="HIGH">Alta</option>
                                <option value="MEDIUM">Média</option>
                                <option value="LOW">Baixa</option>
                            </select>
                        </div>

                        <div className="w-40 text-xs">
                            <label className="text-xs font-medium">Status</label>

                            <select
                                value={filtroStatus}
                                onChange={(event) => handleChangeStatus(event.target.value)}
                                className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 text-xs"
                            >
                                <option value="Todos">Todos</option>
                                <option value="OPEN">Aberto</option>
                                <option value="IN_PROGRESS">Em andamento</option>
                                <option value="COMPLETED">Concluído</option>
                                <option value="CANCELED">Cancelado</option>
                            </select>
                        </div>

                        <button
                            onClick={limparFiltros}
                            className="p-3 text-azul-escuro hover:bg-gray-100 rounded"
                            title="Limpar filtros"
                        >
                            <MdOutlineFilterAltOff size={24}/>
                        </button>
                    </section>

                    {error && (
                        <div className="mt-8 rounded-lg border border-red-300 bg-red-50 p-4 font-medium text-red-700">
                            {error}
                        </div>
                    )}

                    <section className="w-full p-4 bg-white rounded-lg border border-neutral-200 shadow-sm mt-11">
                        <div
                            className="hidden md:flex bg-gray-100 border-b border-neutral-200 px-4 py-3 font-semibold text-xs uppercase text-black gap-4">
                            <div className="w-40">ID / Chamado</div>
                            <div className="flex-1">Escola</div>
                            <div className="w-50">Local</div>
                            <div className="w-28 text-center">Prioridade</div>
                            <div className="w-28 text-center">Status</div>
                            <div className="w-32">Aberto em</div>
                        </div>

                        <div className="flex flex-col">
                            {loading && (
                                <div className="px-4 py-10 text-center text-gray-500 font-medium">
                                    Carregando chamados...
                                </div>
                            )}

                            {!loading && usuariosPaginados.length === 0 && (
                                <div className="px-4 py-10 text-center text-gray-500 font-medium">
                                    Nenhum chamado encontrado.
                                </div>
                            )}

                            {!loading &&
                                usuariosPaginados.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row border-b border-neutral-200 px-4 py-4 gap-2 hover:bg-gray-50 items-center md:items-center justify-between"
                                    >
                                        <div className="w-32">
                                            <div className="text-cyan-900 text-xs font-bold">
                                                {formatTicketId(item.id)}
                                            </div>

                                            <div className="text-sm font-semibold">
                                                {item.title || "Sem categoria"}
                                            </div>
                                        </div>

                                        <div className="w-80 text-sm text-gray-700">
                                            {item.school?.name || school?.name || "-"}
                                        </div>

                                        <div className="w-50 text-sm text-center">
                                            {getTicketLocal(item)}
                                        </div>

                                        <div className="w-28">
                                            <div
                                                className={`px-2 py-1 rounded text-center text-xs font-bold uppercase ${
                                                    item.priority === "HIGH" || item.priority === "URGENT"
                                                        ? "bg-rose-200 text-vermelho"
                                                        : item.priority === "MEDIUM"
                                                            ? "bg-orange-200 text-orange-800"
                                                            : "bg-teal-200 text-teal-900"
                                                }`}
                                            >
                                                {priorityLabel[item.priority] || "Média"}
                                            </div>
                                        </div>

                                        <div className="w-30">
                                            <div
                                                className={`px-2 py-1 rounded text-center text-xs font-bold uppercase ${
                                                    statusColors[item.status] || "bg-gray-200"
                                                }`}
                                            >
                                                {statusLabel[item.status] || "Aberto"}
                                            </div>
                                        </div>

                                        <div className="w-32 text-sm">
                                            {formatDateTime(item.createdAt)}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>

                    <div
                        className="px-8 py-5 bg-input-bg border-t border-azul-escuro border-opacity-20 flex justify-between items-center">
            <span className="text-azul-escuro text-sm font-medium">
              Mostrando {startIndex}-{endIndex} de {totalChamados} chamados
            </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                                disabled={paginaAtual === 1}
                                className={`p-2 rounded-lg transition ${
                                    paginaAtual === 1
                                        ? "text-azul-escuro opacity-50 cursor-not-allowed"
                                        : "text-black hover:bg-verde-pastel"
                                }`}
                            >
                                <IoChevronBack size={18}/>
                            </button>

                            {Array.from({length: totalPaginas || 1}, (_, i) => i + 1).map(
                                (pagina) => (
                                    <button
                                        key={pagina}
                                        onClick={() => setPaginaAtual(pagina)}
                                        className={`w-8 h-8 cursor-pointer rounded-lg text-sm font-bold flex justify-center items-center transition ${
                                            paginaAtual === pagina
                                                ? "bg-azul-escuro text-white"
                                                : "text-black hover:bg-verde-pastel"
                                        }`}
                                    >
                                        {pagina}
                                    </button>
                                ),
                            )}

                            <button
                                onClick={() =>
                                    setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
                                }
                                disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                                className={`p-2 cursor-pointer rounded-lg transition ${
                                    paginaAtual === totalPaginas || totalPaginas === 0
                                        ? "text-azul-escuro opacity-50 cursor-not-allowed"
                                        : "text-black hover:bg-azul-claro"
                                }`}
                            >
                                <IoChevronForward size={18}/>
                            </button>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}