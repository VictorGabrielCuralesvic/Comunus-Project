/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  async function submitForm() {
    console.log(name, email, password);
    if (!validatePassword(password)) {
      setPasswordError(
        "Senha deve incluir pelo menos um número, uma letra minúscula, uma letra maiúscula, um símbolo especial e conter entre 8-50 caracteres."
      );
      return;
    } else {
      router.push("/");
    }
    //Logic for submitting form data
  }

  function validatePassword(password) {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,50}$/;
    return regex.test(password);
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Inputs */}
      <div className="max-w-3/4 md:w-2/4 h-screen mr-4 flex flex-col justify-center items-center">
        <div className="max-w-3/4 md:w-2/4">
          <h1 className="text-2xl font-bold mb-4">Cadastre-se</h1>

          <div className="mb-4">
            <p className="text-terciary">Nome*</p>
            <input
              type="text"
              id="name"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Insira seu nome"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-terciary">Email*</p>
            <input
              type="email"
              id="email"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Insira seu email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <p className="text-terciary">Senha*</p>
            <input
              type="password"
              id="password"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Crie uma senha segura"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex flex-col text-center">
            <button
              className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => submitForm()}>
              Entrar
            </button>
            <p className="text-terciary mt-8">
              Já possui uma conta?{" "}
              <Link href="/" className="text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Title and paragraph */}

      <div className="flex-1 flex flex-col justify-center items-center w-full md:w-2/4 h-screen bg-gradient-to-r from-[#70b873] to-[#3a7f3d] text-white p-8 rounded">
        <div className="flex flex-col w-2/3 justify-center items-start">
          <div>
            <h1 className="text-6xl mb-4">Bem vindos ao <i>Communis</i></h1>
            <p>A rede social de Pais e Mães.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
