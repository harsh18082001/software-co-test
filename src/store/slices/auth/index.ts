import { toast } from 'react-toastify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { genrateId } from 'src/utils';
import { TOASTR_MSGS } from 'src/constants/toast-messages';
import { IInitialState, initial_users, IUser } from 'src/constants/initial-users';

const localAuth = localStorage.getItem('auth');

const initialState: IInitialState = localAuth ? JSON.parse(localAuth) : initial_users;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitialUsers: (state) => {
            localStorage.setItem('auth', JSON.stringify(state));
        },
        register: (state, action: PayloadAction<IUser>) => {
            if (!state.all_users.some(({ email }) => email === action.payload.email)) {
                state.all_users.push({ id: genrateId(), ...action.payload });
                toast.success(TOASTR_MSGS.REGISTERED);
            } else {
                toast.error(TOASTR_MSGS.ALREADY_EXIST);
            }
        },
        login: (state, action: PayloadAction<IUser>) => {
            const all_users = state.all_users
            const userExist = all_users.find(({ email, password }) => action.payload.email === email && action.payload.password === password);
            if (!!userExist) {
                state.current_user = userExist;
                toast.success(TOASTR_MSGS.LOGGED_IN);
            } else {
                toast.error(TOASTR_MSGS.INVALID_CREDENTIALS);
            }
        },
        logout: (state) => {
            state.current_user = null;
            toast.success(TOASTR_MSGS.LOGGED_OUT);
        }
    },
})

// Action creators are generated for each case reducer function
export const { setInitialUsers, register, login, logout } = authSlice.actions;
export default authSlice.reducer