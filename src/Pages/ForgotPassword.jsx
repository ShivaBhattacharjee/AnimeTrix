import React from 'react'
import { Link } from 'react-router-dom'
const ForgotPassword = () => {
  return (
    <section className="login">
      <div className="login-container">
        <h1>Forgot Password?</h1>
        <form autoComplete="false">
          <div className="form-group">
            <input
              type="email"
              className="login-group-input"
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Enter your password Password"
              required
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Confirm Password"
              required
            />
              <input
              type="text"
              className="login-group-input-otp"
              placeholder="Enter OTP"
              required
            />
            <button className='otp-btn'>Get OTP</button>
            <div className="login-btn">
              <button type="submit" className="login-sign-in">
                Log In
              </button>
            </div>
          </div>
        </form>
        <div className="remember-me-forget-pass">
          <Link to={"/"}><span className="forgot">Forgot password ?</span></Link>
          <Link to={"/register"}>
            <span className="register"> Register</span></Link>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword