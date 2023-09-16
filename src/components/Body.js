import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Browse from './Browse';
import Login from './Login';
import { auth } from '../utils/firebase';   // this will be used for a lot of firebase related operation, hence keeping it in a central place where it will be called only once and used throught the app.
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { removeUser, addUser } from '../redux/slice/userSlice';

const Body = () => {

    const dispath = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path : "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
        // after logging in or singing up, we will have to store the user information in redux store. This needs to be done here as well as in else block while signing up.
        // Also this needs to be done while signing out.
        // Hence in order to write it at multiple places, we can use auth_state_listener which will be called whenever auth state changes (login signUp signOut)
        onAuthStateChanged(auth, (user) => {
            if (user) { // User is signed in
                dispath(addUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
            } else { // User is signed out
                dispath(removeUser());
            }
          });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter}></RouterProvider>
        </div>
    )
}

export default Body