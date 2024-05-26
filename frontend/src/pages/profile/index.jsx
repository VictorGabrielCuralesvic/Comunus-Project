// profile.jsx
import { useState } from 'react';
import "tailwindcss/tailwind.css";
import Header from "../../components/Header";
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState("nome");
  const [email, setEmail] = useState("email@email.com");
  const [password, setPassword] = useState("************");

  const handleSave = () => {
    console.log("Perfil salvo");
    router.push('/dashboard');
  };

  const handleCancel = () => {
    console.log("Mudanças de perfil canceladas");
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center">
      <Header />
      <div className="w-full max-w-xl mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
        <div className="flex flex-col items-center mb-6">
          <img src="/path/to/profile-pic.jpg" alt="Profile Picture" className="w-24 h-24 rounded-full object-cover mb-4" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="flex justify-between">
          <button onClick={handleCancel} className="bg-red-100 text-red-600 px-4 py-2 rounded">Cancelar</button>
          <button onClick={handleSave} className="bg-green-100 text-green-600 px-4 py-2 rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
}
