import React, { useEffect, useState } from 'react'
import TableCard from '../../TableCard/TableCard'
import Card from '../../Card/Card'
import ChatsCard from '../../ChatsCard/ChatsCard'
import './AcademiaDashboardComponent.css'
import axios from 'axios'

export default function AcademiaDashboardComponent() {

  const [obj, setObj] = useState([{}]);
  const [appData, setAppData] = useState([]);
  const [chatData, setChatData] = useState([]);

  const [manageProfile, setManageProfile] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [email, setEmail] = useState(userData.email);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [password, setPassword] = useState(userData.password);
  const [aboutUs, setAboutUs] = useState(userData.aboutUs);
  const [phonenumber, setPhonenumber] = useState(userData.phonenumber);
  const [logoLocation, setLogoLocation] = useState(userData.logoLocation);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updated, setUpdated] = useState(false);

  const [showAddPost, setShowAddPost] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [position, setPosition] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const [added, setAdded] = useState(false);

  const [candidates, setCandidates] = useState([{}]);

  const [addPostError, setAddPostError] = useState('');
  const [showAddPostError, setShowAddPostError] = useState(false);

  const getProfileDetails = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/academiaDetails.php", { email: userData['email'] }).then((res) => {
      setUserData(res.data[0]);
      localStorage.setItem('userData', JSON.stringify(res.data[0]));
    }).catch((err) => {
      console.log("getDetailsError: ", err);
    })
  }

  const handleManageProfile = () => {
    setManageProfile(true);
    getProfileDetails();
  }

  const handleAddPost = () => {
    if (title) {
      if (description) {
        if (location) {
          if (position) {
            axios.post("https://aag0621.uta.cloud/wdmBackend/academiaAddJobPosting.php", {
              email: userData.email,
              title,
              description,
              position,
              location
            }).then((res) => {
              if (res?.data?.message === "Job added successfully.") {
                console.log(res);
                setShowAddPost(false);
                setAddMessage(res.data.message);
                setAdded(!added);
              }
            }).catch((err) => {
              console.log(err);
            });
          }
          else {
            setAddPostError("Enter position");
            setShowAddPostError(true);
          }
        }
        else {
          setAddPostError("Enter location");
          setShowAddPostError(true);
        }
      }
      else {
        setAddPostError("Enter description");
        setShowAddPostError(true);
      }
    }
    else {
      setAddPostError("Enter title");
      setShowAddPostError(true);
    }
  }

  const updateProfile = () => {
    axios.put("https://aag0621.uta.cloud/wdmBackend/academiaProfileEdit.php", { email, firstName, phonenumber, password, aboutUs: "organisation" }).then((res) => {
      console.log("updated: ", res.data);
      if (res.data.message === "Record updated successfully.") {
        setManageProfile(false);
        setUpdateMessage(res.data.message);
        setUpdated(!updated);
        getProfileDetails();
      }
    })
  }

  const getAllJobPosts = () => {
    axios.post('https://aag0621.uta.cloud/wdmBackend/academiaJobPost.php', {
      email
    }).then(response => {
      console.log(response.data);
      setObj(response.data)
    }).catch(error => {
      console.error('Error fetching job posts:', error);
    });
  }

  const getAllURMCandidates = () => {
    axios.get("https://aag0621.uta.cloud/wdmBackend/getAllUrmCandidates.php").then((res) => {
      setCandidates(res.data);
    })
  }

  const getChatList = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/getAllChatList.php", { email }).then((res) => {
      setChatData(res.data);
      console.log("chats: ", res.data);
    })
  }

  useEffect(() => {
    getAllJobPosts();
    axios.post('https://aag0621.uta.cloud/wdmBackend/academiaResearchArea.php', {
      email: 'uta@mavs.uta.edu',
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching research area:', error);
      });


  }, []);

  useEffect(() => {
    getChatList();
    getAllURMCandidates();
  }, []);

  useEffect(() => {
    setAppData([
      {
        "Application ID": '23421',
        "Status": 'pending'
      },
      {
        "Application ID": '23421',
        "Status": 'pending'
      },
      {
        "Application ID": '23421',
        "Status": 'pending'
      },
      {
        "Application ID": '23421',
        "Status": 'pending'
      },
      {
        "Application ID": '23421',
        "Status": 'pending'
      },
      {
        "Application ID": '23421',
        "Status": 'pending'
      }
    ])
  })

  useEffect(() => {
    setTimeout(() => {
      setUpdated(!updated);
      setAdded(!added);
    }, 3000);
  })

  return (
    <div className='body'>
      <div className='postings'>
        URM Candidates:
      </div>
      <div className='postings'>
        {candidates.length > 0 && candidates.map((candidate, index) => {
          return <Card
            title={`${candidate.firstName} ${candidate.lastName}`}
            description={candidate.email}
            message={true}
            mailTo={candidate.email}
          />
        })
        }
      </div>
      <div className='table-div'>
        {obj && <TableCard title={"Previous Job Postings"} data={obj} />}
      </div>
      <div className='table-div'>
        {/* <TableCard title={"Applications Received"} data={appData}/> */}
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


      {showAddPost ?
        <div className='table-div'>
          <div className='profile-div'>
            <h3>Add posting</h3>
            <div>
              <label>Title</label>
              <input required type='text' placeholder='Enter title' onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
              <label>Description</label>
              <input required type='text' placeholder='Enter description' onChange={(e) => setDescription(e.target.value)}></input>
            </div>
            <div>
              <label>Location</label>
              <input required type='text' placeholder='Enter location' onChange={(e) => setLocation(e.target.value)}></input>
            </div>
            <div>
              <label>Position</label>
              <input required type='text' placeholder='Enter location' onChange={(e) => setPosition(e.target.value)}></input>
            </div>
            <div>
              <button className='btn' onClick={handleAddPost}>Add</button>
              <button className='btn' onClick={() => setShowAddPost(false)}>Cancel</button>
            </div>
          </div>
        </div>
        :
        <div className='table-div'>
          <button className='btn' onClick={() => setShowAddPost(true)}>Add a Posting</button>
        </div>}
      {added && <div className='update-message'>{addMessage}</div>}



    </div>
  )
}