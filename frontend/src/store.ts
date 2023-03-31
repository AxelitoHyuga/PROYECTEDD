import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    userReducer
});

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch