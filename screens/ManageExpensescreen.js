import {StyleSheet, View} from 'react-native'
import {useContext, useLayoutEffect, useState} from 'react'
import {Ionicons} from '@expo/vector-icons'
import { GlobalStyles } from '../constants/styles';
import Button from '../components/Button';
import { ExpenseContext } from '../store/expense-context';
import ExpenseForm from '../components/expenseform';
import { DeleteData, storeData, UpdateData } from '../util/http';
import LoadingOverlay from '../components/loadingOverlay';
import ErrorOverlay from '../components/errorOverlay';



function ManageExpenseScreen({route,navigation}){
    const expenseContext = useContext(ExpenseContext)
    const editedexpenseid = route.params?.expenseId;
    const isediting = !!editedexpenseid;
    const [issubmitting , setissubmitting] = useState(false);
    const [error,setError] = useState();

    const defaultvaliues = expenseContext.expenses.find((expense) => expense.id === editedexpenseid)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isediting? 'Edit Expense' : 'Add Expense'
        },[navigation,isediting])
    })

    async function deleteexpensehandler(){
        await DeleteData(editedexpenseid)
        expenseContext.deleteexpense(editedexpenseid)

        navigation.goBack();
    }
    function cancelhandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setissubmitting(true)
        try{
        if(isediting){
            expenseContext.updateExpense(editedexpenseid, expenseData)
            await UpdateData(editedexpenseid,expenseData)
        }else{
            const id =  await storeData(expenseData)
            expenseContext.addExpense({...expenseData, id : id})
        }
        navigation.goBack();
        }catch(error){
            setError("Could not Save Data")
        }
        setissubmitting(false)
       
    }



    if(error && !issubmitting){
        return <ErrorOverlay message={error} />
    }

    if(issubmitting){
        return <LoadingOverlay/>
    }
    
    return(
        <View style={styles.container}>
            <ExpenseForm buttonlabel={isediting? 'Update' : 'Add'} cancelhandler={cancelhandler} onsubmit={confirmHandler} defaultval={defaultvaliues}/>
            
        {isediting && (
            <View style={styles.deletecontainer}>
            <Ionicons name='trash' size={36} color={GlobalStyles.colors.error500} onPress={deleteexpensehandler}/>
            </View>
        )}
        </View>
    )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deletecontainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems:'center',
    },
 

})

export default ManageExpenseScreen;