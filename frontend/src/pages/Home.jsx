const Home = () => {
  return (
    <>
      {/* Hero Section - Purple Gradient */}
      <div className="w-full h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Welcome to VirtualR</h1>
      </div>

      {/* Mid Section - Soft Peach */}
      <div className="w-full h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-rose-200 flex items-center justify-center">
        <h2 className="text-gray-800 text-3xl font-semibold">Explore our Features</h2>
      </div>

      {/* Final Section - Cyberpunk Dark */}
      <div className="w-full h-screen bg-gradient-to-tr from-zinc-900 via-purple-900 to-black flex items-center justify-center">
        <h2 className="text-white text-3xl font-semibold">Join Us Today!</h2>
      </div>
    </>
  );
};

export default Home;
