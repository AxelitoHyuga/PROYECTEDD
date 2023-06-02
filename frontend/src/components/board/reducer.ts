import { createSlice } from "@reduxjs/toolkit";
import TaskCard from "../task/component";

const initialState: BoardState = {
    boards: [],
    boardActive: null,
};

export interface Task {
    id: string | null,
    title: string,
    description: string
}

export interface Board {
    id: string,
    name: string,
    tasks: Task[]
}

interface BoardState {
    boards: Board[],
    boardActive: Board | null
}

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        init: (state, action) => state = action.payload,
        setBoardActive: (state, action) => void(state.boardActive = action.payload),
        updateTasks: (state, action) => {
            if (state.boardActive != null) {
                state.boardActive.tasks = action.payload
            }
        },
        insertTask: (state, action) => {
            if (state.boardActive != null) {
                state.boardActive.tasks = [ ...state.boardActive.tasks, action.payload ]
            }
        },
        setBoards: (state, action) => void(state.boards = action.payload)
    },
});

export const { setBoardActive, updateTasks, insertTask, setBoards } = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;