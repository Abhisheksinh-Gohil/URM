import React from 'react';
import './ResetPasswordComponent.css';

export default function ResetPasswordComponent() {
  return (
    <div className='homepage'>
      <div className='img-div'>
        <div class="form-container">
         <form action="#" method="POST" class="form-wrap">
            <div class="form-box">
            <h2>Forgot Password</h2>
              <input type='email' id='email' placeholder='Enter your Email Address'/>
            </div>
            <div class="form-submit">
            <button type="submit" className="btn">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
