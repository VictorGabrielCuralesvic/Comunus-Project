import React from 'react';

const Card = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 mb-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">12 de ago, 2024</span>
        <span className="text-pink-500">&#10084;</span> {/* ícone de coração */}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        O que é linguagem de programação? Conheça as principais
      </h3>
      <p className="text-gray-600">
        Uma das mais populares vertentes da tecnologia da informação, a área de programação segue tendo muita demanda de trabalho justamente pela velocidade com que dispositivos tecnológicos vêm avançando.
      </p>
    </div>
  );
};

export default Card;
