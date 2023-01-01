import {StyleSheet, Text,View} from 'react-native';
import { GlobalStyles } from '../constants/styles';

function ExpenseSumary({expenses,expenseperiod}){

    const expensesum = expenses.reduce((sum,expense) => {
    return expense.amount+sum},0)   
    return(
        <View style={styles.container}>
        <Text style={styles.period} >{expenseperiod}</Text>
        <Text style={styles.sum} >${expensesum.toFixed(2)}</Text>
      </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        padding:8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    period:{
        fontSize:12,
        color:GlobalStyles.colors.primary400,

    },
    sum:{
        fontSize:16,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary500,

    }
})

export default ExpenseSumary;
