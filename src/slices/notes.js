import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  value :[]
}
const notesSlice = createSlice({
  name : 'notes',
  initialState: initialStateValue,
  reducers: {
    setNote : (state, action)=>{
      state.value = action.payload
    }
  }
})
export const { setNote } = notesSlice.actions;
export default notesSlice.reducer;