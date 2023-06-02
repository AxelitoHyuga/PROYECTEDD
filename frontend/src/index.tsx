import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import PageNotFound404 from './components/404/component';
import { Provider } from 'react-redux';
import {store} from './store';
import SinginForm from './components/signin/component';
import SinginType from './utils/signinType';
import Profile from './components/profile/component';
import { UserContextProvider } from './components/signin/userContext';
import { ToastContainer } from 'react-toastify';
import BoardModule from './components/board/component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
          <UserContextProvider>
            <ToastContainer />
            <Routes>
              <Route path='/' element={<App />} >
                <Route index element={<BoardModule />} />
                <Route path='profile' element={<Profile />} />
              </Route>
              <Route path='/login' element={<React.Fragment><SinginForm type={SinginType.login} /></React.Fragment>} />
              <Route path='/register' element={<React.Fragment><SinginForm type={SinginType.signup} /></React.Fragment>} />
              <Route path='*' element={<React.Fragment><PageNotFound404 /></React.Fragment>} />
            </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
