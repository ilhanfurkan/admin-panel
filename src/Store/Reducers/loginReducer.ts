import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DefaultReducer {
    jwt: string;
}

const initialState: DefaultReducer = {
    jwt: ''
};

export const loginReducer = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getJwtToken: (state, action: PayloadAction<string>) => {
            state.jwt = (action.payload as any)?.jwt;
            localStorage.setItem('token', (action.payload as any)?.jwt);
        }
    }
});

export default loginReducer;
