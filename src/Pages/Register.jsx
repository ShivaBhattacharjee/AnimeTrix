import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServerApi } from '../Components/constants';
import { showErrorToast, showSuccessToast } from '../utils/toast';
function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const id = getCookie("id");
    if (id) {
      navigate("/");
    }
  });

  const userSignup = async () => {
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        showErrorToast(error.response.data.error);
        return;
      });
      const res = await axios.post(`${ServerApi}/user/register`, {
        name: name,
        email: email,
        password: password
      })
      return res;
    } catch (err) {
      console.log(err);
      showErrorToast('Something went wrong!');
    }
  }

  const userVerification = async () => {
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        showErrorToast(error.response.data.error);
        return;
      });
      const res = await axios.post(`${ServerApi}/user/verify`, {
        email: email,
        verificationCode: otp
      })
      return res;
    } catch (err) {
      console.log(err);
      showErrorToast('Unable to send otp');
    }
  }


  const getOTP = async (e) => {
    e.preventDefault();
    if (conPassword === password) {
      if (password.length >= 8 && password.length <= 12) {
        const res = await userSignup(name, email, password);
        if (res) {
          showSuccessToast(res.data.message);
        }
      } else {
        showErrorToast( 'Password should be 8-12 characters long!');
        setPassword("");
        setConPassword("");
      }
    } else {
      showErrorToast('Password dont match');
      setPassword("");
      setConPassword("");
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (conPassword === password) {
      if (!(password.length < 8 && password.length >= 12)) {
        const res = await userVerification(email, otp);
        if (res) {
          showSuccessToast('Registration successfull');
          navigate("/login");
        }
      } else {
        showErrorToast('Password should be 8-12 character long');
        setPassword("");
        setConPassword("");
      }
    } else {
      showErrorToast('Password dont match');
      setPassword("");
      setConPassword("");
    }
  }
  return (
    <div className="login">
      <ToastContainer />
      <div className="login-container">
        <h1>Join Us 🤝</h1>
        <form autoComplete="false" onSubmit={e => { getOTP(e) }}>
          <div className="form-group">
            <label htmlFor="email">Username : </label>
            <input
              type="text"
              className="login-group-input"
              placeholder="Username"
              onChange={e => { setName(e.target.value) }}
              required
              autoComplete='off'
            />
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              className="login-group-input"
              placeholder="Email"
              onChange={e => { setEmail(e.target.value) }}
              required
              autoComplete='off'
            />
            <label htmlFor="email">Password : </label>
            <input
              type="password"
              className="login-group-input"
              placeholder="Password"
              onChange={e => { setPassword(e.target.value) }}
              value={password}
              required
              autoComplete='off'
            />
                <label htmlFor="email">Confirm Password : </label>
            <input
              type="password"
              className="login-group-input"
              placeholder="Confirm password"
              onChange={e => { setConPassword(e.target.value) }}
              value={conPassword}
              required
              autoComplete='off'
            />
            <br />
            <input
              type="text"
              className="login-group-input-otp"
              placeholder="OTP"
              onChange={e => { setOtp(e.target.value) }}
            />
            <button type="submit" className="login-register">
              Get OTP
            </button>
            <button type="button" className="login-sign-reg" onClick={e => { submitHandler(e) }}>
              Register
            </button>
          </div>
        </form>
        <div className="login-here">
          <Link to={'/login'}>
            <span className='font'>Already have an account ?</span>
            <span className="register"> Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Register