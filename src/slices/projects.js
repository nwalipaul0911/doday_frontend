import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {value:[]}
const projectsSlice = createSlice({
  name : 'projects',
  initialState : initialStateValue,
  reducers : {
    setProjects : (state, action)=>{
      state.value = action.payload
    }
  }
})

export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;