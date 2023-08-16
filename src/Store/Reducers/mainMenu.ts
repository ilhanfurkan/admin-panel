import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainMenu {
    status: boolean;
    userInfo: any;
    userProfile: any;
    settings: boolean;
}

const initialState: MainMenu = {
    status: false,
    userInfo: {},
    userProfile: {},
    settings: false
};

export const mainMenu = createSlice({
    name: 'mainMenu',
    initialState,
    reducers: {
        close: (state) => {
            state.status = false;
        },
        closeSettings: (state) => {
            state.settings = false;
        },
        menuOpen: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload;
        },
        settingsOpen: (state, action: PayloadAction<boolean>) => {
            state.settings = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<boolean>) => {
            const { token, roles, username }: any = action.payload;

            token && localStorage.setItem('token', token);

            state.userInfo = action.payload;

            location.href = '/';
        },
        setUserProfile: (state, action: PayloadAction<boolean>) => {
            const { token, roles, username }: any = action.payload;

            state.userProfile = action.payload;
        }
    }
});

export default mainMenu;
