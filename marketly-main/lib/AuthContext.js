'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { getUser, createUser } from "./firebaseDb";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync Firebase auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Check if user exists in DB, if not create them
                let dbUser = await getUser(firebaseUser.uid);
                if (!dbUser) {
                    await createUser(firebaseUser.uid, {
                        name: firebaseUser.displayName || "",
                        email: firebaseUser.email || "",
                        image: firebaseUser.photoURL || "",
                    });
                    dbUser = await getUser(firebaseUser.uid);
                }
                setUser({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName || dbUser?.name || "",
                    email: firebaseUser.email || "",
                    image: firebaseUser.photoURL || dbUser?.image || "",
                    role: dbUser?.role || "user",
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign up with email/password
    const signUp = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await createUser(result.user.uid, {
            name,
            email,
            image: "",
        });
        return result.user;
    };

    // Sign in with email/password
    const signIn = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const dbUser = await getUser(result.user.uid);
        if (!dbUser) {
            await createUser(result.user.uid, {
                name: result.user.displayName || "",
                email: result.user.email || "",
                image: result.user.photoURL || "",
            });
        }
        return result.user;
    };

    // Sign out
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
