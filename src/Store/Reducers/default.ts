import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DefaultReducer {
    list: object;
    item: object;
}

const initialState: DefaultReducer = {
    list: [],
    item: {}
};

export const defaultReducer = createSlice({
    name: 'default',
    initialState,
    reducers: {
        fillList: (state, action: PayloadAction<object>) => {
            state.list = action.payload;
        },
        fillItem: (state, action: PayloadAction<object>) => {
            state.item = action.payload;
        }
    }
});

export default defaultReducer;
