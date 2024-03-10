// import React from 'react';
// import './LogoutModal.css';

// export default function LogoutModal() {
//   return (
//     <div className='logout-modal'>
//         Hi
//     </div>
//   )
// }



import './LogoutModal.css';

const LogoutModal = ({ handleClose, show, children, handleLogout }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Confirm Logout</h2>
        Do you really want to logout?
        <div>
        <button className='learn-btn' type="button" onClick={handleClose}>
          CANCEL
        </button>
        <button className='learn-btn' type="button" onClick={handleLogout}>
          LOGOUT
        </button>
        </div>
      </section>
    </div>
  );
};

export default LogoutModal