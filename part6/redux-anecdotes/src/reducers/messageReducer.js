import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {        
            return state = action.payload
        },
        clearMessage(state, action) {
            return state = ""
        }
    }
})

export const { setMessage, clearMessage } = messageSlice.actions
export default messageSlice.reducer