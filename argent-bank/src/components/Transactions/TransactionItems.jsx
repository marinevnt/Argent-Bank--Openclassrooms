import React, { useState } from 'react';
import './TransactionItems.css';

const TransactionItem = ({ transaction, opened, onClick }) => {
  console.log(opened);
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
            <button onClick={onClick}>click</button>
          </tr>
          {opened && <><tr>
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
          </>}
        </tbody>
      </table>
    </section>
  );
};

export default TransactionItem;