import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg' />
            </div>
            <form className='absolute w-4/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{ isSignIn ? "Sign In" : "Sign Up"}</h1>
                { !isSignIn && <input type='text' placeholder='Full Name' className='rounded-md p-3 my-4 w-full bg-gray-700' /> }
                <input type='text' placeholder='Email or phone number' className='rounded-md p-3 my-4 w-full bg-gray-700' />
                <input type='password' placeholder='Password' className='rounded-md p-3 my-4 w-full bg-gray-700' />
                <button className='rounded-md p-3 my-4 bg-red-500 w-full'>{ isSignIn ? "Sign In" : "Sign Up"}</button>

                <p className='py-4 cursor-pointer' onClick={ () => setIsSignIn(!isSignIn) }> { isSignIn ? "New to Netflix? Sign Up Now" : "Already a user ? Sign In!!!!!!"} </p>
            </form>
        </div>
    )
}

export default Login