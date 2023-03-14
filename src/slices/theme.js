import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {value: localStorage.getItem('theme')}
const themeSlice = createSlice({
  name: 'theme',
  initialState: initialStateValue,
  reducers : {
    setTheme : (state, action)=>{
      state.value = action.payload
    },
  }
})
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;