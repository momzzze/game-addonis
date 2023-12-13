import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addGameToFirestore } from '.';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

//add game to firestore
export const addGameToFirestore = createAsyncThunk(
    'games/addGameToFirestore',
    async (game) => {
        const addGameRef = await addDoc(collection(db, 'games'), game);
        const newGame = { id: addGameRef.id, game };
        return newGame;
    }
);

// fetch games
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'games'));
        const games = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            game: doc.data(),
        }));
        return games;
    }
)

//delete game from firestore
export const deleteGameFromFirestore = createAsyncThunk(
    'games/deleteGameFromFirestore',
    async (id) => {
        const games = await getDocs(collection(db, 'games'));
        for (const game of games.docs) {
            if (game.id === id) {
                await deleteDoc(doc(db, 'games', game.id))
            }
        }
        return id;
    }
);

// need to have one function for delete all games from firestore but I wont use it for now
export const deleteAllGamesFromFirestore = createAsyncThunk(
    'games/deleteAllGamesFromFirestore',
    async () => {
        const games = await getDocs(collection(db, 'games'));
        for (const game of games.docs) {
            await deleteDoc(doc(db, 'games', game.id))
        }
        return [];
    }
);

// update game in firestore
export const updateGameInFirestore = createAsyncThunk(
    'games/updateGameInFirestore',
    async ({editedGame,id}) => {        
        const games = await getDocs(collection(db, 'games'));
        for (const snap of games.docs) {
            if (snap.id === id) {
                const gameRef = doc(db, 'games', snap.id);
                updateDoc(gameRef, editedGame);
            }
        }
        return {editedGame,id};
    }
)


const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        gamesArray: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(addGameToFirestore.fulfilled, (state, action) => {
                state.gamesArray.push(action.payload);
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.gamesArray = action.payload;
            })
            .addCase(deleteGameFromFirestore.fulfilled, (state, action) => {
                state.gamesArray = state.gamesArray.filter((game) => game.id !== action.payload);
            })
            .addCase(deleteAllGamesFromFirestore.fulfilled, (state, action) => {
                state.gamesArray = action.payload;
            })
            .addCase(updateGameInFirestore.fulfilled, (state, action) => {              
                const {id, editedGame}= action.payload;                
                const index = state.gamesArray.findIndex((editedGame) => editedGame.id === id);                
                if(index !== -1){
                    state.gamesArray[index]={id:id, editedGame};
                }
            })
    }
})

export default gamesSlice.reducer;