import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {        
            return state = action.payload
        },
        clearNotification(state, action) {
            return state = ""
        }
    }
})

export const setNotification = (string, time) => {
    return dispatch => {
        dispatch(updateNotification(string))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export const { updateNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer