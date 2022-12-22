import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: "default"
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.username = action.payload
        }
    }
})

export const { setUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer