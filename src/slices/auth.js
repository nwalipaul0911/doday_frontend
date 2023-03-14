import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  value : {}
}

const authSlice = createSlice({
  name : "AuthToken",
  initialState : initialStateValue,
  reducers : {
    setToken : (state, action)=>{
      state.value = action.payload;
    },
    deleteToken : (state, action)=>{
      state.value = initialStateValue;
    }
  }
})
export const { setToken, deleteToken } = authSlice.actions;
export default authSlice.reducer;