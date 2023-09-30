import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import jwt from "jwt-decode";

const initialUsers = () => {
  const item = window.localStorage.getItem("users");
  return item
    ? JSON.parse(item)
    : [
        {
          id: uuidv4(),
          name: "dashcode",
          email: "user@example.com",
          password: "string",
        },
      ];
};
// save users in local storage

const initialIsAuth = () => {
  const item = window.localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
    token: {},
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.users.push({
          id: uuidv4(),
          name,
          email,
          password,
        });
        window.localStorage.setItem("users", JSON.stringify(state.users));
        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },

    handleLogin: (state, action) => {
      console.log(action.payload);
      state.isAuth = action.payload;
      // save isAuth in local storage
      window.localStorage.setItem("token", JSON.stringify(state.isAuth[1]));
      window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth[0]));

      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      window.localStorage.removeItem("isAuth");
      toast.success("User logged out successfully", {
        position: "top-right",
      });
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
