import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContexts'
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';

function App() {

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showViewExpensesModal, setViewExpensesModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  function openViewExpensesModal(budgetId) {
    setViewExpensesModal(true)
    setViewExpensesModalBudgetId(budgetId)
  }

  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => openAddExpenseModal(0)}>Add Expenses</Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '16px',
            alignItems: 'flex-start'
          }}
        >
          { budgets.map( budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
              <BudgetCard
                key={ budget.id }
                name={ budget.name }
                amount={ amount } 
                max={ budget.max }
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesModal={() => openViewExpensesModal(budget.id)}
              />
            ) } ) }
            <UncategorizedBudgetCard 
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesModal={() => openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)}
            />
            <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => 
        setShowAddBudgetModal(false)
      }/>
      <AddExpenseModal show={showAddExpenseModal} handleClose={() => 
        setShowAddExpenseModal(false)
      } defaultBudgetId={addExpenseModalBudgetId} />
      <ViewExpensesModal show={showViewExpensesModal} handleClose={() => 
        setViewExpensesModal(false)
      } budgetId={ViewExpensesModalBudgetId}/>
    </>
  );
}

export default App;
