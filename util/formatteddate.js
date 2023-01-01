function FormattedDate(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

export function getdateminus(date,days){
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()-days)
}

export default FormattedDate;