import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../services/auth";
import { useMyContext } from "../components/context/Context";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useMyContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch (err) {
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  return children;
};

export default ProtectedRoute;
