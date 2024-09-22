import { combineReducers, configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { slices } from 'src/store/slices';
import { login, logout, register, setInitialUsers } from 'src/store/slices/auth';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(login, register, logout),
    effect: async (_, listenerApi) => {
        console.log((listenerApi.getState() as RootState).auth);
        localStorage.setItem('auth', JSON.stringify((listenerApi.getState() as RootState).auth))
    },
});

const store = configureStore({
    reducer: combineReducers(slices),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

store.dispatch(setInitialUsers());

export type { RootState, AppDispatch };
export { useAppDispatch, useAppSelector }
export default store;