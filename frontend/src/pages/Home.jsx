import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/items";
import ItemCard from "../components/ItemCard";
import kurtas from "../assets/download.png"
import Frock from "../assets/Frock.jpg"

const categories = [
  { name: "Short Kurtas", img: kurtas },
  { name: "Frock", img: Frock },
  { name: "Tops", img: "/images/categories/tops.png" },
  { name: "Jeans", img: "/images/categories/jeans.png" },
  { name: "Tshirts", img: "/images/categories/tshirts.png" },
  { name: "Shirts", img: "/images/categories/shirts.png" },
];


const Home = () => {
  const { data = [], isLoading } = useQuery({
  queryKey: ["allItems"],
  queryFn: async () => {
    const res = await getItems();
    return res.data;
  },
});


  return (
    <>
      {/* 🌟 Hero Section */}
      <div className="w-full h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">Welcome to ReWear</h1>
        <p className="text-white text-lg mb-6 max-w-xl">
          Swap your clothes. Save the planet. Embrace sustainable fashion!
        </p>
        <div className="space-x-4">
          <Link to="/signin" className="bg-white text-purple-700 px-6 py-3 rounded font-semibold">Start Swapping</Link>
          <Link to="/items" className="bg-black text-white px-6 py-3 rounded font-semibold">Browse Items</Link>
        </div>
      </div>

      {/* 🧵 Categories Section */}
     <div className="w-full bg-gradient-to-br from-yellow-100 via-pink-100 to-rose-200 py-16 px-6 text-center">
  <h2 className="text-4xl font-bold text-gray-800 mb-12">Browse by Category</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
    {categories.map((cat, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-xl py-6 px-4 text-gray-700 font-semibold hover:bg-gray-100 cursor-pointer flex flex-col items-center transition-transform transform hover:scale-105"
      >
        <img
          src={cat.img}
          alt={cat.name}
          className="w-20 h-20 object-contain mb-4"
        />
        <span className="text-lg">{cat.name}</span>
      </div>
    ))}
  </div>
</div>


      {/* 🧥 Featured Items Section */}
      <div className="w-full bg-gradient-to-tr from-zinc-900 via-purple-900 to-black py-16 px-6 text-white">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Items</h2>
        {isLoading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.slice(0, 8).map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
