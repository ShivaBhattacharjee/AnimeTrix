
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate()

  const changePassword = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    alert(error.response.data.error);
            return ;
            });
            const res = await axios.post(`http://localhost:8000/api/v1/user/change/password`, {
                email: email,
                password: password
            })
            return res;
        } catch(err) {
            console.log(err);
            alert("Something went wrong please try again later.")
    }   
  }

  const userVerification = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    alert(error.response.data.error);
            return ;
            });
            const res = await axios.post(`http://localhost:8000/api/v1/user/verify`, {
                email: email,
                verificationCode: otp
            })
            return res;
        } catch(err) {
            console.log(err);
            alert("Something went wrong please try again later.")
    }   
}


  const getOTP = async(e) => {
    e.preventDefault();
    if(conPassword == password) {
      if(password.length >= 8 && password.length <= 12) {
        const res = await changePassword(email, password);
        if(res) {
          alert(res.data.message);
        }
      } else {
        alert("Password should be 8 to 12 characters long");
      setPassword("");
      setConPassword("");
      }
    } else {
      alert("Password doesnt match");
      setPassword("");
      setConPassword("");
    }
  } 

  const submitHandler = async(e) => {
    e.preventDefault();
    if(conPassword == password) {
      if(!(password.length < 8 && password.length >= 12)) {
        const res = await userVerification(email, otp);
        if(res) {
          alert("Registration Successfull");
          navigate("/login");
        }
      } else {
        alert("Password should be 8 to 12 characters long");
      setPassword("");
      setConPassword("");
      }
    } else {
      alert("Password doesnt match");
      setPassword("");
      setConPassword("");
    }
  }
  return (
    <div className="register">
    <div className="register-container">
      <h1>Change Password</h1>
      <form autoComplete="false" onSubmit={e => {getOTP(e)}}>
        <div className="form-group">
          <input
            type="text"
            className="register-group-input"
            placeholder="Email"
            onChange={e => {setEmail(e.target.value)}}
            required
          />
          <input
            type="password"
            className="register-group-input"
            placeholder="Password"
            onChange={e => {setPassword(e.target.value)}}
            value={password}
            required
          />
           <input
            type="password"
            className="register-group-input"
            placeholder="Confirm password"
            onChange={e => {setConPassword(e.target.value)}}
            value={conPassword}
            required
          />
          <input
            type="text"
            className="register-group-input"
            placeholder="OTP"
            onChange={e => {setOtp(e.target.value)}}
          />
          <button type="submit" className="register-sign-in">
            Get OTP
          </button>
          <button type="button" className="register-sign-in" onClick={e => {submitHandler(e)}}>
            Change Password
          </button>
        </div>
      </form>
        <div className="login-here">
          <span className='font'>Already have an account ?</span>
          <Link to={'/login'}>Log In</Link>
        </div>
    </div>
  </div>
  )
}

export default ForgotPassword