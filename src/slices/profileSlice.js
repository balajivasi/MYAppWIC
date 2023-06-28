import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  fullName: null,
  globalError: "",
  Token: null,
  language: 'en',
  EBTCardNumber: null,
  ScannedUPC: null
};

export const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfileFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
    },
    setToken: (state, action) => {
      state.Token = action.payload;
    },
    setClearProfileData: (state) => {
      state.Token = null;
      state.email = null;
      state.fullName = null;
      state.globalError = null;
    },
    setProfileLanguage: (state, action) => {
      state.language = action.payload;
    },
    setEBTCardNumber: (state, action) => {
      state.EBTCardNumber = action.payload;
    },
    setScannedUPC: (state, action) => {
      state.ScannedUPC = action.payload;
    },
  },
});

export const { setProfileEmail, setProfileFullName, setGlobalError, setClearProfileData, setToken, setProfileLanguage, setEBTCardNumber, setScannedUPC } = profileSlice.actions;
export default profileSlice.reducer;
