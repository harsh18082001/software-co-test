import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
    data: any;
    loading: boolean;
}

const initialState: IInitialState = { data: null, loading: false };

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        updateData: (state, action: PayloadAction<IInitialState>) => {
            state.data = action.payload.data;
            state.loading = action.payload.loading;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateData } = projectSlice.actions;
export default projectSlice.reducer