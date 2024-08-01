import React from "react";
import { useState } from "react";
import './index.scss';
import DepositModal from "./DepositModal";
import WithDrawModal from "./WithDrawModal";
import moment from "moment";

const MyWallet = () => {

    const [amount, setAmount] = useState(0);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithDrawModal, setShowWithDrawModal] = useState(false);
    const [transactionData, setTransactionData] = useState([]);

    const depositHistory = (depositNumber) => {
        // update current amount
        setAmount(parseInt(depositNumber) + amount);

        // update transaction data
        const transactionTime = moment().format('DD MMMM, h:mm a');

        setTransactionData( 
            [ 
                ...transactionData, 
                {   

                    title: "Deposit",
                    amount: depositNumber,
                    time: transactionTime 
                } 
            ]
        );
    }

    const withDrawHistory = (withDrawAmount) => {
        // update current amount
        setAmount(amount - parseInt(withDrawAmount));

        // update transaction data
        const transactionTime = moment().format('DD MMMM, h:mm a');

        setTransactionData( 
            [ 
                ...transactionData, 
                {   

                    title: "Withdraw",
                    amount: withDrawAmount,
                    time: transactionTime 
                } 
            ]
        );
    }

    const numberToString = (number) =>{
        return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    return (
        <div className="wallet-app">
            <div className="container">
                <h1 className="mb-4">
                    My Wallet
                </h1>
                <h3 className="mb-2" style={{color: 'yellow'}}>{numberToString(amount) + ' $'}</h3>
                <h5 className="mb-4">Total balance</h5>
                <div className="actions d-flex mb-5">
                    <button className="btn btn-success" onClick={()=>setShowDepositModal(true)}>Deposit</button>
                    <button className="btn btn-danger" onClick={()=>setShowWithDrawModal(true)}>Withdraw</button>
                </div>
                <div className="transaction-history">
                    <h2>Transaction History</h2>
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                {transactionData && 
                                    transactionData.map((item, index) => {
                                        return (
                                            <tr key={index} className={item.title === "Deposit" ? "deposit" : "withdraw"}>
                                                <td>{item.title}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.time}</td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DepositModal 
                show={showDepositModal}
                handleClose={()=>setShowDepositModal(false)} 
                depositHistory = {depositHistory}
            />

            <WithDrawModal
                show={showWithDrawModal}
                handleClose={()=>setShowWithDrawModal(false)} 
                withDrawHistory = {withDrawHistory}
                currentAmount = {amount}
             />
        </div>
    )
}

export default MyWallet;