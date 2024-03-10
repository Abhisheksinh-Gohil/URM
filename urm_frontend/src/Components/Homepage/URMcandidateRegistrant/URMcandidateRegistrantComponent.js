import React, { useState } from 'react';
import './URMcandidateRegistrantComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function URMcandidateRegistrantComponent() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [location, setLocation] = useState('');
    const [researchExp, setResearchExp] = useState('');
    const [nameOfPublication, setNameOfPublication] = useState('');
    const [jobPref, setJobPref] = useState('');
    const [latestEducation, setLatestEducation] = useState('');
    const [studyField, setStudyField] = useState('');
    const [resume, setResume] = useState(null);
    const [cv, setCv] = useState(null);
   
    
    
    
      // const handleFileChange = (e) => {
      //   const { name, files } = e.target;
      //   setFormData({
      //     ...formData,
      //     [name]: files[0],
      //   });
      // };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create a FormData object to send files along with other data
        const data = {firstName, 
          lastName, 
          email,
          password, // Replace with an appropriate password field
          role: 'URMCANDIDATE',
          gender,
          city: address, // Assuming address is the city
         ethnicity,
          locPref: location,
          age: dateOfBirth, // Assuming dateOfBirth is the age
          phonenumber: phone,
          researchExp, // Replace with an appropriate field for researchExp
          nameOfPublication, // Replace with an appropriate field for nameOfPublication
          jobPref, // Replace with an appropriate field for jobPref
          latestEducation, // Replace with an appropriate field for latestEducation
          studyField, // Replace with an appropriate field for studyField
          resumeLocation: resume,
          cv,};

        
    
        // API call to register the URM candidate
        axios.post('https://aag0621.uta.cloud/wdmBackend/Mailer/register.php', data)
          .then(response => {
            if(response.data.message === "Registration successful.")  {
              navigate("/login");}
          console.log(response.data);            
            // Handle success, e.g., show a success message to the user
          })
          .catch(error => {
            console.error('Error registering URM candidate:', error);
            // Handle error, e.g., show an error message to the user
          });
      };
  return (
    <div className='homepage'>
      <div className='img-div'>
        <div className='URMcandidate-Register'></div>
        <div class="container">
                <div class="title">URM Registrant</div>
                <div>
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
                            <span class="details">Age</span>
                            <input type="number" placeholder="Enter Age" required onChange={(e)=> {setDateOfBirth(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Address</span>
                            <input type="address" placeholder="Enter your address" required onChange={(e)=> {setAddress(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Phone</span>
                            <input type="tel" placeholder="Enter your mobile number" required onChange={(e)=> {setPhone(e.target.value);}}/>
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
                            <span class="details">Gender</span>
                            <select className="urm-input-box" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option className="urm-input-box" value="female">Female</option>
                                <option className="urm-input-box" value="male">Male</option>
                            </select>
                        </div>
                        <div class="input-box">
                            <span class="details">Ethnicity</span>
                            <input type="ethnicity" placeholder="Enter your ethnicity" required onChange={(e)=> {setEthnicity(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Preferred Location</span>
                            <input type="Location" placeholder="Enter your Location Preferences" required onChange={(e)=> {setLocation(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Research Experience</span>
                            <input type="email" placeholder="Enter your Research Experience" required onChange={(e)=> {setResearchExp(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Publications</span>
                            <input type="email" placeholder="Enter your name of publications" required onChange={(e)=> {setNameOfPublication(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Job Preferences</span>
                            <input type="email" placeholder="Enter your job preferences" required onChange={(e)=> {setJobPref(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Education</span>
                            <input type="email" placeholder="Enter your latest education" required onChange={(e)=> {setLatestEducation(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Field</span>
                            <input type="email" placeholder="Enter your field of study" required onChange={(e)=> {setStudyField(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Upload resume</span>
                            <input type="file" id="resume" name="resume" required onChange={(e)=> {setResume(e.target.value);}}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Upload CV</span>
                            <input type="file" id="cv" name="cv" required onChange={(e)=> {setCv(e.target.value);}}/>
                        </div>
                        <div class="button">
                            <input type="submit" value="Submit" onClick={handleSubmit} class="button"/>
                        </div>

                    </div>
                </div>
            </div>
            
      </div>
    </div>
  )
}

// import React, { useState } from 'react';
// import './URMcandidateRegistrantComponent.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function URMcandidateRegistrantComponent() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//       fullName: '',
//       dateOfBirth: '',
//       address: '',
//       phone: '',
//       email: '',
//       gender: '',
//       ethnicity: '',
//       location: '',
//       resume: null,
//       cv: null,
//     });
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       };
    
//       const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         setFormData({
//           ...formData,
//           [name]: files[0],
//         });
//       };
    
//       const handleSubmit = (e) => {
//         e.preventDefault();
    
//         // Create a FormData object to send files along with other data
//         const data = new FormData();
//         data.append('firstName', formData.fullName.split(' ')[0]);
//         data.append('lastName', formData.fullName.split(' ')[1]);
//         data.append('email', formData.email);
//         data.append('password', '12345'); // Replace with an appropriate password field
//         data.append('role', 'URMCANDIDATE');
//         data.append('gender', formData.gender);
//         data.append('city', formData.address); // Assuming address is the city
//         data.append('ethnicity', formData.ethnicity);
//         data.append('locPref', formData.location);
//         data.append('age', formData.dateOfBirth); // Assuming dateOfBirth is the age
//         data.append('phonenumber', formData.phone);
//         data.append('researchExp', 'Machine Learning'); // Replace with an appropriate field for researchExp
//         data.append('nameOfPublication', 'Automation'); // Replace with an appropriate field for nameOfPublication
//         data.append('jobPref', 'ML Intern'); // Replace with an appropriate field for jobPref
//         data.append('latestEducation', 'PHD'); // Replace with an appropriate field for latestEducation
//         data.append('studyField', 'SE'); // Replace with an appropriate field for studyField
//         data.append('resumeLocation', formData.resume);
//         data.append('cv', formData.cv);
    
//         // API call to register the URM candidate
//         axios.post('https://aag0621.uta.cloud/wdmBackend/Mailer/register.php', data)
//           .then(response => {
//             console.log(response.data);
//             // Handle success, e.g., show a success message to the user
//           })
//           .catch(error => {
//             console.error('Error registering URM candidate:', error);
//             // Handle error, e.g., show an error message to the user
//           });
//       };
//   return (
//     <div className='homepage'>
//       <div className='img-div'>
//         <div className='URMcandidate-Register'></div>
//         <div class="container">
//                 <div class="title">URM Registrant</div>
//                 <div>
//                     <div class="user-details">
//                         <div class="input-box">
//                             <div class="details">First Name</div>
//                             <input type="text" name="firstName" placeholder="Enter your name" onChange={handleChange} required/>
//                         </div>
//                         <div class="input-box">
//                             <div class="details">Last Name</div>
//                             <input type="text" name="lastName" placeholder="Enter your name" onChange={handleChange} required/>
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
//                             <span class="details">Gender</span>
//                             <input type="gender" placeholder="Enter your Gender" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Ethnicity</span>
//                             <input type="ethnicity" placeholder="Enter your ethnicity" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Preferred Location</span>
//                             <input type="Location" placeholder="Enter your Location Preferences" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Upload resume</span>
//                             <input type="file" id="resume" name="resume" required/>
//                         </div>
//                         <div class="input-box">
//                             <span class="details">Upload CV</span>
//                             <input type="file" id="cv" name="cv" required/>
//                         </div>
//                         <div class="button">
//                             <input type="submit" value="Submit" onClick={handleSubmit} class="button"/>
//                         </div>

//                     </div>
//                 </div>
//             </div>
            
//       </div>
//     </div>
//   )
// }
