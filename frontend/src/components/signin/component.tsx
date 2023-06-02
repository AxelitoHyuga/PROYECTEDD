import { useState, useContext } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
// import { VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
import { UserState, userLoginAsync } from "./userReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setCookie } from '../../utils/cookieManager';
import { Id, toast } from 'react-toastify';
import './style.css';
import { useCallback } from "react";
import { login } from "./userService";
import UserContext, { UserContextData } from "./userContext";
import { AxiosError } from "axios";

interface ErrorMessageStructure {
    name: String,
    value: String
}

interface Props {
    type: String
}

export default function SigninTemplate(props: Props) {

    const initMessage: ErrorMessageStructure[] = [];
    const [formIsSubmitted, setFormSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState(initMessage);
    const [passwordIsHidden, setPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.user);
    const { user, setUser } = useContext(UserContext);

    /* --- Funciones --- */
    const renderErrorMessage = useCallback((name: String) => {
        const message = errorMessages.find(e => e.name === name);
        if (message) {
            return (
                <div><span className="form-error-message">{message.value}</span></div>
            );
        }
    }, [errorMessages]);
    
    /* Muestra u oculta los caracteres de input password */
    const handleClickShowPassword = useCallback(() => {
        const el = document.getElementById('input-password');
        const val = !passwordIsHidden;
        setPasswordHidden(val);
        el?.setAttribute('type', val ? 'password' : 'text');
    }, [passwordIsHidden]);

    /* Valida campos de formulario */
    const validateForm = useCallback((): boolean => {
        let errorCount = 0;
        setErrorMessages(initMessage);

        if (formIsSubmitted) {
            errorCount++;
        }

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

        return errorCount === 0;
    }, [email, password, username, initMessage, props.type, errorMessages, formIsSubmitted]);

    /* Maneja el envío del formulario */
    const handleSubmit = useCallback(async () => {        
        if (validateForm()) {
            if (props.type === '@user/login') {
                const loadingToast: Id = toast.loading('Logging in');
                let currentToastId: Id | null = null;

                try {
                    const { data, status } = await login(email, password);
                    // const { meta, payload } = await dispatch(userLoginAsync({username: email, password}));

                    if (status === 200) {
                        const dta = data as UserContextData;
                        toast.dismiss(loadingToast);
                        currentToastId = toast.success('Logged successful 👌', { autoClose: 1500 });

                        toast.onChange((t) => {
                            if (currentToastId === t.id) {
                                switch (t.status) {
                                    case 'removed':
                                        currentToastId = null;
                                        if (t.type === toast.TYPE.SUCCESS) {
                                            navigate('/');
                                        }
                                        break;
                                }
                            }
                        });
                        
                        if (setUser != null) {
                            setUser({
                                userId: dta.userId,
                                username: dta.username,
                                token: dta.token
                            });
                            console.log(dta);
                            
                            sessionStorage.setItem('kanao', JSON.stringify({uid: dta.userId,username: dta.username,token: dta.token}));
                        }                        
                    }
                } catch (error) {
                    console.error(error);
                    if (error instanceof AxiosError) {
                        toast.dismiss(loadingToast);
                        toast.error(`${error.response?.data} 🤯`, { autoClose: 2000 });
                    }
                }
            }
        }

    }, [email, password, navigate, props.type, validateForm, setUser]);

    return (
        <div className="flex">
            <div className="h-screen w-7/12 flex z-0">
                <img className="object-center object-fill blur-2xl grayscale-[0.5]" src="https://c.wallhere.com/photos/fa/9e/MuseDash_video_game_girls_headphones_computer_blonde_looking_at_viewer_cat_ears_colorful-2228072.jpg!d" alt="" />
            </div>
            <div className="bg-neutral-900 h-screen w-5/12 z-10">
                <div className="w-full h-1/5 flex items-center justify-center">
                    <div className="w-max h-max">
                        <div className="bg-neutral-200 w-12 h-12 flex items-center self-center m-auto justify-center rounded-full">
                            <FaLock color="rgb(23,23,23)" size="1.5rem"/>
                        </div>
                        <span className="text-neutral-200 text-3xl font-semibold text-center">
                            {props.type === '@user/login' ? 'Sign in' : 'Sign up'}
                        </span>
                    </div>
                </div>

                <form className="w-full h-3/5">
                    { props.type !== '@user/login' &&
                    <div className="form-row-signin">
                        <div className="form-label-signin">
                            <label htmlFor="username">Username</label>
                            <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-700 cursor-pointer">Log in</Link></span>
                        </div>
                        <div className="form-input-signin">
                            <input value={username} onChange={({ target }) => setUsername(target.value)}
                            type="text" name="username" autoCapitalize="false" autoComplete="false" autoCorrect="false" placeholder="Someone Kun" />
                        </div>
                    </div>
                    }

                    <div className="form-row-signin">
                        <div className="form-label-signin">
                            <label htmlFor="email">Email</label>
                            {
                                props.type === '@user/login' ?
                                <span className="text-sm">Need an account? <Link to="/register" className="text-blue-700 cursor-pointer">Register</Link></span> :
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
                </form>

                <div className="w-full h-1/5">
                    <div className="form-row-signin">
                        <div className="form-button-signin">
                            <button type="button" onClick={handleSubmit}>{ props.type === '@user/login' ? 'Sign in' : 'Sign up' }</button>
                        </div>
                    </div>

                    <div className="form-row-signin">
                        <div className="form-action-signin">
                            {
                                props.type === '@user/login' && <span>Forgot password?</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="w-screen h-screen flex justify-center items-center clear-mode dark:dark-mode">
        //     <div className="
        //         w-full h-full md:w-[30rem] md:h-[32rem] md:shadow-xl dark:dark-mode-shadow
        //         md:border-neutral-300 md:border md:rounded-xl
        //         md:px-12 py-10 px-6 clear-mode dark:dark-mode
        //     ">

        //         <div className="text-3xl font-semibold dark-mode-text dark:clear-mode-text flex items-center justify-between">
        //             {props.type === '@user/login' ? 'Log in' : 'Sign up'}
        //             <span 
        //             onClick={
        //                 () => {
        //                     if (!state.loginIsSubmitted) {
        //                         navigate("/");
        //                     }
        //                 }
        //             } className="top-1 right-1"><VscClose /></span>
        //         </div>

        //         <div className="w-full h-full">
        //             <div className="sr-only">
        //                 Este contenedor muestra el formulario correspondiente (Signin, Signup).
        //             </div>

        //             <form onSubmit={handleSubmit}>

        //             { props.type === '@user/signup' ? 
        //                 <div className="form-row-signin">
        //                     <div className="form-label-signin">
        //                         <label htmlFor="username">Username</label>
        //                         <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-700 cursor-pointer">Log in</Link></span>
        //                     </div>
        //                     <div className="form-input-signin">
        //                         <input value={username} onChange={({ target }) => setUsername(target.value)}
        //                         type="text" name="username" autoCapitalize="false" autoCorrect="false" placeholder="Someone Kun" />
        //                     </div>
        //                 </div>
        //                 :
        //                 <></>
        //                 }

        //                 <div className="form-row-signin">
        //                     <div className="form-label-signin">
        //                         <label htmlFor="email">Email</label>
        //                         {
        //                             props.type === '@user/login' ?
        //                             <span className="text-sm">Need an account? <Link to="/signup" className="text-blue-700 cursor-pointer">Sign up</Link></span> :
        //                             <></>
        //                         }
        //                     </div>
        //                     <div className="form-input-signin">
        //                         <input value={email} onChange={({ target }) => setEmail(target.value)}
        //                         type="text" name="email" autoCapitalize="false" autoCorrect="false" placeholder="someone@mail.com" />
        //                         {renderErrorMessage('email')}
        //                     </div>
        //                 </div>

        //                 <div className="form-row-signin">
        //                     <div className="form-label-signin">
        //                         <label htmlFor="password">Password</label>
        //                         <span className="flex items-center text-sm cursor-pointer" onClick={handleClickShowPassword}>
        //                             { passwordIsHidden ? <BsEyeFill className="mx-1.5" /> : <BsEyeSlashFill className="mx-1.5" /> } { passwordIsHidden ? 'Show' : 'Hide' }
        //                         </span>
        //                     </div>
        //                     <div className="form-input-signin">
        //                         <input 
        //                         value={password}
        //                         onChange={({ target }) => setPassword(target.value)}
        //                         type="password" name="password" id="input-password" placeholder="secret123" />
        //                         {renderErrorMessage('password')}
        //                     </div>
        //                 </div>

        //                 <div className="form-row-signin">
        //                     <div className={ props.type === '@user/login' ? 'form-button-signin h-32' : 'form-button-signin md:h-[5rem] h-[6rem]' }>
        //                         <button type="submit">{ props.type === '@user/login' ? 'Log in' : 'Sign up' }</button>
        //                     </div>
        //                 </div>

        //                 <div className="form-row-signin">
        //                     <div className="form-action-signin">
        //                         {
        //                             props.type === '@user/login' && <span>Forgot password?</span>
        //                         }
        //                     </div>
        //                 </div>

        //             </form>

        //         </div>
        //         {/* { isSubmitted ? 

        //         <div className="w-full h-full flex justify-center items-center">
        //             <div className="sr-only">
        //                 Este contenedor se muestra cuando el formulario se mando.
        //                 Se muestran elementos de carga que indican al usuario que la pagina "sigue en pie"
        //             </div>
                    
        //             <img className="h-14 w-14" src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/circular_progress_indicator.gif" alt="" />
        //         </div> : 

        //         } */}

        //     </div>
        // </div>
    );

}