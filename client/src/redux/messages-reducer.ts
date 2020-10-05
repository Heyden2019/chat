import { MessagesState } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { messageAPI } from '../api/api';
import { AppThunk } from './store';

const initialState: MessagesState = {
  messages: [],
  partner: null
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
      state.partner = action.payload.partner;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },

    setInitialMessagesState: (state) => {
      state.messages = []
      state.partner = null
    }

    },
});

export const { setMessages, addMessage, setInitialMessagesState } = messagesSlice.actions;

export const getMessages = (partnerId: string): AppThunk => async dispatch => {
  const data = await messageAPI.getMessages(partnerId)
  dispatch(setMessages(data));
}

export const sendMessage = (partnerId: string, msg: string): AppThunk => async () => {
  await messageAPI.sendMessage(partnerId, msg)
}

export default messagesSlice.reducer;
