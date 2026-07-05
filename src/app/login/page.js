'use client';
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import {loginRequest} from "@/services/authService";
import {getHomePathByRole} from "@/lib/getHomePathByRole";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState('');
  const [registration, setRegistration] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const data = await loginRequest(registration, senha)

      const destination = getHomePathByRole(data.user.role)

      window.location.href = destination
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gelo p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
        
        <div className="flex flex-col items-center gap-2 mb-8">
          <Link href={"#"} className="text-azul-escuro font-bold text-lg"><Image src={Logo} alt="Logo" width={250} objectFit="contain" /></Link>
          <h2 className="text-azul-escuro text-3xl font-bold">Acesse sua conta!</h2>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="usuario" className="text-azul-escuro font-semibold text-lg">
              Matrícula
            </label>
            <input
              type="text"
              id="usuario"
              placeholder="Digite sua matrícula..."
              className="w-full px-4 py-3 bg-gelo rounded-xl border border-azul-escuro outline-none text-lg"
              onChange={(e) => setRegistration(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-azul-escuro font-semibold text-lg">
              Senha
            </label>
            <div className="relative w-full">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                id="senha"
                placeholder="Digite sua senha..."
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 bg-gelo rounded-xl border border-azul-escuro outline-none text-lg pr-12"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-azul-escuro hover:text-azul-escuro transition"
                aria-label="Alternar visibilidade da senha"
              >
                {mostrarSenha ? (
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="justify-between items-center text-sm">
            <Link href={"#"} type="button" className="text-azul-escuro underline font-medium">
              Esqueceu sua senha?
            </Link>

            <label className="flex items-center gap-2 cursor-pointer py-2">
              <input type="checkbox" className="size-4 rounded-lg border-azul-escuro accent-azul-escuro cursor-pointer" />
              <span className="text-azul-escuro">Permanecer conectado</span>
            </label>
          </div>


          <button
            type="submit"
            className="text-gelo w-40 h-10 mx-auto bg-azul-escuro hover:text-azul-escuro hover:bg-gelo hover:border hover:border-azul-escuro font-bold rounded-lg transition-colors text-lg uppercase cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}