import { combineReducers, configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { slices } from 'src/store/slices';

import { login, register } from 'src/store/slices/auth';

const rootReducer = combineReducers(slices);

const listenerMiddleware = createListenerMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

listenerMiddleware.startListening({
    matcher: isAnyOf(login, register),
    effect: async (action, listenerApi) => {
        localStorage.setItem('auth', JSON.stringify((listenerApi.getState() as RootState)?.auth))
    },
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}


export default store;