import { MessagesState } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { messageAPI } from '../api/api';
import { AppThunk } from './store';

const initialState: MessagesState = {
  messages: [],
  partner: null,
  hasMore: false
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
      state.partner = action.payload.partner;
      state.hasMore = action.payload.hasMore;
    },

    setMoreMessages: (state, action) => {
      state.messages = [...action.payload.messages, ...state.messages];
      state.partner = action.payload.partner;
      state.hasMore = action.payload.hasMore;
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

export const { setMessages, addMessage, setInitialMessagesState, setMoreMessages } = messagesSlice.actions;

export const getMessages = (partnerId: string): AppThunk => async dispatch => {
  const data = await messageAPI.getMessages(partnerId)
  dispatch(setMessages(data));
}

export const getMoreMessages = (partnerId: string, createdAt: Date): AppThunk => async dispatch => {
  const data = await messageAPI.getMessages(partnerId, createdAt)
  dispatch(setMoreMessages(data));
}

export const sendMessage = (partnerId: string, msg: string): AppThunk => async () => {
  await messageAPI.sendMessage(partnerId, msg)
}

export default messagesSlice.reducer;
