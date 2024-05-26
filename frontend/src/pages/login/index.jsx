/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitForm() {
    console.log(email, password);
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
        <div className="mb-4">
          <input
            type="email"
            id="email"
            className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Digite seu E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <Link
            href="/dashboard"
            className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => submitForm()}>
            Continue com email
          </Link>
          <p className="mt-8 text-terciary">
           Não está cadastrado?{" "}
            <Link href="/signup" className="text-primary">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
