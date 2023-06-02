import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './components/signin/userReducer';
import { boardsReducer } from './components/board/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    boards: boardsReducer
});

export const store = configureStore({
    reducer: {
        user: userReducer,
        boards: boardsReducer
    }
    // reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch