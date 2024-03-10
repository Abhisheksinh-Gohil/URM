import React from 'react'
import './ContactUsComponent.css'

export default function ContactUsComponent() {
  return (
    <div className='homepage'>
      <div className='img-div'>
        <div className='contact-text'>
          Always stay
          <br/>
          connected
        </div>
        <div className='contact-form'>
          <input type='text' id='name' placeholder='Name'/>
          <input type='text' id='name' placeholder='Email'/>
          <input type='text' id='name' placeholder='Mobile'/>
          <input type='text' id='name' placeholder='Concern'/>
          <button className='submit-btn'>Submit</button>
        </div>
      </div>
    </div>
  )
}
