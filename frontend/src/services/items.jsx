import axios from "./axiosInstance";

// Public: Get all items
export const getItems = async () => {
  const response = await axios.get("/items");
  return response;
};

// Public: Get single item by ID
export const getItem = async (id) => {
  const response = await axios.get(`/items/${id}`);
  return response.data;
};

// Protected: Add a new item
export const addItem = async (data) => {
  const response = await axios.post("/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies for auth
  });
  return response;
};

// Protected: Get user's swap items
export const getMySwapItems = async () => {
  const response = await axios.get("/items/my-swap-items", {
    withCredentials: true, // Required for auth
  });
  return response.data;
};

// Protected: Send swap request
export const sendSwapRequest = async (itemOffered, itemRequested) => {
  const response = await axios.post(
    "/swap-request",
    { itemOffered, itemRequested },
    {
      withCredentials: true, // Required for auth
    }
  );
  return response.data;
};
