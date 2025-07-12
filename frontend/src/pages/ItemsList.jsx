// src/pages/ItemsList.jsx
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/items";
import { Link } from "react-router-dom";

const ItemsList = () => {
  const { data: items, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,

  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching items</p>;
  

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.data.map((item) => (
        <Link to={`/items/${item._id}`} key={item._id}>
          <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img src={`http://localhost:4000${item.images?.[0]}`}  alt="" className="h-40 w-full object-fit rounded mb-2" />
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemsList;
