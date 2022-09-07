import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "task 1",
    description: "task 1 description",
    completed: true,
  },
  {
    id: "2",
    title: "task 2",
    description: "task 2 description",
    completed: false,
  },
];
const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    // aca creamos una funcion que nos permita actualizar el estado, es similar al state de use state
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound, 1));
      }
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const foundTask = state.find((task) => task.id === id);
      if (foundTask) {
        (foundTask.title = title), (foundTask.description = description);
      }
      console.log(action.payload);
    },
  },
});

//aca se exporta algo mas del reducer de manera especifica
export const { addTask, deleteTask, editTask } = taskSlice.actions;
//aca se exporta todo el reducer
export default taskSlice.reducer;
