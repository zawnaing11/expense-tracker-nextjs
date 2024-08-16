import { Transaction } from "@/types/Transaction";
import getTransaction from "@/app/actions/getTransaction";
import TransactionItem from "./TransactionItem";

const TransactionList = async () => {
    const { transactions, error } = await getTransaction();
    console.log(transactions);
    if (error) {
        return <p className="error">{ error }</p>
    }

    return ( <>
        { transactions && transactions.length > 0 ? <h3>History</h3> : '' }
        <ul className="list">
            {
                transactions && transactions.map((transaction: Transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))
            }
        </ul>
    </> );
}

export default TransactionList;
