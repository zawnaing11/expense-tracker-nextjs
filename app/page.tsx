import AddTrasaction from "@/components/AddTransaction";
import Guest from "@/components/Guest";
import { checkUser } from "@/lib/checkUser";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";

const HomePage = async () => {
  const user = await checkUser();

  if (!user) {
    return <Guest></Guest>
  }

  return ( <main>
    <h2>Welcome, {user.name}</h2>
    <Balance />
    <IncomeExpense />
    <AddTrasaction />
    <TransactionList />
  </main> );
}

export default HomePage;
