import { UserData } from '@/components/Auth/SignUp/SignUp';
import { db } from '@/config/firebase';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


export const createUser = async (userData: UserData) => {
    const auth=getAuth();
    const user=auth.currentUser;
    const userRef = doc(db, 'users', user!.uid);
    await setDoc(userRef, userData);
}