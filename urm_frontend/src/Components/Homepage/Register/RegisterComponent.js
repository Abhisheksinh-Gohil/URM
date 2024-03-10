import React, { useState } from 'react'
import './RegisterComponent.css'
import { useNavigate } from 'react-router-dom';

export default function RegisterComponent() {

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const redirectToRegister = () => {
    if(isChecked === false) {
      alert("Select a role then press continue");
    }
    else {
      if(isChecked === "Academia") {
        navigate('/academiaregistrant')
      }
      else if(isChecked === "Recruiter") {
        navigate('/recruiterregistrant')
      }
      else if(isChecked === "DEI officer") {
        navigate('/deiofficerregistrant')
      }
      else if(isChecked === "URM Candidate") {
        navigate('/urmcandidateregistrant')
      }
    }
    
  }

  return (
    <div className='register-body'>
      <div className='register-card'>
        <div className='register-block'>
        <h2>Select a role</h2>
        </div>
        <div className='register-content'>
        <input className='radio-btn' type='radio' value='DEI officer' color='orange' checked={isChecked === 'DEI officer'} onChange={(e)=>setIsChecked(e.target.value)}/><label>DEI officer</label>
        <input className='radio-btn' type='radio' value='Academia' color='black' checked={isChecked === 'Academia'} onChange={(e)=>setIsChecked(e.target.value)}/><label>Academia</label>
        <input className='radio-btn' type='radio' value='URM Candidate' color='black' checked={isChecked === 'URM Candidate'} onChange={(e)=>setIsChecked(e.target.value)}/><label>URM Candidate</label>
        <input className='radio-btn' type='radio' value='Recruiter' color='black' checked={isChecked === 'Recruiter'} onChange={(e)=>setIsChecked(e.target.value)}/><label>Recruiter</label>
      </div>
      <div>
        <button className='register-btn' onClick={redirectToRegister}>Continue</button>
      </div>
      </div>
        </div>
  )
}
