import { configureStore } from '@reduxjs/toolkit';
import  gamesReducer  from './GamesSlice';

const store = configureStore({
    reducer: {
        games: gamesReducer,
    }
});


export default store