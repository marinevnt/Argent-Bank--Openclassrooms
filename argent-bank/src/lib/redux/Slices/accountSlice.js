import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: "account",
    initialState: {
        accounts: [],
    },
    reducers: {
        getAccounts: (state) => {
            console.log("Faking accounts data");
            state.accounts = [
                {
                    id: 0,
                    title: "Argent Bank Checking (x8349)",
                    amount: 2082.79,
                    description: "Available Balance"
                },
                {
                    id: 1,
                    title: "Argent Bank Savings (x6712)",
                    amount: 10928.42,
                    description: "Available Balance"
                },
                {
                    id: 2,
                    title: "Argent Bank Credit Card (x8349)",
                    amount: 184.30,
                    description: "Current Balance"
                }
            ];
        }
    }
});

export const { getAccounts } = accountSlice.actions;
export default accountSlice.reducer;