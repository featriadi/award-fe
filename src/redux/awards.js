import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:8000'

export const getAwards = createAsyncThunk(
    'getAwards',
    async() => {
        const token = Cookies.get('accessToken')
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        const response = await axios.get(`${BASE_URL}/awards`, config)

        const awards = response.data
        return awards
    }
)

const awardSlice = createSlice({
    name: 'award',
    initialState: [],
    extraReducers: (builder) => {
        builder
        .addCase(getAwards.fulfilled, (state, action) => {
            return action.payload.awards
        })
    }
})

export default awardSlice.reducer