export default function Profile() {
    return (
        <article className="w-full h-auto">
            <div className="h-[23rem] bg-blue-400 -mt-14 pt-14 px-7 flex items-center">
                <div className="w-56 h-auto">
                    <img className='w-full rounded-full drop-shadow-lg' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="ml-10">
                    <h5 className="text-white font-semibold text-md drop-shadow-lg">Profile</h5>
                    <h1 className="text-white font-semibold text-9xl drop-shadow-lg">Username</h1>
                </div>
            </div>
        </article>
    );
}