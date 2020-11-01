import { MessagesState } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { messageAPI } from '../api/api';
import { AppThunk } from './store';

const initialState: MessagesState = {
  messages: [],
  partner: null,
  hasMore: false,
  isLoading: true
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

    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    resetMessagesState: () => {
      return initialState
    },
  },
});

export const { setMessages, addMessage, resetMessagesState, setMoreMessages, setIsLoading } = messagesSlice.actions;

export const getMessages = (partnerId: string): AppThunk => async dispatch => {
  dispatch(setIsLoading(true))
  const data = await messageAPI.getMessages(partnerId)
  dispatch(setMessages(data));
  dispatch(setIsLoading(false))
}

export const getMoreMessages = (partnerId: string, createdAt: Date): AppThunk => async dispatch => {
  dispatch(setIsLoading(true))
  const data = await messageAPI.getMessages(partnerId, createdAt)
  dispatch(setMoreMessages(data));
  dispatch(setIsLoading(false))
}

export const sendMessage = (partnerId: string, msg: string): AppThunk => async () => {
  await messageAPI.sendMessage(partnerId, msg)
}

export default messagesSlice.reducer;
