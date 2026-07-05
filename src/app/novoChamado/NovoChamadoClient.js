"use client"

import {Header} from "@/app/components/Header";
import Link from "next/link";
import {IoIosArrowForward, IoIosInformationCircleOutline, IoMdMegaphone} from "react-icons/io";
import {TbAlertTriangle, TbCameraPlus} from "react-icons/tb";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {FaArrowRight} from "react-icons/fa6";
import {TicketConfirmation} from "@/app/components/TicketConfirmation";
import {PiLightbulbFilamentLight} from "react-icons/pi";
import {BsPersonFill} from "react-icons/bs";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {createTicket, getTicketCategories, getTicketCategoryFields} from "@/services/ticketService";

function getArrayResponse(data, key) {
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.[key])) return data[key]
    return []
}

function cleanDynamicFields(dynamicFields) {
    const cleaned = {}

    Object.entries(dynamicFields).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
            cleaned[key] = value
        }
    })

    return cleaned
}

export function NewTicketClient() {
    const router = useRouter()

    const [categories, setCategories] = useState([])
    const [fields, setFields] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [priority, setPriority] = useState("HIGH")
    const [dynamicFields, setDynamicFields] = useState({})

    const [loadingCategories, setLoadingCategories] = useState(true)
    const [loadingFields, setLoadingFields] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [error, setError] = useState("")
    const [modalAberto, setModalAberto] = useState(false)

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoadingCategories(true)
                setError("")

                const data = await getTicketCategories()

                const categoriesList = getArrayResponse(data, "categories")

                setCategories(categoriesList)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoadingCategories(false)
            }
        }

        loadCategories()
    }, [])

    useEffect(() => {
        async function loadFields() {
            if (!categoryId) {
                setFields([])
                setDynamicFields({})
                return
            }

            try {
                setLoadingFields(true)
                setError("")

                const data = await getTicketCategoryFields(categoryId)
                const fieldsList = getArrayResponse(data, "fields")

                setFields(fieldsList)
                setDynamicFields({})
            } catch (error) {
                setError(error.message)
            } finally {
                setLoadingFields(false)
            }
        }

        loadFields()
    }, [categoryId])

    function updateDynamicField(name, value) {
        setDynamicFields((current) => ({
            ...current,
            [name]: value,
        }))
    }

    function renderDynamicField(field) {
        const value = dynamicFields[field.name] ?? ""

        if (field.type === "TEXT") {
            return (
                <input
                    type="text"
                    value={value}
                    placeholder={field.placeholder || ""}
                    onChange={(event) => updateDynamicField(field.name, event.target.value)}
                    className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                />
            )
        }

        if (field.type === "TEXTAREA") {
            return (
                <textarea
                    rows="4"
                    value={value}
                    placeholder={field.placeholder || ""}
                    onChange={(event) => updateDynamicField(field.name, event.target.value)}
                    className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full resize-none focus:outline-none"
                />
            )
        }

        if (field.type === "NUMBER") {
            return (
                <input
                    type="number"
                    value={value}
                    placeholder={field.placeholder || ""}
                    onChange={(event) => {
                        const inputValue = event.target.value

                        updateDynamicField(
                            field.name,
                            inputValue === "" ? "" : Number(inputValue),
                        )
                    }}
                    className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                />
            )
        }

        if (field.type === "DATE") {
            return (
                <input
                    type="date"
                    value={value}
                    onChange={(event) => updateDynamicField(field.name, event.target.value)}
                    className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                />
            )
        }

        if (field.type === "BOOLEAN") {
            return (
                <div className="relative w-full">
                    <select
                        value={value === "" ? "" : String(value)}
                        onChange={(event) => {
                            const selectedValue = event.target.value

                            updateDynamicField(
                                field.name,
                                selectedValue === "" ? "" : selectedValue === "true",
                            )
                        }}
                        className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none cursor-pointer"
                    >
                        <option value="" disabled hidden>
                            Selecione...
                        </option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>

                    <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                </div>
            )
        }

        if (field.type === "SELECT") {
            const options = Array.isArray(field.options) ? field.options : []

            return (
                <div className="relative w-full">
                    <select
                        value={value}
                        onChange={(event) => updateDynamicField(field.name, event.target.value)}
                        className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none cursor-pointer"
                    >
                        <option value="" disabled hidden>
                            Selecione...
                        </option>

                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                </div>
            )
        }

        return null
    }

    async function handleSubmit() {
        try {
            setSubmitting(true)
            setError("")

            if (!title.trim()) {
                setError("Informe o título do chamado.")
                return
            }

            if (!categoryId) {
                setError("Selecione uma categoria.")
                return
            }

            await createTicket({
                title,
                description,
                priority,
                categoryId: Number(categoryId),
                dynamicFields: cleanDynamicFields(dynamicFields),
            })

            setModalAberto(true)

            setTimeout(() => {
                router.push("/homeEscola")
                router.refresh()
            }, 1200)
        } catch (error) {
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Header />

            <div className="flex flex-col items-center justify-center w-[85%] max-w-7xl mx-auto py-8">
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-2 mb-4">
                        <Link
                            href="/homeEscola"
                            className="text-azul-claro hover:text-foreground hover:no-underline transition-colors text-sm duration-400"
                        >
                            Chamados
                        </Link>

                        <IoIosArrowForward className="text-azul-escuro text-sm" />

                        <p className="text-sm text-azul-escuro font-medium">
                            Novo Chamado
                        </p>
                    </div>

                    <h1 className="text-3xl text-azul-escuro font-bold mb-2">
                        Novo Chamado
                    </h1>

                    <p className="text-base text-azul-escuro mb-6">
                        Preencha as informações detalhadamente para agilizar o atendimento.
                    </p>

                    <div className="flex items-start gap-6 w-full">
                        <div className="flex flex-col flex-1 gap-6 w-full">
                            <div className="bg-white flex flex-col rounded-2xl w-full p-6 shadow-sm">
                                <div className="flex items-center w-full mb-4">
                                    <TbAlertTriangle className="w-6 h-6 text-azul-escuro" />

                                    <p className="text-xl ms-3 font-medium text-azul-escuro">
                                        Detalhes do Problema
                                    </p>
                                </div>

                                <hr className="border-t border-azul-escuro mb-6" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col md:col-span-2">
                                        <label
                                            htmlFor="titulo"
                                            className="text-sm font-medium text-azul-escuro mb-1"
                                        >
                                            Título do Problema
                                        </label>

                                        <input
                                            type="text"
                                            id="titulo"
                                            name="titulo"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            placeholder="Resumo curto da situação"
                                            className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="categoria"
                                            className="text-sm font-medium text-azul-escuro mb-1"
                                        >
                                            Categoria
                                        </label>

                                        <div className="relative w-full">
                                            <select
                                                id="categoria"
                                                name="categoria"
                                                value={categoryId}
                                                onChange={(event) => setCategoryId(event.target.value)}
                                                disabled={loadingCategories}
                                                className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                <option value="" disabled hidden>
                                                    {loadingCategories
                                                        ? "Carregando categorias..."
                                                        : "Selecione uma categoria"}
                                                </option>

                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col family-sans">
                    <span className="text-sm font-medium text-azul-escuro mb-1">
                      Gravidade
                    </span>

                                        <div className="flex gap-3">
                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gravidade"
                                                    value="LOW"
                                                    checked={priority === "LOW"}
                                                    onChange={(event) => setPriority(event.target.value)}
                                                    className="sr-only peer"
                                                />

                                                <div className="flex items-center justify-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 font-semibold text-sm transition-all peer-checked:bg-[#2b446c] peer-checked:border-[#2b446c] peer-checked:text-white">
                                                    Baixa
                                                </div>
                                            </label>

                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gravidade"
                                                    value="MEDIUM"
                                                    checked={priority === "MEDIUM"}
                                                    onChange={(event) => setPriority(event.target.value)}
                                                    className="sr-only peer"
                                                />

                                                <div className="flex items-center justify-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 font-semibold text-sm transition-all peer-checked:bg-[#2b446c] peer-checked:border-[#2b446c] peer-checked:text-white">
                                                    Média
                                                </div>
                                            </label>

                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gravidade"
                                                    value="HIGH"
                                                    checked={priority === "HIGH"}
                                                    onChange={(event) => setPriority(event.target.value)}
                                                    className="sr-only peer"
                                                />

                                                <div className="flex items-center justify-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 font-semibold text-sm transition-all peer-checked:bg-[#2b446c] peer-checked:border-[#2b446c] peer-checked:text-white">
                                                    Alta
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:col-span-2">
                                        <label
                                            htmlFor="descricao"
                                            className="text-sm font-medium text-azul-escuro mb-1"
                                        >
                                            Descrição Detalhada
                                        </label>

                                        <textarea
                                            id="descricao"
                                            name="descricao"
                                            rows="4"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            placeholder="Descreva o ocorrido com o máximo de detalhes possível..."
                                            className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full resize-none focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {categoryId && (
                                <div className="bg-white border border-azul-claro flex flex-col rounded-2xl w-full p-6 shadow-sm">
                                    <p className="text-lg font-bold text-azul-escuro mb-4">
                                        Informações Específicas da Categoria
                                    </p>

                                    {loadingFields && (
                                        <p className="text-sm text-cinza font-medium">
                                            Carregando campos da categoria...
                                        </p>
                                    )}

                                    {!loadingFields && fields.length === 0 && (
                                        <p className="text-sm text-cinza font-medium">
                                            Esta categoria não possui campos adicionais.
                                        </p>
                                    )}

                                    {!loadingFields && fields.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {fields.map((field) => (
                                                <div
                                                    key={field.id}
                                                    className={
                                                        field.type === "TEXTAREA"
                                                            ? "flex flex-col md:col-span-2"
                                                            : "flex flex-col"
                                                    }
                                                >
                                                    <label className="text-sm font-medium text-azul-escuro mb-1">
                                                        {field.label}
                                                        {field.required && (
                                                            <span className="text-red-600"> *</span>
                                                        )}
                                                    </label>

                                                    {renderDynamicField(field)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="bg-white flex flex-col rounded-2xl w-full p-6 shadow-sm">
                                <div className="flex justify-between items-center w-full mb-4">
                                    <div className="flex items-center">
                                        <AiOutlineCloudUpload className="w-6 h-6 text-azul-escuro" />

                                        <p className="text-xl ms-3 font-medium text-azul-escuro">
                                            Mídias e Anexos
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-t border-azul-escuro" />

                                <div className="bg-azul-bebezinho w-16 h-16 rounded-full flex items-center mx-auto mt-10 justify-center shrink-0">
                                    <TbCameraPlus className="w-8 h-8 text-azul-escuro" />
                                </div>

                                <p className="text-black flex justify-center font-bold text-base mt-4 text-center">
                                    ENVIAR MÍDIAS DO PROJETO
                                </p>

                                <p className="text-sm flex mt-4 justify-center text-cinza text-center px-4">
                                    Formatos aceitos: JPG, PNG, MP4 ou MOV. Tamanho máximo: 10MB
                                    (fotos) e 500MB (vídeos).
                                </p>

                                <div className="flex justify-center w-full mt-8">
                                    <button
                                        type="button"
                                        className="bg-azul-bebezinho text-azul-escuro font-bold rounded-lg py-4 px-8 text-lg hover:bg-azul-bebe transition-colors"
                                    >
                                        Selecionar Arquivos
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white flex flex-col rounded-2xl w-full p-6 shadow-sm">
                                <div className="flex">
                                    <BsPersonFill className="w-6 h-6 text-azul-escuro" />

                                    <p className="text-xl ms-3 font-medium text-azul-escuro mb-4">
                                        Dados do Chefe Imediato
                                    </p>
                                </div>

                                <hr className="border-t border-azul-escuro" />

                                <div className="flex flex-col w-full">
                                    <div className="flex flex-col mt-6">
                                        <label
                                            htmlFor="nomeChefe"
                                            className="text-sm font-medium text-azul-escuro mb-1"
                                        >
                                            Nome Completo
                                        </label>

                                        <input
                                            type="text"
                                            id="nomeChefe"
                                            name="nomeChefe"
                                            placeholder="Digite o nome completo..."
                                            className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex gap-6 mt-6">
                                        <div className="flex flex-col w-full">
                                            <label
                                                htmlFor="cargoChefe"
                                                className="text-sm font-medium text-azul-escuro mb-1"
                                            >
                                                Cargo/Função
                                            </label>

                                            <input
                                                type="text"
                                                id="cargoChefe"
                                                name="cargoChefe"
                                                placeholder="Digite o cargo ou função..."
                                                className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <label
                                                htmlFor="matriculaChefe"
                                                className="text-sm font-medium text-azul-escuro mb-1"
                                            >
                                                Matrícula
                                            </label>

                                            <input
                                                type="text"
                                                id="matriculaChefe"
                                                name="matriculaChefe"
                                                placeholder="Digite a matrícula..."
                                                className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white flex flex-col rounded-2xl w-full p-6 shadow-sm">
                                <div className="flex">
                                    <IoMdMegaphone className="w-8 h-8 text-azul-escuro" />

                                    <p className="text-black flex justify-center font-bold text-2xl ms-2">
                                        Atenção!
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 bg-white border mt-6 border-[#a2b5cd] border-l-4 border-l-azul-escuro rounded-lg p-4 w-full">
                                    <IoIosInformationCircleOutline className="w-7 h-7 text-[#30486c] shrink-0" />

                                    <span className="text-sm italic text-cinza font-medium">
                    É possível editar este chamado em no máximo 30 minutos após
                    a criação.
                  </span>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-4 font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-2">
                                <Link
                                    href="/homeEscola"
                                    className="text-azul-escuro font-bold hover:opacity-80 transition-opacity text-xl"
                                >
                                    Cancelar
                                </Link>

                                <button
                                    type="button"
                                    disabled={submitting}
                                    onClick={handleSubmit}
                                    className="bg-azul-escuro cursor-pointer text-white font-bold rounded-lg py-4 px-8 flex items-center justify-center text-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? "CRIANDO..." : "CRIAR CHAMADO"}
                                    <FaArrowRight className="w-5 h-5 ml-3" />
                                </button>

                                <TicketConfirmation isOpen={modalAberto} />
                            </div>
                        </div>

                        <div className="bg-white flex flex-col rounded-2xl w-[320px] shrink-0 p-9 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <PiLightbulbFilamentLight className="w-5 h-5 font-bold text-cinza" />

                                <p className="text-sm text-gray-500 font-bold tracking-wide">
                                    DICAS DE PREENCHIMENTO
                                </p>
                            </div>

                            <ol className="flex flex-col gap-5">
                                <li className="flex items-start gap-3">
                                    <p className="flex items-center justify-center bg-azul-bebe text-azul-escuro text-sm font-bold rounded-full w-6 h-6 shrink-0 mt-0.5">
                                        1
                                    </p>

                                    <p className="text-azul-escuro text-base leading-relaxed">
                                        <span className="font-semibold">Seja específico:</span>{" "}
                                        Evite títulos genéricos como &quot;Computador quebrado&quot;.
                                        Prefira &quot;Monitor do laboratório 2 não liga&quot;.
                                    </p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <p className="flex items-center justify-center bg-azul-bebe text-azul-escuro text-sm font-bold rounded-full w-6 h-6 shrink-0 mt-0.5">
                                        2
                                    </p>

                                    <p className="text-azul-escuro text-base leading-relaxed">
                                        <span className="font-semibold">Anexe fotos:</span> Uma imagem
                                        do erro ou da etiqueta de patrimônio ajuda a identificar o
                                        modelo exato do equipamento.
                                    </p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <p className="flex items-center justify-center bg-azul-bebe text-azul-escuro text-sm font-bold rounded-full w-6 h-6 shrink-0 mt-0.5">
                                        3
                                    </p>

                                    <p className="text-azul-escuro text-base leading-relaxed">
                                        <span className="font-semibold">Localização:</span> Se o
                                        problema for estrutural, informe o local e o número da sala
                                        para facilitar a logística.
                                    </p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <p className="flex items-center justify-center bg-azul-bebe text-azul-escuro text-sm font-bold rounded-full w-6 h-6 shrink-0 mt-0.5">
                                        4
                                    </p>

                                    <p className="text-azul-escuro text-base leading-relaxed">
                                        <span className="font-semibold">Patrimônio:</span> O número de
                                        patrimônio é essencial para baixas ou trocas de hardware
                                        oficiais.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}