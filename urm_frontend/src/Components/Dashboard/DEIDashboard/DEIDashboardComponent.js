import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TableCard from '../../TableCard/TableCard'
import Card from '../../Card/Card'
import ChatsCard from '../../ChatsCard/ChatsCard'
import './DEIDashboardComponent.css'

export default function DEIDashboardComponent() {
  const [obj, setObj] = useState([]);
  const [approvedJobs, setApprovedJobs] = useState([{}]);
  const [chatData, setChatData] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [manageProfile, setManageProfile] = useState(false);
  const [email, setEmail] = useState(userData.email);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [password, setPassword] = useState(userData.password);
  const [phonenumber, setPhonenumber] = useState(userData.phonenumber);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updated, setUpdated] = useState(false);

  const [initiatives, setInitiatives] = useState([]);
  const [goals, setGoals] = useState([]);
  const [addClicked, setAddClicked] = useState(false);
  const [addWhat, setAddWhat] = useState(null);
  const [addValue, setAddValue] = useState(null);

  const getProfileDetails = () => {
    // axios.post("", { email: userData['email'] }).then((res) => {
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

  const getAlreadyApprovedJobs = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/deiOfficerApprovedJobPost.php", {email}).then((res)=> {
      setApprovedJobs(res.data);
    })
  }

  const getAllInitiatives = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/getAllDeiInitiatives.php", { email }).then((res) => {
      setInitiatives(res.data);
    })
  }

  const getAllGoals = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/getAllDeiGoals.php", { email }).then((res) => {
      setGoals(res.data);
    })
  }


  const getChatList = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/getAllChatList.php", { email }).then((res) => {
      setChatData(res.data);
      console.log("chats: ", res.data);
    })
  }

  useEffect(() => {
    getChatList();
    getAllInitiatives();
    getAllGoals();
    getAlreadyApprovedJobs();
  }, []);

  const handleClose = () => {
    setAddClicked(!addClicked);
  }

  const handleAdd = (addType) => {
    if (addType === 'initiative') {
      axios.post("https://aag0621.uta.cloud/wdmBackend/deiAddNewInitiative.php", { email, initiative: addValue }).then((res) => {
        if (res.data.message === "Goal Added Successfully") {
          handleClose();
          getAllInitiatives();
        }
      })
    }
    else if (addType === 'goal') {
      axios.post("https://aag0621.uta.cloud/wdmBackend/deiAddNewGoal.php", { email, goal: addValue }).then((res) => {
        if (res.data.message === "Goal Added Successfully") {
          handleClose();
          getAllGoals();
        }
      })
    }
  }
  
  const updateProfile = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/deiUpdateProfile.php", { email, firstName, lastName, phonenumber, password }).then((res) => {
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

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    // API call to fetch approved job postings
    axios.post('https://aag0621.uta.cloud/wdmBackend/deiOfficerJobpostYetToApprove.php', {email})
      .then(response => {
        setObj(response.data);
      })
      .catch(error => {
        console.error('Error fetching approved job postings:', error);
      });
}, []);

useEffect(()=>{
  getChatList();
}, []);    
    
  return (
    <div className='body'>
      <div className='table-div'>
        {/* <TableCard title={"DEI approved Job Postings:"} data={obj}/> */}
      </div>
      <div className='postings'>
        Recent DEI - focused Initiatives or Events:
      </div>
      <div className='postings'>
        {initiatives && initiatives.map((arr, index) => {
          return <div className='init-card'>
            {arr.initiative}
          </div>
        })
        }
        <button className='add-btn' onClick={() => { setAddClicked(true); setAddWhat('initiative') }}> Add Initiative</button>
      </div>
      <div className='postings'>
        Recent DEI - focused Goals:
      </div>
      <div className='postings'>
        {goals && goals.map((arr, index) => {
          return <div className='init-card'>
            {arr.goal}
          </div>
        })
        }
        <button className='add-btn' onClick={() => { setAddClicked(true); setAddWhat('goal') }}> Add Goal</button>
      </div>

      <div className='postings'>
        Already approved Job Postings:
      </div>
      <div className='postings'>
        {approvedJobs && approvedJobs.map((arr, index) => {
          return <Card
            title={arr.title}
            description={arr.description}
            date={arr.datePosted}
          />
        })
        }
      </div>

      <div className='postings'>
        Approve Job Postings:
      </div>
      <div className='postings'>
        {obj && obj.map((arr, index) => {
          return <Card
            title={arr.title}
            description={arr.description}
            date={arr.datePosted}
            isApprove={true}
            jobPostId={arr.jobPostId}
          />
        })
        }
      </div>

      <div className='table-div'>
        <ChatsCard data={chatData} />
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
      {addClicked &&
        <div className='modal display-block'>
          <section className="modal-main">
            <div className='chat-header'>
              <span className='chat-title'><b>{addWhat === "initiative" ? 'Add Initiative' : 'Add Goal'}</b></span>
              <button className='close-btn' type="button" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
            <input type='text' placeholder={addWhat === "initiative" ? 'Enter Initiative' : 'Enter Goal'} onChange={(e) => setAddValue(e.target.value)} />
            <botton className='send-btn' onClick={() => handleAdd(addWhat)}>ADD</botton>
          </section>
        </div>}
    </div>
  )
}

