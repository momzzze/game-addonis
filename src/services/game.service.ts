import { db } from "@/config/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { formatGameName } from "./storage.service";

type GameData = {
    title: string,
    description: string,
    imageURLS: string[],
    tags: string[],
    addonCategories: string[],
}

type GameDataWithId= GameData & {
    id: string,
}

export const createGame = async (gameData: GameData) => {
    const gameName = formatGameName(gameData.title);

    try {
        const gameRef = doc(db, 'games', gameName);
        await setDoc(gameRef, gameData);
    } catch (error) {
        console.error('Error adding game to Firestore: ', error);
    }
}

export const getGames = async ():Promise<GameDataWithId[]> => {
   try {
    const gamesRef = collection(db, 'games');
    const gamesSnapshot = await getDocs(gamesRef);
    const games:GameDataWithId[] = gamesSnapshot.docs.map((doc) => {return {...doc.data(), id: doc.id} as GameDataWithId})
    return games;
   } catch (error) {
        console.log('Error getting games from Firestore: ', error);     
        return [];   
   }
}