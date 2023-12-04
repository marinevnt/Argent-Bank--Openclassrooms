import React, { useState } from 'react';
import TransactionItem from '../Transactions/TransactionItems'; 
import { useSelector } from 'react-redux';

function AccountItem({ account, opened, onClick }) {
    const transactions = useSelector(state => state.transaction.transactions);
    const [openedTransactionId, setOpenedTransactionId] = useState(null);

    const handleTransactionOnClick = (transactionId) => {
        if(transactionId === openedTransactionId)
            setOpenedTransactionId(null)
        else
            setOpenedTransactionId(transactionId);
    };

    return(
        <div key={`account${account.id}`}>
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{account.title}</h3>
                <p className="account-amount">${account.amount}</p>
                <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button" onClick={onClick}>View transactions</button>
            </div>
        </section>
        <section>
            {opened &&
            transactions.map(transaction => (
                <TransactionItem key={`account${account.id}transaction${transaction.id}`} transaction={transaction} opened={transaction.id === openedTransactionId} onClick={() => handleTransactionOnClick(transaction.id)}/>
            ))}
        </section>
        </div>
    )
}

export default AccountItem;