import { createSlice } from '@reduxjs/toolkit'

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        // fake transactions data
        transactions: [{
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
            category: "Hobbies",
            note: "Gift",
            type: "Electronic"
        }],

        categories: [
            "Food",
            "Travel",
            "Clothes",
            "Hobbies",
            "Health"
        ]
    },
    reducers: {
        setTransactionNote: (state, action) => {
            const {transactionId, note} = action.payload;
            const transaction = state.transactions.find(transaction => transactionId === transaction.id); 

            if(transaction)
            {
                transaction.note = note;
            }
            else
            {
                console.error("transaction " + transactionId + "not found");
            }
        },
        setTransactionCategory: (state, action) => {
            const {transactionId, category} = action.payload;
            const transaction = state.transactions.find(transaction => transactionId === transaction.id); 

            if(transaction)
            {
                transaction.category = category;
            }
            else
            {
                console.error("transaction " + transactionId + "not found");
            }
        },
    }
});

export const { getTransactions, setTransactionNote, setTransactionCategory } = transactionSlice.actions;
export default transactionSlice.reducer;