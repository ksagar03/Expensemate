// import React from 'react'

// import { startOfMonth, endOfMonth, subMonths, parseISO, isWithinInterval } from 'date-fns'
// import { ExpenseDataDef } from '../viewAllExp/page'


// const FilterByDate = (expenses:ExpenseDataDef, range: string) => {

//     const now = new Date()
//     let start: Date
//     let end: Date =  now

//     switch(range){
//         case "This Month":
//             start = startOfMonth(now)
//             break
//         case "Last Month":
//             start = startOfMonth(subMonths(now, 1))
//             end = endOfMonth(subMonths(now, 1))
//             break
//         case "Last 3 Month":
//             start = startOfMonth(subMonths(now , 2 ))
//             break
//         default:
//             return expenses           

//     }

//     return expenses.filter(exp => {
//         const expDate = parseISO(exp.timestamp)
//         return isWithinInterval(expDate, {start, end})
//     } )

  
// }

// export default FilterByDate
