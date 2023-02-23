import logo from '../logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Header() {

    return (
        <header className="w-full h-20 border-b border-neutral-300 shadow-md
        py-4 px-6 flex justify-between items-center clear-mode dark:dark-mode fixed z-[100]">
            <div className="h-full">
                <img className='h-full' src={logo} alt="" />
            </div>
            <span className=''><AiOutlineMenu size={25} className="dark-mode-text dark:clear-mode-text" /></span>
        </header>
    );
    
}