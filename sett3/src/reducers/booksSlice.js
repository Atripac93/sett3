import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState ={
    book:[],
    isLoading: false,
    error: null,
}
export const getBook =createAsyncThunk(
`book/GETbook`,
async()=>{
    try{
        const resp = await axios get("https://epibooks.onrender.com/")
        return await resp.data
    }catch(e){
        console.error(e.message)
    }
}
)
    
const booksSlice = createSlice({
    name:"books",
    initialState,
    extraReducers(builder) => {
        builder
        .addCase(getBooks.pending,(state)=>{
state.isLoading= true,
state.error= null,
        }
            )


    }
})