import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;//response data
            state.loading = false;
            state.error = false;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload

        },
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;//response data
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        clearError: (state) => {
            state.error = false;
        },
    },
});
export const { signInFailure, signInStart, signInSuccess,signUpStart,signUpFailure,signUpSuccess,clearError} = userSlicer.actions;
export default userSlicer.reducer;
