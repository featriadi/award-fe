import { configureStore } from "@reduxjs/toolkit"
import userReducer from './auth'
import awardReducer from './awards'

const store = configureStore({
    reducer: {
        user: userReducer,
        award: awardReducer,
    }
})

export default store