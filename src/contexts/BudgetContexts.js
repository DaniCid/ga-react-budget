import React, { useContext } from "react"
import { v4 as uuid } from "uuid"
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBudgets() {
    return useContext(BudgetContext)
}

// Budget (objeto)
// id
// name
// max

// Expense (objeto)
// id
// IDpresupuesto
// descripcion
// cantidad

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    function getBudgetExpenses( budgetId ) {
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [ ...prevExpenses, { id: uuid(), description, amount, budgetId }]
        })
    }

    function addBudget({ name, max }) {
        setBudgets( prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name) ) {
                return prevBudgets
            }
            return [ ...prevBudgets, {id: uuid(), name, max }]
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    function deleteBudget({ id }) {
        const expenses = getBudgetExpenses(id)
        expenses.map( expense => deleteExpense(expense))
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteExpense,
            deleteBudget
        }}>
            {children}
        </BudgetContext.Provider>
    )
}