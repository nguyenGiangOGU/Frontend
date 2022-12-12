import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  //template string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const getUser = async () => {
  return await axios.get("/users");
};
const handleDeleteUser = async (id) => {
  return await axios.delete(`/user/${id}`);
};
const handleCreateUser = async (user) => {
  return await axios.post(`/user`, user);
};
const handleUpdateUser = async (user) => {
  return await axios.put("/user", user);
};
export {
  handleLoginApi,
  getAllUsers,
  getUser,
  handleDeleteUser,
  handleCreateUser,
  handleUpdateUser,
};
