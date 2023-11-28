import React, { useState } from 'react';
import './UserProfile.css';
import { useSelector } from 'react-redux';
import { useDispatch} from "react-redux";
import { updateUsername } from "../../lib/redux/Slices/userSlice";
import { getTransactions } from '../../lib/redux/Slices/transactionSlice';

function UserProfile() {
    const { userName, firstName, lastName } = useSelector(state => state.user.profile);
    const token = useSelector(state => state.user.token);
    const [updatableUsername, setUpdatableUsername] = useState(userName);
    const [isEditing, setIsEditing] = useState(false);
    const accounts = useSelector(state => state.account.accounts);
    const transactions = useSelector(state => state.transaction.transactions);
    const [transactionsOpened, setTransactionsOpened] = useState(false);

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
    const handleAccountOnClick = () => {
        let accountId = 0; //TODO: Récupérer id account
        dispatch(getTransactions());
        setTransactionsOpened(!transactionsOpened);
    }

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
                    <>
                    <section className="account" key={account.id} onClick={handleAccountOnClick}>
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
                        {transactionsOpened && transactions.map(transaction => (
                            <section className="transaction-table" key={transaction.id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.description}</td>
                                            <td>${transaction.amount}</td>
                                            <td>${transaction.balance}</td>
                                        </tr>
                                        <tr>
                                            <td className='thin-text'>Transaction Type</td>
                                            <td>{transaction.type}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td className='thin-text'>Category</td>
                                            <td>{transaction.category}</td>
                                            <td></td>
                                            <td></td>
                                            
                                        </tr>
                                        <tr>
                                            <td className='thin-text'>Note</td>
                                            <td>{transaction.note}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        ))}
                    </section>
                    </>
                ))}
        </main>
    );
}

export default UserProfile;