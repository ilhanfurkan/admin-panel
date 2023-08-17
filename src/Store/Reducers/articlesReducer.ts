import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArticlesReducer {
    list: object;
    item: object;
}

const initialState: ArticlesReducer = {
    list: [],
    item: {}
};

export const articlesReducer = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getList: (state, action: PayloadAction<object>) => {
            state.list = action.payload;
        },
        getItem: (state, action: PayloadAction<object>) => {
            state.item = action.payload;
        }
    }
});

export default articlesReducer;
