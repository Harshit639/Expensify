import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ManageExpenseScreen from './screens/ManageExpensescreen';
import AllExpenseScreen from './screens/AllExpenseScreen';
import RecentExpenseScreen from './screens/RecentExpenseScreens';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/IconButton';
import ExpenseContextProvider from './store/expense-context';


const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpenseOverview(){
  return(
    <BottomTabs.Navigator screenOptions={({navigation})=>({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight:({tintColor}) => <IconButton name="add" color={tintColor} size={24} onPress={()=>navigation.navigate('manageexpense')}/>
    })}>
      <BottomTabs.Screen name="recentexpense" component={RecentExpenseScreen}
       options={{
        title:'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color,size}) => <Ionicons size={size} color={color} name={'hourglass'}/>
      }}/>
      <BottomTabs.Screen name="allexpense" component={AllExpenseScreen}
      options={{
        title:'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color,size}) => <Ionicons size={size} color={color} name={'calendar'}/>
      }}/>
    
    </BottomTabs.Navigator>
  )
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor:GlobalStyles.colors.primary500},
          headerTintColor: 'white',
        }}>
          <Stack.Screen name='expenseoverview' component={ExpenseOverview} options={{headerShown: false}}/>
          <Stack.Screen name='manageexpense' component={ManageExpenseScreen} options={{
            presentation:'modal',
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
