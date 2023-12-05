import { db } from '@/config/firebase';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type User={
    email: string,
    uid: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    phone: string,
}

export const createUser = async (userData: User) => {
    const auth=getAuth();
    const user=auth.currentUser;
    const userRef = doc(db, 'users', user!.uid);
    await setDoc(userRef, userData);
}