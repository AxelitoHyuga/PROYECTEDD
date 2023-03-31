import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { login } from '../services/userService';

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
    async ({ username, password }: { username: String, password: String }, { rejectWithValue, fulfillWithValue }) => {
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
            toast.loading('Loggin in');
            state = {
                ...state,
                requestStatus: 'logging in'
            };
        })
        .addCase(userLoginAsync.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Logged successful 👌');
            state = {
                ...state,
                data: action.payload.data,
                requestStatus: 'logged successful'
            };
            console.log(action.payload);
        })
        .addCase(userLoginAsync.rejected, (state, action) => {
            toast.dismiss();
            toast.error(`${action.payload} 🤯`, {
                onClose: () => {
                    state.requestError = null;
                }
            });
            state = {
                ...state,
                requestStatus: 'failed to login',
                requestError: action.payload
            };
        })
    }
});

export const userReducer = userSlice.reducer;

interface UserState {
    data: {
        userId: String,
        username: String,
        token: String,
    },
    loginIsSubmitted?: boolean,
    requestStatus?: String,
    requestError?: String | {} | unknown
}