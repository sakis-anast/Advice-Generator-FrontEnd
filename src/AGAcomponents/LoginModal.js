import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginModal = ({
  open,
  onClose,
  setOpenLoginModal,
  setLoading,
  darkMode,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    theme: "dark",
    pauseOnHover: true,
    draggable: true,
  };
  const toastOptions2 = {
    position: "top-right",
    autoClose: 1000,
    theme: "light",
    pauseOnHover: true,
    draggable: true,
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post("https://advice-generator-api.onrender.com/user/login", {
        username,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setOpenLoginModal(false);
          setLoading(true);
          if (darkMode) {
            toast.success("Welcome ready for a new advice?", toastOptions);
          } else {
            toast.success("Welcome ready for a new advice?", toastOptions2);
          }
          setPassword("");
          setUsername("");
        } else {
          if (darkMode) {
            toast.error(data.message, toastOptions);
          } else {
            toast.error(data.message, toastOptions2);
          }
        }
      });
  };

  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div
        className={
          darkMode ? "dark-bg2 modalContainer " : "light-bg2 modalContainer"
        }
      >
        <span className="modalBtn" onClick={onClose}>
          X
        </span>

        <h2 className={darkMode ? "d-text  title " : "l-text  title"}>
          {" "}
          Login{" "}
        </h2>
        <form action="login-box">
          <label htmlFor="username">username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className={darkMode ? "dlb log-button  " : "llb log-button "}
            type="submit"
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginModal;
