import React from 'react';
import './styles/App.css';
import { getCookie } from './tools/cookieManager';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // if (getCookie('login_keys') === '') {
  //   return <LoginForm />
  // } else {
  //   return (
  //     <div className="App">
  //       <header className="App-header"></header>
  //     </div>
  //   );
  // }

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );

}

export default App;
