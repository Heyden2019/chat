import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from './users-reducer';
import messagesReducer from './messages-reducer';
import dialogsReducer from './dialogs-reducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
    dialogs: dialogsReducer,
  },
  devTools: true,
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
