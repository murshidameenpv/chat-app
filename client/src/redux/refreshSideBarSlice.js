import { createSlice } from "@reduxjs/toolkit";

export const refreshSidebarSlice = createSlice({
  name: "refreshSidebarSlice",
  initialState: false,
  reducers: {
    refreshSidebarFun: (state) => {
          const newState = !state;
      return newState
    },
  },
});

export const { refreshSidebarFun } = refreshSidebarSlice.actions;
export default refreshSidebarSlice.reducer;
