'use client';
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiLightbulbFilamentLight } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { TbCameraPlus } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { IoMdMegaphone } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { TbAlertTriangle } from "react-icons/tb";
import { Header } from "../components/Header";
import Link from "next/link";
import { TicketConfirmation } from "../components/TicketConfirmation";

export default function HomePage() {
  const [categoria, setCategoria] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

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
            <p className="text-sm text-azul-escuro font-medium">Novo Chamado</p>
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
                <hr className="border-t  border-azul-escuro mb-6"></hr>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="nome" className="text-sm font-medium text-azul-escuro mb-1">
                      Título do Problema
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Resumo curto da situação"
                      className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="categoria" className="text-sm font-medium text-azul-escuro mb-1">
                      Categoria
                    </label>
                    <div className="relative w-full">
                      <select
                        id="categoria"
                        name="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none cursor-pointer"
                      >
                        <option value="" disabled hidden>Selecione uma categoria</option>
                        <option value="vistoria">Vistoria</option>
                        <option value="eletrica">Elétrica</option>
                        <option value="hidraulica">Hidráulica e encanamento</option>
                        <option value="mobiliario">Mobiliário escolar</option>
                        <option value="tecnologia">Tecnologia e informática</option>
                        <option value="infraestrutura">Infraestrutura predial</option>
                        <option value="eletrodomesticos">Eletrodomésticos e Cozinha</option>
                        <option value="seguranca">Segurança</option>
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
                        <input type="radio" name="gravidade" value="baixa" className="sr-only peer" />
                        <div className="flex items-center justify-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 font-semibold text-sm transition-all peer-checked:bg-[#2b446c] peer-checked:border-[#2b446c] peer-checked:text-white">
                          Baixa
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="gravidade" value="media" className="sr-only peer" />
                        <div className="flex items-center justify-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 font-semibold text-sm transition-all peer-checked:bg-[#2b446c] peer-checked:border-[#2b446c] peer-checked:text-white">
                          Média
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="gravidade" value="alta" className="sr-only peer" defaultChecked />
                        <div className="flex items-center justify-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 font-semibold text-sm transition-all peer-checked:bg-[#2b446c] peer-checked:border-[#2b446c] peer-checked:text-white">
                          Alta
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="local" className="text-sm font-medium text-azul-escuro mb-1">
                      Local
                    </label>
                    <div className="relative w-full">
                      <select
                        id="local"
                        name="local"
                        className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none cursor-pointer"
                      >
                        <option value="" disabled selected hidden>Selecione um local</option>
                        <option value="opcao1">Sala de aula</option>
                        <option value="opcao2">Banheiro</option>
                        <option value="opcao3">Laboratório de Informática</option>
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="patrimonio" className="text-sm font-medium text-azul-escuro mb-1">
                      N° de Patrimônio (Se houver)
                    </label>
                    <input
                      type="text"
                      id="patrimonio"
                      name="patrimonio"
                      placeholder="Digite o número..."
                      className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="descricao" className="text-sm font-medium text-azul-escuro mb-1">
                      Descrição Detalhada
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      rows="4"
                      placeholder="Descreva o ocorrido com o máximo de detalhes possível..."
                      className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full resize-none focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {categoria && (
                <div className="bg-white border border-azul-claro flex flex-col rounded-2xl w-full p-6 shadow-sm">
                  <p className="text-lg font-bold text-azul-escuro mb-4">
                    Informações Específicas da Categoria
                  </p>

                  {categoria === "vistoria" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-2">Checklist de Itens</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {[
                            "Ar-condicionado", "Ventiladores", "Bebedouros", 
                            "Extintores", "Instalações Elétricas", 
                            "Instalações Hidráulicas", "Segurança Patrimonial"
                          ].map((item, index) => (
                            <label key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-azul-escuro cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-azul-escuro border-azul-escuro rounded" />
                              <span className="text-sm text-azul-escuro font-medium">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-azul-escuro mb-1">Data da última manutenção</label>
                          <input type="date" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-azul-escuro mb-1">Estado Geral do Setor</label>
                          <div className="relative w-full">
                            <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                              <option value="" disabled selected hidden>Selecione...</option>
                              <option value="funcional">Funcional</option>
                              <option value="reparo">Precisa de reparo</option>
                              <option value="inoperante">Inoperante</option>
                            </select>
                            <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                          <label className="text-sm font-medium text-azul-escuro mb-1">Observações de Risco</label>
                          <input type="text" placeholder="Descreva possíveis riscos encontrados..." className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {categoria === "eletrica" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Tipo de problema</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="curto">Curto-circuito</option>
                            <option value="tomada">Tomada ou interruptor danificado</option>
                            <option value="falta_energia">Falta de energia parcial</option>
                            <option value="fiacao">Fiação exposta</option>
                            <option value="oscilacao">Oscilação de tensão</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Local específico na sala</label>
                        <input type="text" placeholder="Ex: Tomada próxima à porta, Lâmpada do fundo" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {categoria === "hidraulica" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Tipo de problema</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="torneira">Vazamento em torneira</option>
                            <option value="entupido">Vaso sanitário entupido</option>
                            <option value="infiltracao">Infiltração na parede</option>
                            <option value="caixa_dagua">Problema na caixa d&apos;água</option>
                            <option value="cano_rompido">Cano rompido</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Gravidade do vazamento</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="gotejamento">Gotejamento leve</option>
                            <option value="constante">Fluxo constante</option>
                            <option value="alagamento">Alagamento</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {categoria === "mobiliario" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Item danificado</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="carteira">Carteira escolar</option>
                            <option value="cadeira">Cadeira de aluno</option>
                            <option value="armario">Armário de aço</option>
                            <option value="estante">Estante de livros</option>
                            <option value="mesa">Mesa do professor</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Quantidade</label>
                        <input type="number" placeholder="Ex: 5" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Descrição do dano</label>
                        <input type="text" placeholder="Ex: Pé quebrado, Empenado" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {categoria === "tecnologia" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Equipamento</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="desktop">Computador Desktop</option>
                            <option value="notebook">Notebook</option>
                            <option value="tablet">Tablet</option>
                            <option value="monitor">Monitor</option>
                            <option value="impressora">Impressora</option>
                            <option value="projetor">Projetor</option>
                            <option value="roteador">Roteador</option>
                            <option value="switch">Switch</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Número de Patrimônio</label>
                        <input type="text" placeholder="Ex: 123456" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Conectividade</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Possui acesso à internet?</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Sintoma</label>
                        <input type="text" placeholder="Ex: Não liga, Lentidão, Cabo partido" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {categoria === "infraestrutura" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Local da Ocorrência</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="sala">Sala de aula</option>
                            <option value="banheiro">Banheiro</option>
                            <option value="biblioteca">Biblioteca</option>
                            <option value="patio">Pátio</option>
                            <option value="corredor">Corredor</option>
                            <option value="externa">Área externa</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Elemento afetado</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="piso">Piso</option>
                            <option value="teto">Teto</option>
                            <option value="parede">Parede</option>
                            <option value="janela">Janela</option>
                            <option value="porta">Porta</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {categoria === "eletrodomesticos" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Equipamento</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="geladeira">Geladeira</option>
                            <option value="fogao">Fogão Industrial</option>
                            <option value="microondas">Micro-ondas</option>
                            <option value="bebedouro">Bebedouro</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Status de ligação</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Conectado à energia?</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Sinais de perigo</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Cheiro de queimado?</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {categoria === "seguranca" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Tipo de falha</label>
                        <div className="relative w-full">
                          <select className="appearance-none bg-white border border-azul-escuro rounded-lg p-2.5 pr-10 w-full text-azul-escuro focus:outline-none">
                            <option value="" disabled selected hidden>Selecione...</option>
                            <option value="camera">Câmera inoperante</option>
                            <option value="fechadura">Fechadura danificada</option>
                            <option value="portao">Portão ou grade com problema</option>
                            <option value="alarme">Alarme disparando sem motivo</option>
                          </select>
                          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-azul-escuro pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-azul-escuro mb-1">Localização exata</label>
                        <input type="text" placeholder="Ex: Entrada do bloco B, Portão principal" className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                      </div>
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
                <hr className="border-t border-azul-escuro"></hr>
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
                  <button className="bg-azul-bebezinho text-azul-escuro font-bold rounded-lg py-4 px-8 text-lg hover:bg-azul-bebe transition-colors">
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
                <hr className="border-t border-azul-escuro"></hr>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col mt-6">
                    <label htmlFor="nomeChefe" className="text-sm font-medium text-azul-escuro mb-1">
                      Nome Completo
                    </label>
                    <input type="text" id="nomeChefe" name="nomeChefe" placeholder="Digite o nome completo..." className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                  </div>

                  <div className="flex gap-6 mt-6">
                    <div className="flex flex-col w-full">
                      <label htmlFor="cargoChefe" className="text-sm font-medium text-azul-escuro mb-1">
                        Cargo/Função
                      </label>
                      <input type="text" id="cargoChefe" name="cargoChefe" placeholder="Digite o cargo ou função..." className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
                    </div>

                    <div className="flex flex-col w-full">
                      <label htmlFor="matriculaChefe" className="text-sm font-medium text-azul-escuro mb-1">
                        Matrícula
                      </label>
                      <input type="text" id="matriculaChefe" name="matriculaChefe" placeholder="Digite a matrícula..." className="border border-azul-escuro text-azul-escuro rounded-lg p-2.5 w-full focus:outline-none" />
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

              <div className="flex justify-between items-center mt-2">
                <Link
                  href="/homeEscola"
                  className="text-azul-escuro font-bold hover:opacity-80 transition-opacity text-xl"
                >
                  Cancelar
                </Link>
                <button onClick={() => setModalAberto(true)} className="bg-azul-escuro text-white font-bold rounded-lg py-4 px-8 flex items-center justify-center text-lg hover:opacity-90 transition-opacity">
                  CRIAR CHAMADO <FaArrowRight className="w-5 h-5 ml-3" />
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
                    <span className="font-semibold">Seja específico:</span> Evite
                    títulos genéricos como &quot;Computador quebrado&quot;.
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
                    problema for estrutural (ex: goteira), informe o local e o
                    número da sala para facilitar a logística.
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
  );
}