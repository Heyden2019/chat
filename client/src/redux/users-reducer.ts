import { RegisterFieldsType, UsersState } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { usersAPI } from '../api/api';
import { EmailAndPasswordType } from '../types';
import { AppThunk } from './store';

const initialState: UsersState = {
  users: [],
  currentUser: null,
  targetUser: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },

    setTargetUser: (state, action) => {
      state.targetUser = action.payload
    }
  },
});

export const { setUsers, setCurrentUser, setTargetUser } = usersSlice.actions;

export const getUsers = (): AppThunk => async dispatch => {
  const users = await usersAPI.getUsers()
  dispatch(setUsers(users.data));
  return [{msg: "dwq", param: 'wf'}]
};

export const login = (emailAndPassword: EmailAndPasswordType): AppThunk => dispatch => {
  return usersAPI.login(emailAndPassword)
  .then((data) => {
    if (data.errors) {
      return data.errors
    } else {
      dispatch(setCurrentUser(data));
    }
  })
  .catch(err => console.log(err))
}

export const register = (payload: RegisterFieldsType): AppThunk => dispatch => {
  return usersAPI.register(payload)
  .then((data) => {
    if (data.errors) {
      return data.errors
    } else {
      dispatch(setCurrentUser(data));
    }
  })
  .catch(err => console.log(err))
}

export const getCurrentUser = (): AppThunk => async dispatch => {
  const data = await usersAPI.getCurrentUser()
  dispatch(setCurrentUser(data));
  return data
}

export const logout = (): AppThunk => async dispatch => {
  await usersAPI.logout()
  dispatch(setCurrentUser(null));
}

export const getUserById = (id: number): AppThunk => async dispatch => {
  const data = await usersAPI.getUserById(id)
  dispatch(setTargetUser(data));
}

export default usersSlice.reducer;
