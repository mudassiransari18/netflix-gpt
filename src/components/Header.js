import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/slice/userSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispath = useDispatch();
  const user = useSelector(store => store.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispath(removeUser());
      navigate("/");
    } catch(error) {
      // An error happened.
    }
  }

  return (
    <div className='absolute bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
      <img className='w-44' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo' />
      { user && <div className='flex'>
        <img className='w-12 h-12 m-2' src={ user?.photoURL } />
        <button className='font-bold text-white' onClick={ handleSignOut }>Signout</button>
      </div>}
    </div>
  )
}

export default Header