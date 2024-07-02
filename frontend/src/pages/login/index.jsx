/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function submitForm(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Salvando o token no cookie
      Cookies.set("token", token, { expires: 7 }); // Expira em 7 dias

      // Redirecionar para o dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Tratar erro de login aqui, exibir mensagem para o usuário, etc.
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xs text-center">
        <h1 className="text-2xl text-center font-bold mb-4">
          Acesse sua Conta
        </h1>
        <p className="text-terciary mb-8">
          Bem vindo de volta! Por favor insira seus dados abaixo.
        </p>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Digite seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded w-full"
            >
              Continue com email
            </button>
            <p className="mt-8 text-terciary">
              Não está cadastrado?{" "}
              <Link href="/signup" className="text-primary">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
