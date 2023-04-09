import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const userLogin = async() => {
        try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    alert(error.response.data.error);
            return ;
            });
            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, {
                email: email,
                password: password
            })
            return res;
        } catch(err) {
            console.log(err);
            alert("Something went wrong please try again later.")
        }
  }

  const navigate = useNavigate();
  const submitHandler = async(e) => {
    e.preventDefault();
    const res = await userLogin();
    if(res) {
                console.log("Login Successfull");
              if(rememberMe) {
                Cookies.set("id", res.data._id,{expires: 7});
                navigate("/");
              } else {
                Cookies.set("id", res.data._id,{expires: 1});
                navigate("/");
              }
            }
    console.log("fcghfghgf");
  }
  return (
    <section className="login">
      <div className="login-container">
        <h1>Log In</h1>
        <form autoComplete="false" onSubmit={e => {submitHandler(e)}}>
          <div className="form-group">
            <input
              type="text"
              className="login-group-input"
              placeholder="Email"
              onChange={e => {setEmail(e.target.value)}}
              required
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Password"
              onChange={e => {setPassword(e.target.value)}}
              required
            />
            <button type="submit" className="login-sign-in">
              Log In
            </button>
          </div>
        </form>
          <div className="remember-me-forget-pass">
            <div className="check-remember">
            <input type="checkbox" id="" name="remember-me" value="" onChange={e => {setRememberMe(!rememberMe)}}/>
            <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to={"/forgot-password"}>Forgot password ?</Link>
            <Link to={"/register"}>Don't have an account register</Link>
          </div>
      </div>
    </section>
  );
}

export default Login;