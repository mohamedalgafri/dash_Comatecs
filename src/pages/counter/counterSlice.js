import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    name: "mohamed",
  },
  reducers: {
    addOne: (state) => {
      state.value += 1;
    },
    munOne: (state) => {
      state.value -= 1;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    // isCheck: (state, action) => {
    //   state.todos = state.todos.map((todo) =>
    //     todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
    //   );
    // },
  },
});

export const { addOne, munOne, changeName } = counterSlice.actions;
export default counterSlice.reducer;
