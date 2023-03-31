import { useState, FormEvent } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { userLoginAsync } from "../reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../tools/hooks";

interface ErrorMessageStructure {
    name: String,
    value: String
}

interface Props {
    type: String
}

export default function SigninTemplate(props: Props) {

    const initMessage: ErrorMessageStructure[] = [];
    const [errorMessages, setErrorMessages] = useState(initMessage);
    const [passwordIsHidden, setPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.user);

    /* --- Funciones --- */
    const renderErrorMessage = (name: String) => {
        console.log(name);
        const message = errorMessages.find(e => e.name === name);
        if (message) {
            return (
                <div><span className="form-error-message">{message.value}</span></div>
            );
        }
    }
    
    const handleClickShowPassword = () => {
        const el = document.getElementById('input-password');
        const val = !passwordIsHidden;
        setPasswordHidden(val);
        el?.setAttribute('type', val ? 'password' : 'text');
    }

    const validateForm = (): boolean => {
        let errorCount = 0;
        setErrorMessages(initMessage);

        if (!password) {
            setErrorMessages( [...errorMessages, { name: 'password', value: 'Password is required !!' }] );
            errorCount++;
        }

        if (!email) {
            setErrorMessages( [...errorMessages, { name: 'email', value: 'Email is required !!' }] );
            errorCount++;
        }

        if (props.type === '@user/signup' && !username) {
            setErrorMessages( [...errorMessages, { name: 'username', value: 'Username is required !!' }] )
            errorCount++;
        }

        console.log(errorCount);

        return errorCount === 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (validateForm()) {
            if (props.type === '@user/login') {
                console.log(state);
                dispatch(userLoginAsync({username: email, password}));
                console.log(state);
            }
        }

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center clear-mode dark:dark-mode">
            <div className="
                w-full h-full md:w-[30rem] md:h-[32rem] md:shadow-xl dark:dark-mode-shadow
                md:border-neutral-300 md:border md:rounded-xl
                md:px-12 py-10 px-6 clear-mode dark:dark-mode
            ">

                <div className="text-3xl font-semibold dark-mode-text dark:clear-mode-text flex items-center justify-between">
                    {props.type === '@user/login' ? 'Log in' : 'Sign up'}
                    <span 
                    onClick={
                        () => {
                            if (!state.loginIsSubmitted) {
                                navigate("/");
                            }
                        }
                    } className="top-1 right-1"><VscClose /></span>
                </div>

                <div className="w-full h-full">
                    <div className="sr-only">
                        Este contenedor muestra el formulario correspondiente (Signin, Signup).
                    </div>

                    <form onSubmit={handleSubmit}>

                    { props.type === '@user/signup' ? 
                        <div className="form-row-signin">
                            <div className="form-label-signin">
                                <label htmlFor="username">Username</label>
                                <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-700 cursor-pointer">Log in</Link></span>
                            </div>
                            <div className="form-input-signin">
                                <input value={username} onChange={({ target }) => setUsername(target.value)}
                                type="text" name="username" autoCapitalize="false" autoCorrect="false" placeholder="Someone Kun" />
                            </div>
                        </div>
                        :
                        <></>
                        }

                        <div className="form-row-signin">
                            <div className="form-label-signin">
                                <label htmlFor="email">Email</label>
                                {
                                    props.type === '@user/login' ?
                                    <span className="text-sm">Need an account? <Link to="/signup" className="text-blue-700 cursor-pointer">Sign up</Link></span> :
                                    <></>
                                }
                            </div>
                            <div className="form-input-signin">
                                <input value={email} onChange={({ target }) => setEmail(target.value)}
                                type="text" name="email" autoCapitalize="false" autoCorrect="false" placeholder="someone@mail.com" />
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
                                <input 
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                type="password" name="password" id="input-password" placeholder="secret123" />
                                {renderErrorMessage('password')}
                            </div>
                        </div>

                        <div className="form-row-signin">
                            <div className={ props.type === '@user/login' ? 'form-button-signin h-32' : 'form-button-signin md:h-[5rem] h-[6rem]' }>
                                <button type="submit">{ props.type === '@user/login' ? 'Log in' : 'Sign up' }</button>
                            </div>
                        </div>

                        <div className="form-row-signin">
                            <div className="form-action-signin">
                                {
                                    props.type === '@user/login' && <span>Forgot password?</span>
                                }
                            </div>
                        </div>

                    </form>

                </div>
                {/* { isSubmitted ? 

                <div className="w-full h-full flex justify-center items-center">
                    <div className="sr-only">
                        Este contenedor se muestra cuando el formulario se mando.
                        Se muestran elementos de carga que indican al usuario que la pagina "sigue en pie"
                    </div>
                    
                    <img className="h-14 w-14" src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/circular_progress_indicator.gif" alt="" />
                </div> : 

                 } */}

            </div>
        </div>
    );

}