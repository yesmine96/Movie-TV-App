import React from "react";
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

type CardProps = {
  title: string;
  image: string;
  date: string;
};
const Card: React.FC<CardProps> = ({ title, image, date }) => {
  const imageUrl = `${BASE_IMAGE_URL}${image}`;

  return (
    <div className="border border-gray-200 rounded-lg ">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-2">
        <h2 className="text-md font-bold ">{title}</h2>
        <h1 className="text-sm color-gray">{date}</h1>
      </div>
    </div>
  );
};
export default Card;
