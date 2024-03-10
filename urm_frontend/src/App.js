import './App.css';
import HomepageComponent from './Components/Homepage/HomepageComponent';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import HeaderComponent from './Components/Header/HeaderComponent';
import Footer from './Components/Footer/Footer';
import AboutComponent from './Components/Homepage/About/AboutComponent';
import ContactUsComponent from './Components/Homepage/ContactUs/ContactUsComponent';
import ServicesComponent from './Components/Homepage/Services/ServicesComponent';
import URMDashboardComponent from './Components/Dashboard/URMDashboard/URMDashboardComponent';
import DEIDashboardComponent from './Components/Dashboard/DEIDashboard/DEIDashboardComponent';
import AcademiaDashboardComponent from './Components/Dashboard/AcademiaDashboard/AcademiaDashboardComponent';
import RecruiterDashboardComponent from './Components/Dashboard/RecruiterDashboard/RecruiterDashboardComponent';
import AdminDashboardComponent from './Components/Dashboard/AdminDashboard/AdminDashboardComponent';
import RegisterComponent from './Components/Homepage/Register/RegisterComponent';
import LoginComponent from './Components/Homepage/Login/LoginComponent';
import ResetPasswordComponent from './Components/Homepage/ResetPassword/ResetPasswordComponent';
import BlogComponent from './Components/Homepage/Blog/BlogComponent';
import DEIofficerRegistrantComponent from './Components/Homepage/DEIofficerRegistrant/DEIofficerRegistrantComponent';
import URMcandidateRegistrantComponent from './Components/Homepage/URMcandidateRegistrant/URMcandidateRegistrantComponent';
import AcademiaRegistrantComponent from './Components/Homepage/AcademiaRegistrant/AcademiaRegistrantComponent';
import RecruiterRegistrantComponent from './Components/Homepage/RecruiterRegistrant/RecruiterRegistrantComponent';
import { useEffect, useState } from 'react';
import NewChatModal from './Components/NewChatModal/NewChatModal';


function App() {
  const [openChat, setOpenChat] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [feedback, setFeedback] = useState(false);
  const handleClose = () => {
    setOpenChat(false);
    setFeedback(false);
    window.location.reload();
  }

  useEffect(()=> {
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
  });

  return (
    <div className="App" style={{overflow: openChat?'hidden': 'auto'}}>
      <Router>
      <HeaderComponent/>
        {isLoggedIn === "true" &&
          <div>
          <button className='chat-btn' style={{marginRight: '120px'}} onClick={()=>setFeedback(true)}>
          FEEDBACK
          </button>
          <button className='chat-btn' onClick={()=>setOpenChat(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
            </svg>
          </button>
        </div>}
        {openChat && <NewChatModal show={true} handleClose={handleClose}/>}
        {feedback && <NewChatModal
              show={true}
              handleClose={handleClose}
              isOpenChatConvo={true}
              secondMail='admin@gmail.com'
            />}
        <Routes>
          <Route
            path="/"
            element={ <Navigate to='/homepage' />}
          />
          <Route 
            path="/homepage" 
            element={<HomepageComponent/>}
          />
          <Route 
            path="/about" 
            element={<AboutComponent/>}
          />
          <Route 
            path="/contact" 
            element={<ContactUsComponent/>}
          />
          <Route 
            path="/services" 
            element={<ServicesComponent/>}
          />
          <Route 
            path="/urmdashboard" 
            element={<URMDashboardComponent/>}
          />
          <Route 
            path="/deidashboard" 
            element={<DEIDashboardComponent/>}
          />
          <Route 
            path="/academiadashboard" 
            element={<AcademiaDashboardComponent/>}
          />
          <Route 
            path="/recruiterdashboard" 
            element={<RecruiterDashboardComponent/>}
          />
          <Route 
            path="/admindashboard" 
            element={<AdminDashboardComponent/>}
          />
          <Route
          path="/blog"
          element={<BlogComponent/>}
          />
          <Route 
            path="/login" 
            element={<LoginComponent/>}
          />
          <Route 
            path="/resetpassword" 
            element={<ResetPasswordComponent/>}
          />
          <Route
          path='/register'
          element={<RegisterComponent/>}/>
          <Route
          path='/deiofficerregistrant'
          element={<DEIofficerRegistrantComponent/>}
          />
          <Route
          path='/academiaregistrant'
          element={<AcademiaRegistrantComponent/>}
          />
          <Route
          path='/urmcandidateregistrant'
          element={<URMcandidateRegistrantComponent/>}
          />
           <Route
          path='/recruiterregistrant'
          element={<RecruiterRegistrantComponent/>}
          />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;