import React, { useState } from 'react';
import './TransactionItems.css';
import { useDispatch, useSelector } from "react-redux";
import { setTransactionNote, setTransactionCategory } from '../../lib/redux/Slices/transactionSlice';

function TransactionItem({ transaction, opened, onClick })
{
  const [isModifyingNote, setIsModifyingNote] = useState(false);
  const [isModifyingCategories, setIsModifyingCategories] = useState(false);
  const [editableNote, setEditableNote] = useState(transaction.note);
  const categories = useSelector(state => state.transaction.categories);
  const dispatch = useDispatch();

  const handleKeyEnterPressed = (event) => {
    if (event.key === 'Enter') {
      // if key pressed is Enter, then update transaction note
      if(editableNote) dispatch(setTransactionNote({transactionId:transaction.id, note:editableNote}));
      setIsModifyingNote(false);
    }
  }

  const handleCategorySelection = (event) => {
    let selectedCategory = event.target.value;
    dispatch(setTransactionCategory({transactionId:transaction.id, category:selectedCategory}));
    setIsModifyingCategories(false);
  }

  return (
    <section className="transaction-table">
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
            <td className='chevron-box'><i className="fa fa-chevron-down" aria-hidden="true" onClick={onClick}></i></td>
          </tr>
          {opened && <><tr>
            <td className='thin-text'>Transaction Type</td>
            <td>{transaction.type}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='thin-text'>Category</td>
            <td>
              { !isModifyingCategories ? <>{transaction.category}<i className="fa fa-pencil pen-item" onClick={() => setIsModifyingCategories(true)}></i></> : 
                <select onChange={handleCategorySelection}>
                  <option value="">
                    Sélectionnez une catégorie
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>        
              }
              
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='thin-text'>Note</td>
            <td> 
              { 
                !isModifyingNote ? 
                <>{transaction.note}<i className="fa fa-pencil pen-item" onClick={() => setIsModifyingNote(true)}></i></> : 
                <input  type="text"
                        value={editableNote} 
                        onChange={e => setEditableNote(e.target.value)} 
                        onKeyDown={handleKeyEnterPressed} >
                </input> 
              }
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </>}
        </tbody>
      </table>
    </section>
  );
};

export default TransactionItem;