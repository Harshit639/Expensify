import {StyleSheet, Text,View} from 'react-native'
import { GlobalStyles } from '../constants/styles';
import ExpenseList from './expenselist';
import ExpenseSumary from './expensesummary';


function ExpenseOutput({expenseperiod,expenses,fallback}){
    let content = <Text style={styles.info}>{fallback}</Text>

    if(expenses.length>0){
        content = <ExpenseList expenses={expenses}/>
    }
    return (
        <View style={styles.container}>
            <ExpenseSumary expenseperiod={expenseperiod} expenses={expenses} />
            {content}
        </View>
    )

    
    
    
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: GlobalStyles.colors.primary700,
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
    },
    info:{
        fontSize:16,
        marginTop:20,
        textAlign:'center',
        color: 'white'
    }
})
export default ExpenseOutput;

