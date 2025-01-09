import { createSlice } from '@reduxjs/toolkit';

const separateSlice = createSlice({
    name: 'separate',
    initialState: {
        pending: [],
        solved: [],
        unsolved: [],
    },
    reducers: {
        setPending: (state, action) => {
            state.pending = action.payload;
        },
        setSolved: (state, action) => {
            state.solved = action.payload;
        },
        setUnsolved: (state, action) => {
            state.unsolved = action.payload;
        },
        addToSolvedAndRemoveFromUnsolved: (state, action) => {
            const complaint = action.payload;
            state.solved.push(complaint);
            state.unsolved = state.unsolved.filter(item => item._id !== complaint._id);
        },
        addToSolvedAndRemoveFromPending: (state, action) => {
            const complaint = action.payload;
            state.solved.push(complaint);
            state.pending = state.pending.filter(item => item._id !== complaint._id);
        },
        addToPendingAndRemoveFromUnsolved: (state,action) => {
            const complaint = action.payload;
            state.pending.push(complaint);
            state.unsolved = state.unsolved.filter(item => item._id !== complaint._id);
        }
    }
});

export const { setPending, setSolved, setUnsolved,addToSolvedAndRemoveFromUnsolved,addToSolvedAndRemoveFromPending,addToPendingAndRemoveFromUnsolved } = separateSlice.actions;
export default separateSlice.reducer;
