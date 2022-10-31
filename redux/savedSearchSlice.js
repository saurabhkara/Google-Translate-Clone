import { createSlice } from "@reduxjs/toolkit";

const savedSearchSlice = createSlice({
    name:'savedSearch',
    initialState:{
        items:[]
    },
    reducers:{
        addSavedSearch:(state, action)=>{
            state.items = action.payload;
        }
    }
})


export default savedSearchSlice.reducer;
export const {addSavedSearch} =savedSearchSlice.actions;