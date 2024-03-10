import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './DEIofficerRegistrantComponent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function DEIofficerRegistrantComponent() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [academiaemail, setAcademiaEmail] = useState('');
    const [initiative, setInitiative] = useState('');
    const [goal, setGoal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName, 
            lastName, 
            email,
            password, // Replace with an appropriate password field
            role: 'DEI OFFICER',
            phonenumber: phone,
            academiaEmail: academiaemail,
            initiative,
            goal
                    
        };
        axios.post('https://aag0621.uta.cloud/wdmBackend/Mailer/register.php', data)
        .then(response => {
          if(response.data.message === "Registration successful.")  {
              navigate("/login");}
          console.log(response.data);
          // Handle success, e.g., show a success message to the user
        })
        .catch(error => {
          console.error('Error registering DEI Officer:', error);
          // Handle error, e.g., show an error message to the user
        });
    };


  return (
    <div className='homepage'>
      <div className='img-div'>
        <div className='DEIofficer-Register'></div>
        <div class="container">
                <div class="title">DEI Officer Registrant</div>
                <form action="#">
                    <div class="user-details">
                    <div class="input-box">
                            <div class="details">First Name</div>
                            <input type="text" name="firstName" placeholder="Enter your name" required onChange={(e)=> {setFirstName(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <div class="details">Last Name</div>
                            <input type="text" name="lastName" placeholder="Enter your name" required onChange={(e)=> {setLastName(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Email</span>
                            <input type="email" placeholder="Enter your email address" required onChange={(e)=> {setEmail(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Password</span>
                            <input type="email" placeholder="Enter your password" required onChange={(e)=> {setPassword(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Phone</span>
                            <input type="tel" placeholder="Enter your mobile number" required onChange={(e)=> {setPhone(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Academia Email</span>
                            <input type="email" placeholder="Enter your Academia Email" required onChange={(e)=> {setAcademiaEmail(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Initiative</span>
                            <input type="text" placeholder="Enter your Initiative" required onChange={(e)=> {setInitiative(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Goal</span>
                            <input type="text" placeholder="Enter your Goal" required onChange={(e)=> {setGoal(e.target.value);}}/>
                        </div>
                        <div class="button">
                            <input type="submit" value="Submit" onClick={handleSubmit} class="button"/>
                        </div>

                    </div>
                </form>
            </div>
      </div>
    </div>
  )
}
