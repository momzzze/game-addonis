import { UserData } from '@/components/Auth/SignUp/SignUp';
import { db } from '@/config/firebase';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, getDoc } from 'firebase/firestore';


export const createUser = async (userData: UserData) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user!.uid);
    await setDoc(userRef, userData);
}
// :Promise<UserData>
export const getUserById = async (id: string): Promise<UserData | null> => {
    const userRef = doc(db, 'users', id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const data = userSnap.data() as UserData;
        return data
    } else {
        return null;
    }
}


// {
//     "phone": "",
//     "uid": "0L9Sqd93VNdjKAFqgA6Kvamvz9z2",
//     "updatedAt": "2023-12-05T13:19:00.107Z",
//     "name": "",
//     "role": "user",
//     "createdAt": "2023-12-05T13:19:00.107Z",
//     "email": "nikola@ninov.org"
// }