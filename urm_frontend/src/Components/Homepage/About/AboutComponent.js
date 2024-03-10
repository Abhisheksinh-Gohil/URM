import React from 'react'
import './AboutComponent.css'

export default function AboutComponent() {
  return (
    <div className='homepage'>
      <div className='about-img-div'>
        <div className='about-text'>
        Welcome to URM Application, a revolutionary platform dedicated to fostering diversity, equity, and inclusion in academia. Our mission is to bridge the representation gap by connecting underrepresented minority (URM) candidates with academic institutions and organizations seeking to enhance diversity within their ranks. Through this innovative website, we aim to empower academics, recruiters, and DEI officers with the tools they need to identify, engage, and support talented URM candidates for PhD studies, postdoc positions, and faculty roles.
        </div>
        <img src='about.png' alt='about' width={800}></img>
      </div>
    </div>
  )
}
