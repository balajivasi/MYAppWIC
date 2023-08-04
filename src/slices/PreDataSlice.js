import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Notifications: [],
    Appointments: []
};

const preDataSlice = createSlice({
    name: 'preData',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.Notifications = action.payload;
        },
        setAppointments: (state, action) => {
            state.Appointments = action.payload;
        },
    }
});


export const { setNotifications, setAppointments } = preDataSlice.actions;
export default preDataSlice.reducer;