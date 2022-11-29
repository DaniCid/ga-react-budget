import React from 'react'
import { Modal, Button, Stack } from 'react-bootstrap'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContexts'
import { currencyFormatter } from '../utils/utils'

export default function ViewExpensesModal({ show, handleClose, budgetId }) {

  const { budgets, deleteBudget, getBudgetExpenses, deleteExpense } = useBudgets()

  function getBudgetItem( id ) {
    return budgets.find(budget => budget.id === id)
  }

  const budget = budgetId === UNCATEGORIZED_BUDGET_ID
  ? {name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID}
  : getBudgetItem( budgetId );
  
  // console.log(budgetObject)

  // const budgetName = budgetObject.map(budget => budget.name)

  const expenses = getBudgetExpenses(budgetId)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        Expenses {budget?.name}

        { budgetId !== UNCATEGORIZED_BUDGET_ID && (
          <Button
          onClick={ () => {
            deleteBudget(budget)
            handleClose()
          }}
          variant='outline-danger'
          >
          Erase
          </Button>
        )}
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap='3'>
          { expenses.map( expense => (
            <Stack direction='horizontal' gap='2' key={expense.id}>
              <div className='me-auto fs-4'>{expense.description}</div>
              <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
              <Button size='sm' variant='outline-danger' onClick={() => deleteExpense(expense)}>&times;</Button>
            </Stack>
          ) ) }
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
