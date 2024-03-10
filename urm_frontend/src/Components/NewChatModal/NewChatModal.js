import axios from 'axios';
import { useEffect, useState } from 'react';
import './NewChatModal.css';

const NewChatModal = ({ handleClose, show, children, isOpenChatConvo, secondMail }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [openChatConvo, setOpenChatConvo] = useState(isOpenChatConvo || false);
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([{}]);
  
  useEffect(()=> {
    if(isOpenChatConvo) {
        getChats(secondMail);
    }
    else {
        axios.get("https://aag0621.uta.cloud/wdmBackend/getAllUsers.php").then((res)=> {
            console.log(res);
            setData(res.data);
        })
    }
    
  },[])

  const getChats = (receiverEmail) => {
    axios.get(`https://aag0621.uta.cloud/wdmBackend/receiver.php?senderEmail=${JSON.parse(localStorage.getItem('userData')).email}&receiverEmail=${receiverEmail}`).then((res)=>{
        if(res.data.message === "No messages found for this chat.") {
            setChats([{}])
        }
        else {
            setChats(res.data)
            console.log(res.data);
        }
    })
  }

  const handleOpenChat = (secondEmail) => {
    setOpenChatConvo(true);
    setSenderEmail(JSON.parse(localStorage.getItem('userData')).email);
    setReceiverEmail(secondEmail);
    getChats(secondEmail);
  }

  const handleSend = () => {
    const data = new FormData();
    data.append('senderEmail', JSON.parse(localStorage.getItem('userData')).email);
    if (isOpenChatConvo && secondMail) {
        data.append("receiverEmail", secondMail);
    }
    else {
        data.append("receiverEmail", receiverEmail);   
    }
    data.append("message", message);
    axios.post("https://aag0621.uta.cloud/wdmBackend/send.php", data).then((res)=> {
        if(res.data.message === "Message sent successfully.") {
            setMessage('');
            if (isOpenChatConvo && secondMail) {
                getChats(secondMail);
            }
            else {
                getChats(receiverEmail);   
            }
            
        }
    })
  }

  return (
    <div className={showHideClassName}>
        {!openChatConvo ? 
      <section className="modal-main">
        <div className='chat-header'>
        <span className='chat-title'><b>Start new chat </b></span>
        <button  className='close-btn'  type="button" onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
        </button>
        </div>
        <input type='search' className='chat-title' placeholder='Enter name to search' onChange={(e)=> setSearch(e.target.value)}/>
        {search === "" ? 
        <div className='new-chat-div'>
            {
            data.map((chat, index) => {
                return (
                    <div className='new-chat-item' id={index} onClick={()=>handleOpenChat(chat.email)}>
                        <img src='logo.png' width={50} alt=''></img>
                        <div className='new-name'>{`${chat.firstName} ${chat.lastName}`}</div>
                    </div>)
            })
        }
        </div>
        :
        <div className='new-chat-div'>
            {
            data.map((chat,index) => {
                console.log("firstName", chat.firstName?.toLowerCase());
                console.log("search", search.toLowerCase());
                console.log("lastName", chat.lastName?.toLowerCase());
                if(chat.firstName?.toLowerCase().includes(search.toLowerCase()) || chat.lastName?.toLowerCase().includes(search.toLowerCase())) {
                    return (
                        <div className='new-chat-item' id={index} onClick={()=>handleOpenChat(chat.email)}>
                            <img src='logo.png' width={50} alt=''></img>
                            <div className='new-name'>{`${chat.firstName || ""} ${chat.lastName || ""}`}</div>
                        </div>)
                }

            })
        }
        </div>
        }
        

        
        
      </section>
:
<section className="modal-main">
    <div className='chat-header'>
        <span className='chat-title'><b>Chats: </b></span>
<button className='close-btn' type="button" onClick={handleClose}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
        </button>
        </div>
        <div className='new-chat-div'>
            <div className='message-list'>
        {
            chats && chats.map((chat)=> {
                if(chat.senderEmail === JSON.parse(localStorage.getItem('userData')).email) {
                    return (<div className='right'><text className='convo-box'>{chat.messageText}</text></div>)
                }
                else 
                if(chat.receiverEmail === JSON.parse(localStorage.getItem('userData')).email) {
                    return (<div className='left'><text className='convo-box'>{chat.messageText}</text></div>)
                }
            })
        }
        </div>
        </div>
        <div>
        <input type='text' placeholder='Type your message' value={message} onChange={(e)=> setMessage(e.target.value)}/>
        <botton className='send-btn' onClick={handleSend}>SEND</botton>
        </div>
        <br/>
        <br/>
</section>
}
    </div>
  );
};

export default NewChatModal