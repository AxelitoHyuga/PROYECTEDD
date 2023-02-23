import React from 'react';
import './styles/App.css';
import { getCookie } from './tools/cookieManager';
import LoginForm from './components/loginForm';
import { Outlet } from 'react-router-dom';

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
      <Outlet />
    </>
  );

}

export default App;
