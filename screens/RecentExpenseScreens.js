import { useContext, useEffect, useState } from 'react';
import {Text} from 'react-native'
import ErrorOverlay from '../components/errorOverlay';
import ExpenseOutput from '../components/expenseoutput';
import LoadingOverlay from '../components/loadingOverlay';
import { ExpenseContext } from '../store/expense-context';
import { getdateminus } from '../util/formatteddate';
import { fetchData } from '../util/http';


function RecentExpenseScreen(){

    const [isFetching, setIsfetching] = useState(true);
    const expensecontext = useContext(ExpenseContext);
    const [error,setError] = useState();

    useEffect(()=>{
    async function getExpenses(){
        setIsfetching(true)
        try{
            const expenses = await fetchData()
            expensecontext.setExpense(expenses)
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

    const recentexpense = expensecontext.expenses.filter((expenses) =>{
        const today = new Date();
        const date7daysago = getdateminus(today,7)
        return expenses.date> date7daysago;
    })
    return(
        <ExpenseOutput expenses={recentexpense} expenseperiod="Last 7 days" fallback="No Registered Expenses for last 7 days"/>
    )
}

export default RecentExpenseScreen;