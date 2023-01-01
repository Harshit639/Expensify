import { FlatList,Text } from 'react-native';
import Expenseitem from './expenselistitem';

function renderhandler(itemdata){
    return <Expenseitem {...itemdata.item}/>
}

function ExpenseList({expenses}){
   return(
    <FlatList data={expenses}
    renderItem={renderhandler}
    keyExtractor={(item)=>item.id}/>
   )
        
   
}

export default ExpenseList;


