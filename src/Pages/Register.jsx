
import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="register">
    <div className="register-container">
      <h1>Sign Up</h1>
      <form>
        <div className="form-group">
        <input
            type="text"
            className="register-group-input"
            placeholder="Username"
            required
          />
          <input
            type="text"
            className="register-group-input"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="register-group-input"
            placeholder="Password"
            required
          />
           <input
            type="password"
            className="register-group-input"
            placeholder="Confirm password"
            required
          />
          <button type="button" className="register-sign-in">
            Get OTP
          </button>
        </div>
      </form>
        <div className="login-here">
          <span className='font'>Already have an account ?</span>
          <Link to={'/'}>Log In</Link>
        </div>
    </div>
  </div>
  )
}

export default Register