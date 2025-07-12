import axios from "./axiosInstance";

export const getItems = async () => {
    const response = await axios.get("/items");
    return response;
};

export const getItem = async (id) => {
    const response = await axios.get(`/items/${id}`);
    return response.data;
};

export const addItem = async (data) => {
    const response = await axios.post("/add", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
}

