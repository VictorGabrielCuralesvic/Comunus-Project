import React from 'react';

const Card = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 mb-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">12 de ago, 2024</span>
        <span className="text-pink-500">&#10084;</span> {/* ícone de coração */}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Compartilhe e Conecte: Encontre Apoio para a Jornada da Parentalidade!
      </h3>
      <p className="text-gray-600">
        🌟 Queridos pais e mães, esta é a sua comunidade de apoio! Sejam bem-vindos a um espaço onde os desafios da parentalidade são compartilhados, compreendidos e superados juntos.
      </p>
    </div>
  );
};

export default Card;
