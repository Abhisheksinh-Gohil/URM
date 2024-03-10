import React, { useState } from 'react'
import './ChatsCard.css'
import NewChatModal from '../NewChatModal/NewChatModal';

export default function ChatsCard(props) {
  const data = props.data
  const [openChat, setOpenChat] = useState(false);
  const [email, setEmail] = useState(null);
  const handleClose = () => {
    setOpenChat(!openChat);
    console.log("openchat: ", openChat);
    window.location.reload();
  }

  const handleOpen = (email) => {
    setOpenChat(!openChat)
    setEmail(email)
  }
  return (
    <div className='table-card'>
      <div>
        <b>{"Chats :"}</b>
      </div>
      {data.length > 0 ?
        <div>
          {
            data && data.map((chat) => {
              return (
                <div className='chat-item' onClick={() => handleOpen(chat.email)}>
                  <img src='logo.png' width={50}></img>
                  <div className='name'>{`${chat.firstName} ${chat.lastName}`}</div>
                  {chat.isApprove && <button className='approve'>{"APPROVE"}</button>}
                </div>)
            })
          }
          {openChat &&
            <NewChatModal
              show={true}
              handleClose={handleClose}
              isOpenChatConvo={true}
              secondMail={email}
            />
          }
        </div>
        : <div>{"You do not have any chats...Use the button at bottom right to start a new chat"}</div>}
    </div>
  )
}
