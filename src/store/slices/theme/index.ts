import { ThemeConfig } from 'antd';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { antConfig } from 'src/constants/ant-config';

export enum THEME_MODES {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

interface IInitialState {
    mode: THEME_MODES,
    antConfig: ThemeConfig
}

const initialState: IInitialState = {
    mode: THEME_MODES.LIGHT,
    antConfig: antConfig(THEME_MODES.LIGHT)
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<THEME_MODES>) => {
            state.mode = action.payload;
            state.antConfig = antConfig(action.payload) as any;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer