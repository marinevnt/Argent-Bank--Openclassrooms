import React, { useState } from 'react';
import './UserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUsername } from "../../lib/redux/Slices/userSlice";
import AccountItem from '../../components/Account/Account';


function UserProfile() {
    const dispatch = useDispatch();
    const { userName, firstName, lastName } = useSelector(state => state.user.profile);
    const token = useSelector(state => state.user.token);
    const accounts = useSelector(state => state.account.accounts);
    
    const [updatableUsername, setUpdatableUsername] = useState(userName);
    const [isEditing, setIsEditing] = useState(false);
    const [openedAccountId, setOpenedAccountId] = useState(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // sauvegarder les modifications
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
                <AccountItem key={`account${account.id}`} account={account} opened={account.id === openedAccountId} onClick={() => handleAccountOnClick(account.id)}/>
            ))}
        </main>
    );
}

export default UserProfile;