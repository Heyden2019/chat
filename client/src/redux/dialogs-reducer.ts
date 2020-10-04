import { dialogAPI } from './../api/api';
import { DialogsState } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from './store';

const initialState: DialogsState = {
  dialogs: [] 
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
    }

    },
});

export const { setDialogs, updateDialogs } = messagesSlice.actions;

export const getDialogs = (): AppThunk => async dispatch => {
    const data = await dialogAPI.getDialogs()
    dispatch(setDialogs(data.data));
}

export default messagesSlice.reducer;
