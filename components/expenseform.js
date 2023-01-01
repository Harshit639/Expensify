import Input from "./input";
import {StyleSheet, View,Text, Alert} from 'react-native'
import { useState } from "react";
import Button from "./Button";

function ExpenseForm({cancelhandler,buttonlabel,onsubmit,defaultval}){
    const [inputvalues,setinputvalues] = useState({
        amount:defaultval? defaultval.amount.toString() : '',
        date:defaultval? defaultval.date.toISOString().slice(0,10):'',
        description: defaultval?defaultval.description:''
    })

    function amountchangehandler(inputidentifier,enterdedvalue){
        setinputvalues((currInputValues) => {
            return {...currInputValues, [inputidentifier]: enterdedvalue} 
        })

    }

    function submitHandler(){
        const expenseData={
            amount: +inputvalues.amount,
            date: new Date(inputvalues.date),
            description: inputvalues.description
        }

        const amountValid = !isNaN(expenseData.amount) && expenseData.amount>0
        const datevalid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionvalid = expenseData.description.trim().length > 0

        if(!amountValid || !datevalid || !descriptionvalid){
            Alert.alert("Invalid Input", "Please check your input values")
            return
        }

        onsubmit(expenseData)

    }
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Your Expense</Text>
            <View style={styles.amtcontainer}>
            <Input label="Amount" style={styles.rowinput} textinputconfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountchangehandler.bind(this,'amount'),
                value: inputvalues.amount
            }}/>
            <Input label="Date" style={styles.rowinput}  textinputconfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: amountchangehandler.bind(this,'date'),
                value: inputvalues.date
            }}/>
            </View>
            <Input label="Description" textinputconfig={{
                multiline:true,
                onChangeText: amountchangehandler.bind(this,'description'),
                value: inputvalues.description
            }}/>
            <View style={styles.buttons}>
            <Button style={styles.buttonstyle}  mode='flat' onPress={cancelhandler}>Cancel</Button>
            <Button style={styles.buttonstyle} onPress={submitHandler}>{buttonlabel}</Button>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:40,
    },
    amtcontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowinput:{
        flex:1,
    },
    header:{
        color:'white',
        fontSize:24,
        marginBottom:12,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonstyle:{
        minWidth:150,
        marginHorizontal:8,

    }
})

export default ExpenseForm;

