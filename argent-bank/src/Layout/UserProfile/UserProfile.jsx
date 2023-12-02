import React, { useState } from 'react';
import './UserProfile.css';
import { useSelector } from 'react-redux';
import { useDispatch} from "react-redux";
import { updateUsername } from "../../lib/redux/Slices/userSlice";
import { getTransactions } from '../../lib/redux/Slices/transactionSlice';
import TransactionItem from '../../components/Transactions/TransactionItems';

function UserProfile() {
    const { userName, firstName, lastName } = useSelector(state => state.user.profile);
    const token = useSelector(state => state.user.token);
    const [updatableUsername, setUpdatableUsername] = useState(userName);
    const [isEditing, setIsEditing] = useState(false);
    const accounts = useSelector(state => state.account.accounts);
    const transactions = useSelector(state => state.transaction.transactions);
    const [openedAccountId, setOpenedAccountId] = useState(null);
    const [openedTransactionId, setOpenedTransactionId] = useState(null);

    const dispatch = useDispatch();

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleSaveClick = () => {
        // sauvegarder les modifications
        console.log(typeof(updatableUsername));
        dispatch(updateUsername({token:token, userName:updatableUsername}));
        setIsEditing(false);
    };
    const handleCancelClick = () => {
        // annuler les modifications
        setIsEditing(false);
    };
    const handleAccountOnClick = (accountId) => {
        if(accountId === openedAccountId)
            setOpenedAccountId(null);
        else
            setOpenedAccountId(accountId);

        // useless, but with an API, it will retrieve transaction for give account id
        dispatch(getTransactions());
    };

    const handleTransactionOnClick = (transactionId) => {
        console.log("transacation on click");
        if(transactionId === openedTransactionId)
            setOpenedTransactionId(null)
        else
            setOpenedTransactionId(transactionId);
    };

    return (
        <main className="main bg-dark main-margin">
            <div className="header">
                {!isEditing && (
                    <h1>
                        Welcome back<br />
                        {firstName} {lastName}!
                    </h1>
                    )}
                {!isEditing && (
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                )}
                {isEditing && (
                    <form className='edit-form'>
                        <div>
                            <label htmlFor="username">User name:</label>
                            <input type="text" className='form-field' id="username" defaultValue={userName} onChange={(e) => setUpdatableUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="firstname">First name:</label>
                            <input type="text" className='form-field field-color' id="firstname" defaultValue={firstName} readOnly  />
                        </div>
                        <div>
                            <label htmlFor="lastname">Last name:</label>
                            <input type="text" className='form-field field-color' id="lastname" defaultValue={lastName} readOnly />
                        </div>
                        <div>
                            <button type='button' className="edit-button edit-action" onClick={handleSaveClick}>
                                Save
                            </button>
                            <button type='button' className="edit-button edit-action" onClick={handleCancelClick}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map(account => (
                    <div key={`account${account.id}`}>
                    <section className="account"  onClick={() => handleAccountOnClick(account.id)}>
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.title}</h3>
                            <p className="account-amount">${account.amount}</p>
                            <p className="account-amount-description">{account.description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section>
                        {openedAccountId === account.id &&
                        transactions.map(transaction => (
                            <TransactionItem key={`account${account.id}transaction${transaction.id}`} transaction={transaction} opened={transaction.id === openedTransactionId} onClick={() => handleTransactionOnClick(transaction.id)}/>
                        ))}
                    </section>
                    </div>
                ))}
        </main>
    );
}

export default UserProfile;