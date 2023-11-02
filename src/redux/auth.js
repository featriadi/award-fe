import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const BASE_URL = 'http://localhost:8000'

export const setLogin = createAsyncThunk(
    'auth/login',
    async(data) => {
        const response = await axios.post(`${BASE_URL}/login`, data)

        return response.data
    }
)

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(setLogin.fulfilled, (state, action) => {
            const { data, accessToken, refreshToken } = action.payload
            state.user = data
            state.accessToken = accessToken
            state.refreshToken = refreshToken
        })
        .addCase(setLogin.rejected, (state, action) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
        })
    }
})

export default userSlice.reducer
