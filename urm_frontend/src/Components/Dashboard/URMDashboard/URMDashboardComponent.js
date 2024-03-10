import React, { useEffect, useState } from 'react'
import './URMDashboardComponent.css'
import Card from '../../Card/Card'
import TableCard from '../../TableCard/TableCard'
import ChatsCard from '../../ChatsCard/ChatsCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function URMDashboardComponent() {
  const navigate = useNavigate();
  const [obj, setObj] = useState([{}]);
  const [appData, setAppData] = useState([{}]);
  const [chatData, setChatData] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [email, setEmail] = useState(userData.email);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [manageProfile, setManageProfile] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [password, setPassword] = useState(userData.password);
  const [phonenumber, setPhonenumber] = useState(userData.phonenumber);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updated, setUpdated] = useState(false);


  const getProfileDetails = () => {
    // axios.post("https://aag0621.uta.cloud/wdmBackend/urmDetails.php", { email: userData['email'] }).then((res) => {
    //   setUserData(res.data[0]);
    //   localStorage.setItem('userData', JSON.stringify(res.data[0]));
    // }).catch((err) => {
    //   console.log("getDetailsError: ", err);
    // })
  }

  const handleManageProfile = () => {
    setManageProfile(true);
    getProfileDetails();
  }

  const updateProfile = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/urmCandidateUpdateProfile.php", { email, firstName, lastName, phonenumber, password }).then((res) => {
      console.log("updated: ", res.data);
      if (res.data.message === "Updated Successfully") {
        let tempUserData = JSON.parse(localStorage.getItem("userData"))
        tempUserData.email = email;
        tempUserData.firstName = firstName;
        tempUserData.lastName = lastName;
        tempUserData.phonenumber = phonenumber;
        tempUserData.password = password;
        localStorage.setItem('userData', JSON.stringify(tempUserData));
        setManageProfile(false);
        setUpdateMessage(res.data.message);
        setUpdated(!updated);
        getProfileDetails();
      }
    })
  }

  const getAllAppliedJobs = () => {
    axios.post('https://aag0621.uta.cloud/wdmBackend/urmCandidateAppliedJobPosts.php', {email})
      .then(response => {
        setAppData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching applied job posts:', error);
      });
  }

  const getChatList = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/getAllChatList.php", {email}).then((res)=>{
      setChatData(res.data);
      console.log("chats: ", res.data);
    })
  }


  const getAllJobs = () => {
    axios.post('https://aag0621.uta.cloud/wdmBackend/candidateNotAppliedJob.php', {
      email,
    }).then(response => {
        setObj(response.data);
      })
      .catch(error => {
        console.error('Error fetching all job posts:', error);
      });
  }

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
    if (isLoggedIn === 'false' || isLoggedIn === null) {
      navigate('/login');
    }
    else {
      getAllAppliedJobs();
      getAllJobs();
      getChatList();
    }
  }, []);

  return (
    <div className='body'>
      <div className='postings'>
        Job Postings: 
      </div>
      <div className='postings'>
        {obj.map((arr, index) => {
            return <Card 
            title={arr.title}
            description={arr.description}
            date= {arr.datePosted}
            apply={true}
            jobPostId={arr.jobPostId}
            />
        })
        }
      </div>
      <div className='table-div'>
        {appData && <TableCard title={"Your Applications: "} data={appData}/>}
      </div>
      <div className='table-div'>
        <ChatsCard data={chatData}/>
      </div>
      {manageProfile ?
        <div className='table-div'>
          <div className='profile-div'>
            <h3>Update Profile</h3>
            <div>
              <label>Email</label>
              <input type='email' placeholder='Enter email' disabled value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label>Firstname</label>
              <input type='text' placeholder='Enter firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            </div>
            <div>
              <label>Lastname</label>
              <input type='text' placeholder='Enter lastname' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            </div>

            <div>
              <label>Password</label>
              <input type='text' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            
            <div>
              <label>Phone number</label>
              <input type='number' placeholder='Enter phone number' value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}></input>
            </div>
            
            <div>
              <button className='btn' onClick={updateProfile}>Update</button>
              <button className='btn' onClick={() => setManageProfile(false)}>Cancel</button>
            </div>
          </div>
        </div>
        :
        <div className='table-div'>
          <button className='btn' onClick={handleManageProfile}>Manage Profile</button>
        </div>}
      {updated && <div className='update-message'>{updateMessage}</div>}

    </div>
  )
}
