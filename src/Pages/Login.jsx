import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Log In</h1>
        <form autoComplete="false">
          <div className="form-group">
            <input
              type="text"
              className="login-group-input"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Password"
              required
            />
            <button type="button" className="login-sign-in">
              Log In
            </button>
          </div>
        </form>
          <div className="remember-me-forget-pass">
            <div className="check-remember">
            <input type="checkbox" id="" name="remember-me" value="" />
            <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to={"/"}>Forgot password ?</Link>
            <Link to={"/register"}>Don't have an account register</Link>
          </div>
      </div>
    </div>
  );
}

export default Login;