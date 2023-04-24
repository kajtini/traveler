import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types";

interface UserSliceState {
  user: User | null;
}

const initialState: UserSliceState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logOut: (state) => {
      state.user = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
