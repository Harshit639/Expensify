import axios from 'axios';

export async function storeData(expenseData){
    const response = await axios.post(
        'https://react-native-course-32542-default-rtdb.firebaseio.com/expenses.json',
        expenseData
    )
    const id  = response.data.name
    return id

}

export async function fetchData(){
    const response = await axios.get('https://react-native-course-32542-default-rtdb.firebaseio.com/expenses.json')
    const expenses =[]
    console.log(response.data)

    for(const key in response.data){
        const expobj = {
            id:key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        console.log(expobj)
        expenses.push(expobj)
    }
    return expenses
    
}


export function UpdateData(id,expenseData){
    return axios.put('https://react-native-course-32542-default-rtdb.firebaseio.com' + `/expenses/${id}.json`, expenseData)
}

export function DeleteData(id){
    return axios.delete('https://react-native-course-32542-default-rtdb.firebaseio.com' + `/expenses/${id}.json`)
}