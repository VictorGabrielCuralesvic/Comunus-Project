import React from 'react';

const Card = ({ title, createdAt, content }) => {
  // Função para formatar a data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options); // Ajuste para o formato desejado
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 mb-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        <span className="text-pink-500">&#10084;</span> {/* ícone de coração */}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {content}
      </p>
    </div>
  );
};

export default Card;
