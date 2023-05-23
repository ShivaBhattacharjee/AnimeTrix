import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ServerApi } from '../Components/constants';
import { showErrorToast, showSuccessToast } from '../utils/toast';
function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate()

  useEffect(()=>{
     const id = getCookie("id");
   if(id) {
      navigate("/");
    }
  });

  const changePassword = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    showErrorToast(error.response.data.error)
            return ;
            });
            const res = await axios.post(`${ServerApi}/user/change/password`, {
                email: email,
                password: password
            })
            return res;
        } catch(err) {
            console.log(err);
            showErrorToast( 'Something went wrong!');
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

  const userVerification = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    showErrorToast(error.response.data.error);
            return ;
            });
            const res = await axios.post(`${ServerApi}/user/verify`, {
                email: email,
                verificationCode: otp
            })
            return res;
        } catch(err) {
            console.log(err);
            showErrorToast( 'Something went wrong!');
    }   
}


  const getOTP = async(e) => {
    e.preventDefault();
    if(conPassword === password) {
      if(password.length >= 8 && password.length <= 12) {
        const res = await changePassword(email, password);
        if(res) {
          alert(res.data.message);
        }
      } else {
        showErrorToast('Password should be 8 to 12 characters long!');
      setPassword("");
      setConPassword("");
      }
    } else {
      showErrorToast( 'Password doesnt match!');
      setPassword("");
      setConPassword("");
    }
  } 

  const submitHandler = async(e) => {
    e.preventDefault();
    if(conPassword === password) {
      if(!(password.length < 8 && password.length >= 12)) {
        const res = await userVerification(email, otp);
        if(res) {
          showSuccessToast("Registration Successfull!");
          navigate("/login");
        }
      } else {
        showErrorToast('Password should be 8-12 characters long!');
      setPassword("");
      setConPassword("");
      }
    } else {
      showErrorToast('Password doesnt match!');
      setPassword("");
      setConPassword("");
    }
  }
  return (
<section className="login">
      <div className="login-container">
        <h1>Memorize with Care💡</h1>
        <form autoComplete="false" onSubmit={e => {submitHandler(e)}}>
          <div className="form-group">
          <label htmlFor="email">Email : </label>
            <input
              type="email"
              className="login-group-input"
              placeholder="Enter your email"
              required
              onChange={e => {setEmail(e.target.value)}}
              value={email}
            />
                <label htmlFor="password">Password : </label>
            <input
              type="password"
              className="login-group-input"
              placeholder="Enter your New Password "
              required
              onChange={e => {setPassword(e.target.value)}}
            />
                <label htmlFor="password">Confirm Password : </label>
            <input
              type="password"
              className="login-group-input"
              placeholder="Confirm New Password"
              required
              onChange={e => {setConPassword(e.target.value)}}
            />
            <br /><br />
              <input
              type="text"
              className="login-group-input-otp"
              placeholder="Enter OTP"
              required
               onChange={e => {setOtp(e.target.value)}}
            />
            <button type="button" className='otp-btn' onClick={e => {getOTP(e)}}>Get OTP</button>
            <br /><br />
            <div className="login-btn">
              <button type="submit" className="login-sign-in">
                Change Password
              </button>
            </div>
          </div>
        </form>
        <div className="remember-me-forget-pass">
          <Link to={"/login"}><span className="forgot">Remember Password? </span><span className="register"> Login</span></Link>
          <Link to={"/register"}>
            <span className="register"> Register</span></Link>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword