import { auth } from "@/config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"


export const registerUser= async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth,email, password);
}

export const logout= async () => {
    return await auth.signOut();
}