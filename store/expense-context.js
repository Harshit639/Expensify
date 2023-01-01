import { createContext, useReducer} from 'react';


const dummy_expenses =[
    {
        id: 'e1',
        description: "A pair of pants",
        amount: 14.99,
        date: new Date("2022-10-19"),
    },
    {
        id: 'e2',
        description: "A pair of pants",
        amount: 14.99,
        date: new Date("2022-12-28"),
    },
    {
        id: 'e3',
        description: "A pair of pants",
        amount: 14.99,
        date: new Date("2022-10-19"),
    }
]


export const ExpenseContext= createContext({
    expenses:[],
    addExpense: ({description,amount,date}) => {},
    deleteexpense: (id) => {},
    setExpense: (expense) => {},
    updateExpense: (id,{description,amount,date}) => {},
});


function expenseReducer(state,action){
    switch(action.type){
        case 'ADD':
        
            return [action.payload, ...state];
        case 'UPDATE':
            const updatableindex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatabelexpense = state[updatableindex]
            const updateditem = {...updatabelexpense , ...action.payload.expenseData}
            const updatedexpense= [...state];
            updatedexpense[updatableindex]= updateditem
            return updatedexpense;
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}
function ExpenseContextProvider({children}){
    const [expenseState,dispatch] = useReducer(expenseReducer,[])
    function addExpense(expensedata){
        dispatch({type:'ADD', payload: expensedata})

    }
    function updateexpense(id,expensedata){
        dispatch({type:'UPDATE', payload: {id:id , expenseData:expensedata}})
    }
    function deleteexpense(id){
        dispatch({type:'DELETE', payload: id })

    }
    function setExpense(expense){
        dispatch({type:'SET',payload: expense})
    }

    const value={
        expenses:expenseState,
        addExpense: addExpense,
        deleteexpense: deleteexpense,
        updateExpense: updateexpense,
        setExpense: setExpense,
    }


    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider;

 