import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

interface ErrorMessageStructure {
    name: String,
    value: String
}

interface Props {
    type: String
}

export default function SigninTemplate(props: Props) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const initMessage: ErrorMessageStructure = { name: 'test', value: 'test !!' };
    const [errorMessages, setErrorMessages] = useState(initMessage);
    const [passwordIsHidden, setPasswordHidden] = useState(true);
    const renderErrorMessage = (name: String) => 
        name === errorMessages.name && (
            <div><span className="form-error-message">{errorMessages.value}</span></div>
        );
    
    function handleClickShowPassword() {
        const el = document.getElementById('input-password');
        const val = !passwordIsHidden;
        setPasswordHidden(val);
        el?.setAttribute('type', val ? 'password' : 'text');
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center clear-mode dark:dark-mode">
            <div className="
                w-full h-full md:w-[30rem] md:h-[32rem] md:shadow-xl dark:dark-mode-shadow
                md:border-neutral-300 md:border md:rounded-xl
                md:px-12 py-10 px-6 clear-mode dark:dark-mode
            ">

                <div className="text-3xl font-semibold dark-mode-text dark:clear-mode-text">{props.type === '@signin/login' ? 'Log in' : 'Sign up'}</div>
                { isSubmitted ? 

                <div className="w-full h-full"></div> : 

                <div className="w-full h-full">

                    <form action="">

                        <div className="form-row-signin">
                            <div className="form-label-signin">
                                <label htmlFor="email">Email</label>
                                {
                                    props.type === '@signin/login' ?
                                    <span className="text-sm">Need an account? <Link to="/signup" className="text-blue-700 cursor-pointer">Sign up</Link></span> :
                                    <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-700 cursor-pointer">Log in</Link></span>
                                }
                            </div>
                            <div className="form-input-signin">
                                <input type="text" name="email" autoCapitalize="false" autoCorrect="false" placeholder="someone@mail.com" />
                                {renderErrorMessage('email')}
                            </div>
                        </div>

                        <div className="form-row-signin">
                            <div className="form-label-signin">
                                <label htmlFor="password">Password</label>
                                <span className="flex items-center text-sm cursor-pointer" onClick={handleClickShowPassword}>
                                    { passwordIsHidden ? <BsEyeFill className="mx-1.5" /> : <BsEyeSlashFill className="mx-1.5" /> } { passwordIsHidden ? 'Show' : 'Hide' }
                                </span>
                            </div>
                            <div className="form-input-signin">
                                <input type="password" name="password" id="input-password" placeholder="secret123" />
                                {renderErrorMessage('password')}
                            </div>
                        </div>

                        <div className="form-row-signin">
                            <div className="form-button-signin">
                                <button>{props.type === '@signin/login' ? 'Log in' : 'Sign up'}</button>
                            </div>
                        </div>

                        <div className="form-row-signin">
                            <div className="form-action-signin">
                                {
                                    props.type === '@signin/login' && <span>Forgot password?</span>
                                }
                            </div>
                        </div>

                    </form>

                </div> }

            </div>
        </div>
    );

}