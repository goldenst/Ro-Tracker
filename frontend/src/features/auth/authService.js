import axios from "axios";

const APU_URL = "/api/user";

// register user
const register = async (userData) => {
  // make call to backend
  const responce = await axios.post(APU_URL, userData);

  if (responce.data) {
    // put in local storage
    localStorage.setItem("user", JSON.stringify(responce.data));
  }

  return responce.data;
};

//Login user
const login = async (userData) => {
  // make call to backend
  const responce = await axios.post(APU_URL + '/login', userData);

  if (responce.data) {
    // put in local storage
    localStorage.setItem("user", JSON.stringify(responce.data));
  }

  return responce.data;
};

// Logout
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
};

export default authService;
