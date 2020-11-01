import { RegisterFieldsType, UsersState } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersAPI } from '../api/api';
import { EmailAndPasswordType } from '../types';
import { AppThunk } from './store';
import { resetDialogsState } from './dialogs-reducer';
import { resetMessagesState } from './messages-reducer';

const initialState: UsersState = {
  users: [],
  currentUser: null,
  targetUser: null,
  totalUsers: null,
  loading: "with_pagination"
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },

    setTargetUser: (state, action) => {
      state.targetUser = action.payload
    },

    setLoading: (state, action: PayloadAction<"with_pagination" | "without_pagination" | null>) => {
      state.loading = action.payload
    },

    resetUsersState: (state) => {
      return initialState
    }
  },
});

export const { setUsers, setCurrentUser, setTargetUser, resetUsersState, setLoading } = usersSlice.actions;

export const getUsers = (props: Record<string, any>): AppThunk => async dispatch => {
  typeof props.page === "number" 
  ? dispatch(setLoading("without_pagination")) 
  : dispatch(setLoading("with_pagination"))
  const {users, totalUsers} = await usersAPI.getUsers({...props})
  dispatch(setUsers({users, totalUsers}));
  dispatch(setLoading(null))
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
  dispatch(resetUsersState());
  dispatch(resetDialogsState());
  dispatch(resetMessagesState());
}

export const getUserById = (id: string): AppThunk => async dispatch => {
  const data = await usersAPI.getUserById(id)
  dispatch(setTargetUser(data));
}

export default usersSlice.reducer;
