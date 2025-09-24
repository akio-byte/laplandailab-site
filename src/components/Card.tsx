import React from 'react';

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

export const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    {imageUrl && <img src={imageUrl} alt={title} className="mb-4 w-24 h-24 object-cover rounded" />}
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-700">{description}</p>
  </div>
);
