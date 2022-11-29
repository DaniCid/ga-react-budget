import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils/utils'

export default function BudgetCard( {name, amount, max, gray, onAddExpenseClick, hideButtons, onViewExpensesModal } ) {
  const classNames = []
  if( amount > max ) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if (gray) {
    classNames.push('bg-light')
  }

  return (
    <Card className={classNames.join(' ')}>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
              <div className='me-2'>{name}</div>
              <div className='d-flex align-items-baseline'>
                {currencyFormatter.format(amount)}{max && <span className='text-muted fs-6 ms-1'> / {currencyFormatter.format(max)}</span>}
              </div> 
            </Card.Title>
            {
              max &&
              <ProgressBar 
                className='rounded-pill' 
                variant={getBarVariant(amount, max)}
                min={0}
                max={max}
                now={amount}
              />
            }
            {
              !hideButtons &&
              <Stack direction='horizontal' gap='2'  className='mt-4'>
                <Button variant='outline-primary' onClick={onAddExpenseClick}>Add expenses</Button>
                <Button variant='outline-secondary' onClick={onViewExpensesModal}>View expenses</Button>
              </Stack>
            }
        </Card.Body>
    </Card>
  )
}

function getBarVariant(amount, max) {
  const radio = amount / max
  if( radio < 0.5 ) return 'primary'
  if( radio < 0.75 ) return 'warning'
  return 'danger'
}