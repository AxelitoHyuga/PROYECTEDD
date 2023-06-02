import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './userService';

const initialState: UserState = {
    data: {
        userId: '',
        username: '',
        token: '',
    },
    loginIsSubmitted: false,
}

export const userLoginAsync = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string, password: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await login(username, password);
        
            let state: UserState = {
                data: {
                    userId: res.data.id,
                    username: res.data.username,
                    token: res.data.jwtoken,
                }
            };

            return fulfillWithValue(state);
        } catch (e: any) {
            if (!e.response) {
                throw e;
            }

            throw rejectWithValue(e.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (state, action) => state = action.payload 
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLoginAsync.pending, (state) => {
            state = {
                ...state,
                requestStatus: 'logging in'
            };
        })
        .addCase(userLoginAsync.fulfilled, (state, action) => {
            state = {
                ...state,
                data: action.payload.data,
                requestStatus: 'logged successful'
            };
        })
        .addCase(userLoginAsync.rejected, (state, action) => {
            state = {
                ...state,
                requestStatus: 'failed to login',
                requestError: action.payload
            };
        })
    }
});

export const userReducer = userSlice.reducer;

export interface UserState {
    data: {
        userId: string,
        username: string,
        token: string,
    },
    loginIsSubmitted?: boolean,
    requestStatus?: string,
    requestError?: string | {} | unknown
}