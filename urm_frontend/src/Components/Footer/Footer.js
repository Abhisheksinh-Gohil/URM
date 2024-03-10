import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='footer-links'>
            <img src='facebookLogo.png' className='icons' width={50}></img>
            <img src='instagramLogo.png' className='icons' width={50}></img>
            <img src='linkedinLogo.png' className='icons' width={50}></img>
            <img src='twitterLogo.png' className='icons' width={50}></img>
        </div>
        <div className='footer-links'>
            <Link className='footer-links-title' to='/homepage'>HOME</Link>
            <Link className='footer-links-title' to='/about'>ABOUT</Link>
            <Link className='footer-links-title' to='/services'>SERVICES</Link>
            <Link className='footer-links-title' to='/contact'>CONTACT</Link>
            <Link className='footer-links-title' to='/login'>LOGIN</Link>
            <Link className='footer-links-title' to='/register'>REGISTER</Link>
        </div>
        <div className='footer-links'>
            <div>
                <br/>
                Developed and maintained by Group 3
            </div>
        </div>
        <div className='footer-links'>
            <div>
                <br/>
                All rights reserved under UTA development policy
            </div>
        </div>
      </div>
  )
}
