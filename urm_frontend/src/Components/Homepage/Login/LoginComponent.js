import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginComponent.css';

export default function LoginComponent() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email) {
      if ((/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g).test(email)) {
        if (password.length >= 6) {
          axios.post("https://aag0621.uta.cloud/wdmBackend/login.php", { email, password }).then((res) => {
            if (res) {
              if (res.data.message === "Successful Login") {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(res.data.user));
                setIsLoggedIn(true);
                if (res.data.user.role === "URMCANDIDATE") {
                  navigate("/urmdashboard");
                }
                else
                  if (res.data.user.role === "Academia") {
                    navigate("/academiadashboard");
                  }
                  else
                    if (res.data.user.role === "DEI OFFICER") {
                      navigate("/deidashboard");
                    }
                    else
                      if (res.data.user.role === "Recruiter") {
                        navigate("/recruiterdashboard");
                      }
                      else
                        if (res.data.user.role === "Admin") {
                          navigate("/admindashboard");
                        }
              }
              else {
                console.log("errree:");
                setShowError(true);
                setError(res.data.message);
              }
            }
          }).catch((err) => {
            console.log("Error from Login: ", err);
          })
        }
        else {
          setError("Password mminimum length is 6");
          setShowError(true);
        }
      }
      else {
        setError("Enter valid email");
        setShowError(true);
      }
    }
    else {
      setError("Enter email");
      setShowError(true);
    }

  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData.role === "URMCANDIDATE") {
        navigate("/urmdashboard");
      }
      else
        if (userData.role === "Academia") {
          navigate("/academiadashboard");
        }
        else
          if (userData.role === "Dei Officer") {
            navigate("/deidashboard");
          }
          else
            if (userData.role === "Recruiter") {
              navigate("/recruiterdashboard");
            }
            else
              if (userData.role === "Admin") {
                navigate("/admindashboard");
              }
    }
  })


  return (
    <div className='homepage'>
      <div className='img-div'>
        <div className="wrapper">
          <div className="form-box login">
            <h2>Login</h2>
            <div>
              <input type="email" placeholder='Email' required onChange={(e) => { setEmail(e.target.value); setShowError(false); }} />
              <input type="password" placeholder='Password' required onChange={(e) => { setPassword(e.target.value); setShowError(false); }} />
              {showError && <div className='error'>{error}</div>}
              <div className="forgot-password">
                <Link className='reset-password' to='/resetpassword'>Forgot Password?</Link>
              </div>
              <button type="submit" className="btn" onClick={handleLogin}>Login</button>
              <div className="login-register">
                <p>Not a member? <Link to="/register" className="register-link">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
