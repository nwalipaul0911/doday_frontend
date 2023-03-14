import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  value :[]
}
const tasksSlice = createSlice({
  name : 'tasks',
  initialState: initialStateValue,
  reducers: {
    setTask : (state, action)=>{
      state.value = action.payload
    }
  }
})
export const { setTask } = tasksSlice.actions;
export default tasksSlice.reducer;