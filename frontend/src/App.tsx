import './styles/App.css';
import { useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils/cookieManager';
import Sidebar from './components/sidebar/component';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Scrollbars from 'react-custom-scrollbars-2';
import { loginWithToken } from './components/signin/userService';

function App() {
  const navigate = useNavigate();
  const canGoBack = window.history.state && window.history.state.idx > 0;
  const canGoForward = window.history.state && window.history.state.idx < window.history.length - 1;

  useEffect(() => {
    let tokenStoraged = sessionStorage.getItem('kanao');
    let requireLogin = false;
    if (tokenStoraged) {
      const { token } = JSON.parse(tokenStoraged) as { uid?: string,username?: string,token?: string };
      
      if (token) {
        // loginWithToken(token);
      } else {
        requireLogin = true;
      }
    } else {
      requireLogin = true;
    }

    if (requireLogin) {
      navigate('/login');
    }
  }, [ navigate ]);

  const renderView = useCallback(({ style, ...props }: { style: React.CSSProperties }) => {
    return (
      <div {...props} className='view' style={style}></div>
    );
  }, []);

  const renderTrackVertical = useCallback(({ style, ...props }: { style: React.CSSProperties }) => {
    return (
      <div {...props} className='bg-white bg-opacity-20 w-16 rounded-[0.2rem] hover:bg-opacity-40 thumb-vertical' style={{ ...style, width: '9px' }}></div>
    );
  }, []);

  const renderThumbVertical = useCallback(({ style, ...props }: { style: React.CSSProperties }) => {
    return (
      <div {...props} style={{ ...style, width: '9px', borderRadius: '3px', top: '2px', right: '2px', bottom: '2px' }} className='track-vertical' ></div>
    );
  }, []);

  return (
    <>
      <div className="bg-neutral-900 h-screen flex">
        <Sidebar />
        <main className="bg-transparent w-full h-full p-2 pl-0">
          <Scrollbars 
            autoHide 
            hideTracksWhenNotNeeded 
            thumbMinSize={20} 
            renderView={renderView} 
            renderTrackVertical={renderTrackVertical}
            renderThumbVertical={renderThumbVertical} 
            className="bg-neutral-800 rounded-lg h-full"
          >
            <nav className="flex bg-transparent w-full h-14 sticky top-0 z-50 p-4 px-7 justify-between items-center">
              <div className='flex justify-between w-20 items-center'>
                <button disabled={!canGoBack} className={`bg-neutral-900 ${canGoBack ? '' : 'opacity-40 cursor-not-allowed'} rounded-full w-8 h-8`} onClick={() => { window.history.back() }}>
                  <IoChevronBackOutline size='1.5rem' className='m-auto' color='white' />
                </button>
                <button disabled={!canGoForward} className={`bg-neutral-900 ${canGoForward ? 'bg-opacity-80' : 'opacity-40 cursor-not-allowed'} rounded-full w-8 h-8`} onClick={() => { window.history.forward() }}>
                  <IoChevronForwardOutline size='1.5rem' className='m-auto' color='white' />
                </button>
              </div>
              <Link to="/profile" >
                <div className='w-9 h-auto'>
                  <img className='w-full rounded-full border-neutral-900 border-opacity-50 border-4 hover:border-[3.8px] hover:border-opacity-70' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
              </Link>
            </nav>
            <Outlet />
          </Scrollbars>
        </main>
      </div>
    </>
  );

}

export default App;
