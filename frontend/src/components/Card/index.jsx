import React from 'react';
import { useRouter } from 'next/router';

const Card = ({ id, title, createdAt, content }) => {
  const router = useRouter();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
  };

  const handleClick = () => {
    router.push(`/foruns/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 mb-4 p-4 cursor-pointer"
         onClick={handleClick}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        <span className="text-pink-500">&#10084;</span>
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
