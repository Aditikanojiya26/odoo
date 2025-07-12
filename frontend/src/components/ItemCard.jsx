// src/components/ItemCard.jsx
import React from "react";

const ItemCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`http://localhost:4000${item.images?.[0]}`}
          alt={item.title}
          className="w-full md:w-64 h-64 object-fit rounded-xl border"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h1>
          <p className="text-gray-600 mb-4">{item.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <Detail label="Category" value={item.category} />
            <Detail label="Type" value={item.type} />
            <Detail label="Size" value={item.size?.toUpperCase()} />
            <Detail label="Condition" value={item.condition} />
            <Detail label="Points" value={item.points} />
            <Detail label="Tags" value={item.tags?.join(", ") || "None"} />
            <Detail label="Status" value={item.status} />
            <Detail
              label="Created"
              value={new Date(item.createdAt).toLocaleString()}
            />
            <Detail
              label="Updated"
              value={new Date(item.updatedAt).toLocaleString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

export default ItemCard;
