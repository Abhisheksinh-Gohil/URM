import React , { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoutModal from '../LogoutModal/LogoutModal';
import './HeaderComponent.css'

export default function HeaderComponent() {
  const navigate = useNavigate();
  const url = window.location.pathname
  const [isDashboardOpen, setIsDashboardOpen] = useState(url.includes("dashboard"))
  const [showLogout, setShowLogout] = useState(false);
  let dashboardTitle = 'URM'
  if(isDashboardOpen) {
    if (url === "/urmdashboard")
      dashboardTitle = 'URM Dashboard'
    else if (url === "/deidashboard")
      dashboardTitle = 'DEI Dashboard'
    else if (url === "/academiadashboard")
      dashboardTitle = 'Academia Dashboard'
    else if (url === "/recruiterdashboard")
      dashboardTitle = 'Recruiter Dashboard'
    else if (url === "/admindashboard")
      dashboardTitle = "Admin Dashboard"
  }

  useEffect(()=> {
    setIsDashboardOpen(url.includes("dashboard"));
    console.log("isDashboardOpen: ", isDashboardOpen);
  })

  const handleLogoutConfirmation = () => {
    setShowLogout(true);
  }

  const handleClose = () => {
    setShowLogout(false);
  }

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    setShowLogout(false);
    navigate("/login");
  }

  return (
    <div>
      <div className='header'>
        <div className='header-left'>
            <div className='header-title'>
                <Link to='/homepage'><img src='logo.png' width={30}/></Link>
                <span className='heading'>{dashboardTitle}</span>
            </div>
        </div>
        {
          !isDashboardOpen ? 
          <div className='header-right'>
            <Link className='header-title' to='/homepage'>HOME</Link>
            <Link className='header-title' to='/about'>ABOUT</Link>
            <Link className='header-title' to='/services'>SERVICES</Link>
            <Link className='header-title' to='/contact'>CONTACT</Link>
            <Link className='header-title' to='/blog'>BLOG</Link>
            {/* <a target="_blank" rel="noreferrer" className='header-title' href='https://kxn5981.uta.cloud/'>BLOG</a> */}
            <Link className='header-title' to='/login'>LOGIN</Link>
          </div>
          :
          <div className='header-right'>
            <div className='header-title'>
            <svg  
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="currentColor" 
            class="bi bi-box-arrow-right" 
            viewBox="0 0 16 16"
            onClick={handleLogoutConfirmation}>
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
            </div>
          </div>
        }
      </div>
      {showLogout && <LogoutModal show={true} handleClose={handleClose} handleLogout={handleLogout}/>}
      </div>
  )
}
