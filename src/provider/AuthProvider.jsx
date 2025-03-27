import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase.config';
import axios from 'axios';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);

    const [loader, setLoader] = useState(true);


    const handleRegister = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const handleLogin = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const handleGoogleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const handleUpdate = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    const handleLogOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser?.email) {
                setUser({
                    ...currentUser,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                });
                const user = { email: currentUser.email }
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                        setLoader(false);
                    })
            } else {
                axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                        setLoader(false);
                    })
                setUser(null);
            }

        });
        return () => unsubscribe();
    }, []);

    const authInfo = { handleGoogleLogin, handleLogOut, handleRegister, handleLogin, handleUpdate, user, setUser, loader, setLoader };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
