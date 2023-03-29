import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
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
            <div className="login-btn">
            <button type="submit" className="login-sign-in">
              Log In
            </button>
            </div>
          </div>
        </form>
          <div className="remember-me-forget-pass">
            <div className="check-remember">
            <input type="checkbox" id="" name="remember-me" value="" />
            <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to={"/forgot-password"}><span className="forgot">Forgot password ?</span></Link>
            <Link to={"/register"}>
              <span className="register"> Register</span></Link>
          </div>
      </div>
    </section>
  );
}

export default Login;