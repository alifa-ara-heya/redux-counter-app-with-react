import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count = state.count + action.payload
        },
        decrement: (state, action) => {
            state.count = state.count - action.payload
        }
    }
})

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

/* 
Why counterSlice.reducer and not counterSlice.reducers?

Because:

reducers (plural) is just your input — an object containing individual reducer functions.

reducer (singular) is the output — a single function Redux uses to manage that slice of state. */