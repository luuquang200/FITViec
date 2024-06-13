import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    const [inSingUpInPage, setInSingUpInPage] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            // check if the auth provider is google or not
            const isGoogle = user.providerData.some(
                (provider) =>
                    provider.providerId === GoogleAuthProvider.PROVIDER_ID,
            );
            setIsGoogleUser(isGoogle);
            if (user.emailVerified) {
                // Fetch the user's role from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.exists() ? userDoc.data() : {};

                const updatedUser = {
                    ...user,
                    ...userData,
                };
                setCurrentUser(updatedUser);

                const isEmail = user.providerData.some(
                    (provider) => provider.providerId === "password",
                );
                setIsEmailUser(isEmail);

                setUserLoggedIn(true);
            } else {
                // If email is not verified, sign out the user and prompt verification
                await auth.signOut();
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser,
        isRegistered,
        setIsRegistered,
        inSingUpInPage,
        setInSingUpInPage,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
