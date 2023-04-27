import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServerApi } from "../Components/constants";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const userLogin = async () => {
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "dark",
        });
        return;
      });
      const res = await axios.post(`${ServerApi}/user/login`, {
        email: email,
        password: password
      })
      return res;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return undefined;
}

  const navigate = useNavigate();

  useEffect(()=>{
    const id = getCookie("id");
    if(id) {
      navigate("/");
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await userLogin();
    if (res) {
      toast.success("Welcome to AnimeTrix", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
      if (rememberMe) {
        Cookies.set("id", res.data._id, { expires: 7 });
        Cookies.set("category", res.data.category, { expires: 7 });
        Cookies.set("img", res.data.profile, { expires: 7 });
        window.location.reload();
      } else {
        Cookies.set("id", res.data._id, { expires: 1 });
        Cookies.set("category", res.data.category, { expires: 1 });
        Cookies.set("img", res.data.profile, { expires: 1 });
        window.location.reload();
      }
    }
    else {
      console.log("Error")
    }
  }
  return (
    <>
    <section className="login">
      <ToastContainer/>
      <div className="login-container">
        <h1>Log In</h1>
        <form autoComplete="false" onSubmit={e => { submitHandler(e) }}>
          <div className="form-group">
            <input
              type="text"
              className="login-group-input"
              placeholder="Email"
              onChange={e => { setEmail(e.target.value) }}
              required
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Password"
              onChange={e => { setPassword(e.target.value) }}
              required
            />
             <div className="login-btn">
              <button type="submit" className="login-sign-in">
                Log In
              </button>
            </div>
          </div>
        </form>
        <div className="remember-me-forget-pass">
          <div className="check-remember">
            <input type="checkbox" id="" name="remember-me" value="" onChange={e => { setRememberMe(!rememberMe) }} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Link to={"/forgot-password"}>Forgot password ?</Link>
          <Link to={"/register"}>Don't have an account <span className="register"> Register</span></Link>
        </div>
      </div>
    </section>
    </>
  );
}

export default Login;