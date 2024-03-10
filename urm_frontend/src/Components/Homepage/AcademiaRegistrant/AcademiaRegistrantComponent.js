import React, {useState} from 'react';
import './AcademiaRegistrantComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AcademiaRegistrantComponent() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [logoLocation, setLogoLocation] = useState('');
    const [research, setResearch] = useState('');
    const [aboutUs, setAboutUs] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [courses, setCourses] = useState('');
    const [facultyResearchWork, setFacultyResearchWork] = useState('');
    const [facultyEmailId, setFacultyEmailId] = useState('');
   

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName, 
            lastName, 
            email,
            password, // Replace with an appropriate password field
            role: 'Academia',
            phonenumber: phone,
            logoLocation,
            research,
            aboutUs,
            facultyName,
            courses,
            facultyResearchWork,
            facultyEmailId
        };


        axios.post('https://aag0621.uta.cloud/wdmBackend/Mailer/register.php', data)
          .then(response => {
            if(response.data.message === "Registration successful.")  {
                navigate("/login");}
            console.log(response.data);
            // Handle success, e.g., show a success message to the user
          })
          .catch(error => {
            console.error('Error registering Academia:', error);
            // Handle error, e.g., show an error message to the user
          });
      };



  return (
    <div className='homepage'>
      <div className='img-div'>
        <div className="container">
                <div className="title">Academia Registrant</div>       
                <form>
                    <div className="user-details">
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
                            <span class="details">Logo Location</span>
                            <input type="text" placeholder="Enter your logo location" required onChange={(e)=> {setLogoLocation(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Research</span>
                            <input type="text" placeholder="Enter your research" required onChange={(e)=> {setResearch(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">About Us</span>
                            <input type="text" placeholder="Enter your about us" required onChange={(e)=> {setAboutUs(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Faculty Name</span>
                            <input type="text" placeholder="Enter your faculty name" required onChange={(e)=> {setFacultyName(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Courses</span>
                            <input type="text" placeholder="Enter your courses" required onChange={(e)=> {setCourses(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Faculty Research Work</span>
                            <input type="text" placeholder="Enter your faculty research work" required onChange={(e)=> {setFacultyResearchWork(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Faculty Email Id</span>
                            <input type="text" placeholder="Enter your faculty email id" required onChange={(e)=> {setFacultyEmailId(e.target.value);}}/>
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
