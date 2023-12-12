import { db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { formatGameName } from "./storage.service";

type GameData = {
    title: string,
    description: string,
    imageURLS: string[],
    tags: string[],
    addonCategories: string[],
}

export const createGame = async (gameData: GameData) => {
        const gameName=formatGameName(gameData.title);
        
        try {
            const gameRef=doc(db, 'games', gameName);
            await setDoc(gameRef, gameData);
        } catch (error) {
            console.error('Error adding game to Firestore: ', error);
        }
}