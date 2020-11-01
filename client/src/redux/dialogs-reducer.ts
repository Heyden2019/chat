import { dialogAPI } from './../api/api';
import { DialogsState } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from './store';

const initialState: DialogsState = {
  dialogs: [],
  isLoading: true
};

export const messagesSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setDialogs: (state, action) => {
      state.dialogs = action.payload;
    },

    updateDialogs: (state, action) => {
      state.dialogs = state.dialogs.filter(dialog => dialog._id !== action.payload._id)
      state.dialogs = [action.payload, ...state.dialogs]
    },

    resetDialogsState: () => {
      return initialState
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }

    },
});

export const { setDialogs, updateDialogs, resetDialogsState, setIsLoading } = messagesSlice.actions;

export const getDialogs = (): AppThunk => async dispatch => {
    const data = await dialogAPI.getDialogs()
    dispatch(setIsLoading(true))
    dispatch(setDialogs(data.data));
    dispatch(setIsLoading(false))
}

export default messagesSlice.reducer;
