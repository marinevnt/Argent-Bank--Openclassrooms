import { createSlice } from '@reduxjs/toolkit'

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactions: [],
    },
    reducers: {
        getTransactions: (state, actions) => {
            console.log("Faking transactions data");
            state.transactions = [
                {
                    id: 0,
                    date: "01/11/2023",
                    description: "Restaurant",
                    amount: 282.79,
                    balance: 1302,
                    category: "Food",
                    note: "Expensive",
                    type: "Electronic"
                },
                {
                    id: 1,
                    date: "12/12/2023",
                    description: "Xbox",
                    amount: 500,
                    balance: 800,
                    category: "Numeric",
                    note: "Gift",
                    type: "Electronic"
                }            
            ];
        }
    }
});

export const { getTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;