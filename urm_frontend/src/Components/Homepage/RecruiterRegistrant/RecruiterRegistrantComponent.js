import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './RecruiterRegistrantComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function RecruiterRegistrantComponent() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [academiaEmail, setAcademiaEmail] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(firstName) {
            if(lastName) {
                if(email) {
                    if((/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g).test(email)) {
                        if(password.length >= 6) {
                            if(phone.length === 9) {
                                if(academiaEmail) {
                                    if((/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g).test(academiaEmail)) {
                                        const data = {
                                            firstName, 
                                            lastName, 
                                            email,
                                            password,
                                            role: 'Recruiter',
                                            phonenumber: phone,
                                            academiaEmail
                                                    
                                        };
                                
                                        axios.post('https://aag0621.uta.cloud/wdmBackend/Mailer/register.php', data)
                                          .then(response => {
                                            if(response.data.message === "Registration successful.")  {
                                                navigate("/login");}
                                            console.log(response.data);
                                            // Handle success, e.g., show a success message to the user
                                          })
                                          .catch(error => {
                                            console.error('Error registering Recruiter:', error);
                                            // Handle error, e.g., show an error message to the user
                                          });
                                    }
                                    else {
                                        setError("Enter valid academia email");
                                        setShowError(true);
                                    }
                                }
                                else {
                                    setError("Enter Academia Email");
                                    setShowError(true);
                                }
                            }
                            else {
                                setError("Phone should be 10 digits");
                                setShowError(true);
                            }
                        }
                        else {
                            setError("Password should be 6 characters");
                            setShowError(true);
                        }
                    }
                    else {
                        setError("Enter valid email");
                        setShowError(true);
                    }
                }
                else {
                    setError("Enter Email");
                    setShowError(true);
                }
            }
            else {
                setError("Enter Lastname");
                setShowError(true);
            }
        }
        else {
            setError("Enter Firstname");
            setShowError(true);
        }

       
      };
  return (
    <div className='homepage'>
      <div className='img-div'>
        <div className='Recruiter-Register'></div>
        <div class="container">
                <div class="title">Recruiter Registrant</div>
                <form action="#">
                    <div class="user-details">
                        <div class="input-box">
                            <div class="details">First Name</div>
                            <input type="text" name="firstName" placeholder="Enter your name" required onChange={(e)=> {setFirstName(e.target.value); setShowError(false)}}/>
                        </div>
                        <div class="input-box">
                            <div class="details">Last Name</div>
                            <input type="text" name="lastName" placeholder="Enter your name" required onChange={(e)=> {setLastName(e.target.value); setShowError(false)}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Email</span>
                            <input type="email" placeholder="Enter your email address" required onChange={(e)=> {setEmail(e.target.value); setShowError(false)}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Password</span>
                            <input type="password" placeholder="Enter your password" required onChange={(e)=> {setPassword(e.target.value); setShowError(false)}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Phone</span>
                            <input type="tel" placeholder="Enter your mobile number" required onChange={(e)=> {setPhone(e.target.value); setShowError(false)}}/>
                        </div>
                        
                        <div class="input-box">
                            <span class="details">Academia Email</span>
                            <input type="email" placeholder="Enter your Academia Email" required onChange={(e)=> {setAcademiaEmail(e.target.value); setShowError(false)}}/>
                        </div>
                        
                        <div>
                        {showError && <div className='error'>{error}</div>}
                        </div>

                        <div class="button" onClick={handleSubmit}>
                            <input type="submit" value="Submit" class="button"/>
                        </div>

                    </div>
                </form>
            </div>
      </div>
    </div>
  )
}

// import React from 'react';
// import { Link } from 'react-router-dom'
// import './RecruiterRegistrantComponent.css';
// import axios from 'axios';

// export default function RecruiterRegistrantComponent() {
//   return (
//     <div className='homepage'>
//       <div className='img-div'>
//         <div className='Recruiter-Register'></div>
//         <div class="container">
//                 <div class="title">Recruiter Registrant</div>
//                 <form action="#">
//                     <div class="user-details">
//                         <div class="input-box">
//                             <span class="details">Full Name</span>
//                             <input type="text" placeholder="Enter your name" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Date of Birth</span>
//                             <input type="date" placeholder="MM/DD/YYYY" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Address</span>
//                             <input type="address" placeholder="Enter your address" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Phone</span>
//                             <input type="tel" placeholder="Enter your mobile number" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Email</span>
//                             <input type="email" placeholder="Enter your email address" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Preferrences</span>
//                             <input type="Preference" placeholder="Enter your Preferences" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Agency Name</span>
//                             <input type="text" placeholder="Enter your Agency Name" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Client Name</span>
//                             <input type="text" placeholder="Enter your Client Name" required/>
//                         </div>
//                         <div class="button">
//                             <input type="submit" value="Submit" class="button"/>
//                         </div>

//                     </div>
//                 </form>
//             </div>
//       </div>
//     </div>
//   )
// }
