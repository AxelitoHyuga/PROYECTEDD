import { Link } from "react-router-dom";

export default function UserCard(props: { isOnMobilePopup: Boolean | undefined }) {
    return (
        <Link to="/login" className='flex'>
            <div className='w-10 h-10'>
                <img className='bg-slate-600 w-full rounded-full' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            {
                props.isOnMobilePopup
                ? <div className='ml-4'>
                    <span className='block'>User name</span>
                    <Link to="#" className='text-sm text-blue-600'>Profile</Link>
                </div>
                : <></>
            }
        </Link>
    );
}