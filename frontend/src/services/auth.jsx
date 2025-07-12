import axios from "./axiosInstance";

export const signup= async(data)=>{
    const response=await axios.post("/signup",data);
    return response
}

export const login=async (data) => {
    const response=await axios.post("/login",data);
    return response
}

export const getMe = async () => {
  const response = await axios.get("/me");
  return response;
};

export const logout = async () => {
  const response = await axios.post("/logout");
  return response;
};
