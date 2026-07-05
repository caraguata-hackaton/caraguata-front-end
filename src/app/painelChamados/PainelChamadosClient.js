"use client"

import {useEffect, useMemo, useState} from "react"
import dynamic from "next/dynamic"
import { MdOutlineFilterAltOff} from "react-icons/md"
import {IoChevronBack, IoChevronForward} from "react-icons/io5"
import {AsideNavbar} from "../components/AsideNavbar"
import {Header} from "../components/Header"
import {getTickets} from "@/services/ticketService"
import {AsideButton} from "@/app/components/AsideButton";
import {LuTicketMinus} from "react-icons/lu";
import {RiGraduationCapLine} from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";

const MapaDinamico = dynamic(() => import("./MapaChamados"), {ssr: false})

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

function getTicketLatitude(ticket) {
    const dynamicFields = ticket.dynamicFields || {}

    return (
        ticket.school?.latitude ??
        ticket.school?.lat ??
        dynamicFields.latitude ??
        dynamicFields.lat ??
        null
    )
}

function getTicketLongitude(ticket) {
    const dynamicFields = ticket.dynamicFields || {}

    return (
        ticket.school?.longitude ??
        ticket.school?.lng ??
        dynamicFields.longitude ??
        dynamicFields.lng ??
        null
    )
}

function mapTicketToView(ticket) {
    return {
        id: formatTicketId(ticket.id),
        rawId: ticket.id,
        escola: ticket.school?.name || "Escola não informada",
        titulo: ticket.title,
        schoolId: ticket.school?.id || ticket.schoolId,
        local: getTicketLocal(ticket),
        prioridade: priorityLabel[ticket.priority] || "Média",
        priority: ticket.priority,
        status: statusLabel[ticket.status] || "Aberto",
        rawStatus: ticket.status,
        lat: getTicketLatitude(ticket),
        lng: getTicketLongitude(ticket),
        categoria: ticket.category?.name || "Sem categoria",
        abertoEm: formatDateTime(ticket.createdAt),
    }
}

async function getCount(params) {
    const data = await getTickets({
        ...params,
        page: 1,
        limit: 1,
    })

    return getTotalFromResponse(data)
}

export function PainelChamadosClient({user}) {
    const [chamados, setChamados] = useState([])
    const [schoolOptions, setSchoolOptions] = useState([])

    const [filtroPrioridade, setFiltroPrioridade] = useState("Todas")
    const [filtroStatus, setFiltroStatus] = useState("Todos")
    const [filtroEscola, setFiltroEscola] = useState("Todas")
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [totalChamados, setTotalChamados] = useState(0)
    const [coordenadaFoco, setCoordenadaFoco] = useState(null)

    const [stats, setStats] = useState({
        urgentes: 0,
        abertos: 0,
        andamento: 0,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const totalPaginas = Math.ceil(totalChamados / itensPorPagina)

    const queryParams = useMemo(() => {
        return {
            page: paginaAtual,
            limit: itensPorPagina,
            schoolId: filtroEscola === "Todas" ? undefined : filtroEscola,
            priority: filtroPrioridade === "Todas" ? undefined : filtroPrioridade,
            status: filtroStatus === "Todos" ? undefined : filtroStatus,
        }
    }, [paginaAtual, filtroEscola, filtroPrioridade, filtroStatus])

    useEffect(() => {
        async function loadTickets() {
            try {
                setLoading(true)
                setError("")

                const data = await getTickets(queryParams)
                const tickets = getTicketsFromResponse(data)

                setChamados(tickets.map(mapTicketToView))
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
        async function loadSchoolOptions() {
            try {
                const data = await getTickets({
                    page: 1,
                    limit: 100,
                })

                const tickets = getTicketsFromResponse(data)

                const schoolsMap = new Map()

                tickets.forEach((ticket) => {
                    const schoolId = ticket.school?.id || ticket.schoolId

                    if (!schoolId) return

                    schoolsMap.set(schoolId, {
                        id: schoolId,
                        name: ticket.school?.name || "Escola não informada",
                        lat: ticket.school?.latitude ?? ticket.school?.lat ?? null,
                        lng: ticket.school?.longitude ?? ticket.school?.lng ?? null,
                    })
                })

                setSchoolOptions(Array.from(schoolsMap.values()))
            } catch {
                setSchoolOptions([])
            }
        }

        loadSchoolOptions()
    }, [])

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

    function handleSelecionarEscola(schoolId) {
        setFiltroEscola(schoolId)
        setPaginaAtual(1)

        if (schoolId === "Todas") {
            setCoordenadaFoco(null)
            return
        }

        const school = schoolOptions.find((item) => String(item.id) === String(schoolId))

        if (school?.lat && school?.lng) {
            setCoordenadaFoco([school.lat, school.lng])
        } else {
            setCoordenadaFoco(null)
        }
    }

    function handleChangePrioridade(value) {
        setFiltroPrioridade(value)
        setPaginaAtual(1)
    }

    function handleChangeStatus(value) {
        setFiltroStatus(value)
        setPaginaAtual(1)
    }

    function limparFiltros() {
        setFiltroEscola("Todas")
        setFiltroPrioridade("Todas")
        setFiltroStatus("Todos")
        setPaginaAtual(1)
        setCoordenadaFoco(null)
    }

    const startIndex = totalChamados === 0 ? 0 : (paginaAtual - 1) * itensPorPagina + 1
    const endIndex = Math.min(paginaAtual * itensPorPagina, totalChamados)

    return (
        <>
            <Header/>

            <div className="min-h-screen flex">
                <AsideNavbar>
                    <AsideButton icon={ <LuTicketMinus size={20}/> } text="Chamados" destination="/painelChamados" active={true}/>
                    <AsideButton icon={ <RiGraduationCapLine size={20}/> } text="Escolas" destination="/dadosUnidades"/>
                    <AsideButton icon={ <IoPersonOutline size={20}/> } text="Gestão de Usuários" destination="/gestaoUsuarios"/>
                </AsideNavbar>

                <main className="w-[75%] mx-auto flex flex-col gap-6 mt-10">
                    <header>
                        <h2 className="text-2xl font-bold text-black">
                            Visão Geral de Chamados
                        </h2>

                        <p className="text-gray-500">
                            Monitore solicitações de todas as unidades escolares.
                        </p>

                        <p className="mt-2 text-sm font-medium text-azul-escuro">
                            Gestor: {user.name}
                        </p>
                    </header>

                    <section className="grid grid-cols-3 gap-4">
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

                    <section className="w-full p-4 bg-white rounded-lg shadow-sm border border-neutral-200 flex items-end gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-medium text-black">
                                Filtrar por Escola
                            </label>

                            <select
                                value={filtroEscola}
                                className="w-full mt-1 p-2.5 bg-gray-100 rounded-sm border border-neutral-200 focus:outline-none"
                                onChange={(event) => handleSelecionarEscola(event.target.value)}
                            >
                                <option value="Todas">Todas as Escolas</option>

                                {schoolOptions.map((school) => (
                                    <option key={school.id} value={school.id}>
                                        {school.name}
                                    </option>
                                ))}
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
                        <div className="rounded-lg border border-red-300 bg-red-50 p-4 font-medium text-red-700">
                            {error}
                        </div>
                    )}

                    <section className="w-full p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                        <div
                            className="hidden md:flex bg-gray-100 border-b border-neutral-200 px-4 py-3 font-semibold text-xs uppercase text-black gap-4">
                            <div className="w-32">ID / Chamado</div>
                            <div className="flex-1">Escola</div>
                            <div className="w-28">Local</div>
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

                            {!loading && chamados.length === 0 && (
                                <div className="px-4 py-10 text-center text-gray-500 font-medium">
                                    Nenhum chamado encontrado.
                                </div>
                            )}

                            {!loading &&
                                chamados.map((item) => (
                                    <div
                                        key={item.rawId}
                                        className="flex flex-col md:flex-row border-b border-neutral-200 px-4 py-4 gap-2 hover:bg-gray-50 items-center md:items-center justify-center"
                                    >
                                        <div className="w-full md:w-32">
                                            <div className="text-cyan-900 text-xs font-bold">
                                                {item.id}
                                            </div>

                                            <div className="text-sm font-semibold">
                                                {item.titulo}
                                            </div>
                                        </div>

                                        <div className="w-180 text-sm text-gray-700">
                                            {item.escola}
                                        </div>

                                        <div className="w-50 text-sm font-medium">
                                            {item.local}
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
                                                {item.prioridade}
                                            </div>
                                        </div>

                                        <div className="w-30">
                                            <div
                                                className={`px-2 py-1 rounded text-center text-xs font-bold uppercase ${
                                                    statusColors[item.rawStatus] || "bg-gray-200"
                                                }`}
                                            >
                                                {item.status}
                                            </div>
                                        </div>

                                        <div className="w-32 text-sm">{item.abertoEm}</div>
                                    </div>
                                ))}
                        </div>
                    </section>

                    <div className="px-8 py-5 bg-input-bg border-t border-azul-escuro border-opacity-20 flex justify-between items-center">
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
                                        className={`w-8 h-8 rounded-lg text-sm font-bold flex justify-center items-center transition ${
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
                                className={`p-2 rounded-lg transition ${
                                    paginaAtual === totalPaginas || totalPaginas === 0
                                        ? "text-azul-escuro opacity-50 cursor-not-allowed"
                                        : "text-black hover:bg-azul-claro"
                                }`}
                            >
                                <IoChevronForward size={18}/>
                            </button>
                        </div>
                    </div>

                    <section className="w-full h-125 p-4">
                        <MapaDinamico
                            key={coordenadaFoco ? coordenadaFoco.join("-") : "default"}
                            chamados={chamados.filter((chamado) => chamado.lat && chamado.lng)}
                            localizacaoAtiva={coordenadaFoco}
                        />
                    </section>
                </main>
            </div>
        </>
    )
}