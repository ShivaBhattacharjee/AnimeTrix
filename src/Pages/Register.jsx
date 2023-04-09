
import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign Up</h1>
        <form autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              className="login-group-input"
              placeholder="Username"
              required
            />
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
            <input
              type="password"
              className="login-group-input"
              placeholder="Confirm password"
              required
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Enter Otp"
              required
            />
            <button type="button" className="login-sign-in">
              Get OTP
            </button>
          </div>
        </form>
        <div className="login-here">
          <Link to={'/login'}>
            <span className='font'>Already have an account ?</span>
            Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Register