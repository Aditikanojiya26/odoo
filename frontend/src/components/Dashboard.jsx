import { useMyContext } from "./context/Context";
import { logout } from "../services/auth";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { user, setUser } = useMyContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser({});
    navigate("/signin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-950 to-zinc-900 px-4">
      <div className="w-full max-w-xl bg-black/60 border border-gray-800 shadow-xl backdrop-blur-md rounded-2xl p-8 text-white font-[Poppins]">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          {user.avatar ? (
            <img
              src={
                user.avatar.startsWith("http")
                  ? user.avatar
                  : `http://localhost:4000${user.avatar}`
              }
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover border border-gray-600 shadow"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
              {user.name?.[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-2 text-sm text-gray-300">
          <p>
            <span className="font-medium text-gray-400">Full Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium text-gray-400">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium text-gray-400">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-medium text-gray-400">Points Balance:</span> {user.points ?? 0} pts
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/add-item")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Add Item
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
