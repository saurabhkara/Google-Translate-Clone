import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name:'history',
    initialState:{
        items:[]
    },
    reducers:{
        addHistory:(state, action)=>{
           state.items.push(action.payload.item);
        },
        setHistory:(state, action)=>{
            state.items= action.payload.items
        },
        clearHistory:(state,action)=>{
            state.items =[]
        }
    }
})


export default historySlice.reducer;
export const {addHistory,setHistory,clearHistory} = historySlice.actions;