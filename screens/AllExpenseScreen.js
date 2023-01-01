import { useContext, useState, useEffect } from 'react';
import {Text} from 'react-native'
import ExpenseOutput from '../components/expenseoutput';
import { ExpenseContext } from '../store/expense-context';
import ErrorOverlay from '../components/errorOverlay';
import LoadingOverlay from '../components/loadingOverlay';
import { fetchData } from '../util/http';

function AllExpenseScreen(){
    const [isFetching, setIsfetching] = useState(true);
    const expensecotext = useContext(ExpenseContext);
    const [error,setError] = useState();

    useEffect(()=>{
    async function getExpenses(){
        setIsfetching(true)
        try{
            const expenses = await fetchData()
            expensecotext.setExpense(expenses)
        }catch(error){
            setError("Could not fetch expenses")
        }
        setIsfetching(false)
        
    }
    getExpenses()
    },[])


    if(error && !isFetching){
        return <ErrorOverlay message={error} />
    }
    if(isFetching){
        return <LoadingOverlay/>
    }

    return(
        <>
        <ExpenseOutput expenses={expensecotext.expenses} expenseperiod="ALL Expenses" fallback="No Registered Expenses" />
        </>
    )

}

export default AllExpenseScreen;