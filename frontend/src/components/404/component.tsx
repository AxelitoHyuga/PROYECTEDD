import { Link } from "react-router-dom";

export default function PageNotFound404() {
    
    return (
        <div className="w-full h-full flex justify-center">
            <div className='h-auto w-auto text-center py-32'>
                <div>
                    <span className='text-6xl font-bold text-white'>404</span>
                </div>
                <div>
                    <span className="text-white">Page not found</span>
                </div>
            </div>
            <div className='absolute -z-10 h-screen w-screen overflow-hidden bg-neutral-900'></div>
            <div className='absolute h-screen w-screen overflow-hidden'>
                <img className='h-56 mix-blend-color-dodge absolute bottom-0' src={`${process.env.PUBLIC_URL}/img6E.png`} alt="logo" />
                <span className="text-center absolute bottom-[6rem] left-[9.3rem] w-[7.5rem] font-semibold text-sm text-neutral-900">
                    If you are looking for One Piece this is not the right place<br/>
                    <Link to="/" className="text-sky-800" z-0>Got to home</Link>
                </span>
            </div>
        </div>
    );

}