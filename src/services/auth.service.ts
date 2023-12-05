import { auth } from "@/config/firebase"
import { createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } from "firebase/auth"


export const registerUser= async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth,email, password);
}

export const logout= async () => {
    return await auth.signOut();
}

export const login= async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth,email, password);
}

export const passwordReset= async (email: string) => {
    return await sendPasswordResetEmail(auth,email);
}