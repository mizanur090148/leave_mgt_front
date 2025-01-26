import { createSlice } from "@reduxjs/toolkit";
import { AuthType } from "../../Types/Application/Auth/Auth";

const initialState: AuthType = {
  data: {
    username: "",
    password: "",
  },
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.data = action.payload;
    },
    signOut: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { signIn, signOut } = AuthSlice.actions;

export default AuthSlice.reducer;
