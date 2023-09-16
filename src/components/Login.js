import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeUser, addUser } from '../redux/slice/userSlice';

import Header from './Header';
import { checkValidateData } from '../utils/validate';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"; // from firebase docx
import { auth } from '../utils/firebase';   // this will be used for a lot of firebase related operation, hence keeping it in a central place where it will be called only once and used throught the app.

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();
    const dispath = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);

    const handleButtonClick = async () => {
        const errorMessage = checkValidateData(isSignIn, email.current.value, password.current.value, fullName?.current?.value);
        if (errorMessage) return setErrorMsg(errorMessage);
        
        // login / sign up
        if (isSignIn) {
            // login
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email.current.value, password.current.value); // Signed in 
                const user = userCredential.user;
                navigate("/browse");
                // after logging in or singing up, we will have to store the user information in redux store. This needs to be done here as well as in else block while signing up.
                // Also this needs to be done while signing out.
                // Hence in order to write it at multiple places, we can use auth_state_listener which will be called whenever auth state changes (login signUp signOut)
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
                setErrorMsg(errorCode + " " + errorMessage)
            }
        } else {
            // sign up
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value); // Signed in 
                const user = userCredential.user;
                await updateProfile(user, { displayName: fullName.current.value, photoURL: "https://i.eurosport.com/2023/08/30/3773899-76767908-2560-1440.jpg?w=100" });
                const newUser = auth.currentUser;
                dispath(addUser({ uid: newUser.uid, email: newUser.email, displayName: newUser.displayName, photoURL: newUser.photoURL }));
                navigate("/browse");
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                setErrorMsg(errorCode + " " +errorMessage)
            }
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg' />
            </div>
            <form className='absolute w-4/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80' onSubmit={ (e) => e.preventDefault() }>
                <h1 className='font-bold text-3xl py-4'>{ isSignIn ? "Sign In" : "Sign Up"}</h1>
                
                { !isSignIn && <input ref={ fullName } type='text' placeholder='Full Name' className='rounded-md p-3 my-4 w-full bg-gray-700' /> }

                <input ref={ email } type='text' placeholder='Email or phone number' className='rounded-md p-3 my-4 w-full bg-gray-700' />
                
                <input ref={ password } type='password' placeholder='Password' className='rounded-md p-3 my-4 w-full bg-gray-700' />
                
                <p className='text-red-500 font-bold text-lg py-4'>{ errorMsg }</p>
                
                <button className='rounded-md p-3 my-4 bg-red-500 w-full' onClick={ handleButtonClick } >{ isSignIn ? "Sign In" : "Sign Up"}</button>

                <p className='py-4 cursor-pointer' onClick={ () => setIsSignIn(!isSignIn) }> { isSignIn ? "New to Netflix? Sign Up Now" : "Already a user ? Sign In!!!!!!"} </p>
            </form>
        </div>
    )
}

export default Login