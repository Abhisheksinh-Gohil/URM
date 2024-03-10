import axios from 'axios';
import React, { useState } from 'react'
import NewChatModal from '../NewChatModal/NewChatModal'
import './Card.css'
import moment from 'moment'

export default function Card(props) {
  const [openChat, setOpenChat] = useState(false);
  const handleClose = () => {
    setOpenChat(false);
  }
  const approveJob = () => {
    axios.post('https://aag0621.uta.cloud/wdmBackend/deiOnApproval.php', { jobPostId: props.jobPostId, email: JSON.parse(localStorage.getItem('userData')).email }).then((res) => {
      if (res.data.message === "Approved the Job post") {
        console.log("ressponesse: ", res.data);
        window.location.reload();
      }
    })
  }
  const applyToJob = () => {
    axios.post('https://aag0621.uta.cloud/wdmBackend/applyToJobPost.php', { jobPostId: props.jobPostId, email: JSON.parse(localStorage.getItem('userData')).email }).then((res) => {
      if (res.data.message === "Succesfully Applied For Selected Job Post") {
        console.log("ressponesse: ", res.data);
        window.location.reload();
      }
    })
  }

  let dateString = moment(props.date).format('MMM DD YYYY');
  return (
    <div>
      <div className='card'>
        <div className='card-items'>
          <b>{props.title}</b>
          <br />
          <div className='desc-div'>{props.description}</div>
          <div className='card-date'>
            {props.date && <i>Posted on: {dateString}</i>}
            {props.isApprove && <button className='approve-btn' onClick={() => approveJob(props.jobPostId)}>Approve</button>}
            {props.apply && <button className='approve-btn' onClick={() => applyToJob(props.jobPostId)}>Apply</button>}
            {props.message && <button className='approve-btn' onClick={() => setOpenChat(true)}>Message</button>}
            {openChat && <NewChatModal show={true} handleClose={handleClose} isOpenChatConvo={true} secondMail={props.mailTo} />}
          </div>
        </div>
      </div>
    </div>
  )
}
