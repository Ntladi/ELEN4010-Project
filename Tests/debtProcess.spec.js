/* eslint-env jest */
'use strict'

const debtProcess = require('../Backend/debtProcess')

test('A blank list of expenses is returned', () => {
  debtProcess.clearList()
  expect(debtProcess.getList()).toEqual([])
})

describe('Tests for amount validity', () => {
  test('A positive integer string is a valid amount', () => {
    expect(debtProcess.isAmountNumber('13')).toEqual(true)
  })
  test('A negative integer string is an invalid amount', () => {
    expect(debtProcess.isAmountNumber('-15')).not.toEqual(true)
  })
  test('Zero is not a valid amount', () => {
    expect(debtProcess.isAmountNumber('0')).not.toEqual(true)
  })
  test('A positive float string is a valid amount', () => {
    expect(debtProcess.isAmountNumber('12.45')).toEqual(true)
  })
  test('A negative float string is an invalid amount', () => {
    expect(debtProcess.isAmountNumber('-13.5')).not.toEqual(true)
  })
  test('A pure string of alphabets is an invalid amount', () => {
    expect(debtProcess.isAmountNumber('hello')).not.toEqual(true)
  })
  test('A string of alphanumeric characters is not a valid amount', () => {
    expect(debtProcess.isAmountNumber('123abc')).not.toEqual(true)
  })
  test('A string of alphanumeric characters with special characters is not a valid amount', () => {
    expect(debtProcess.isAmountNumber('$12.15')).not.toEqual(true)
  })
  test('Cecking amount validity does not alter the list of expenses', () => {
    const list = debtProcess.getList()
    expect(debtProcess.isAmountNumber('13')).toEqual(true)
    expect(debtProcess.getList()).toEqual(list)
  })
})

describe('Tests for creating an expense', () => {
  test('A new expense can be created', () => {
    const expenseFromClient = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    const newExpense = debtProcess.createExpense(expenseFromClient)
    expect(newExpense.description).toEqual(expenseFromClient.expenseDescription)
    expect(newExpense.amount).toEqual(expenseFromClient.expenseAmount)
    expect(newExpense.username).toEqual(expenseFromClient.username)
  })
  test('A new expense is automatically formatted', () => {
    const expenseFromClient = {
      expenseDescription: 'elECtRiCity',
      expenseAmount: '1520.1186534',
      username: 'NMohajane'
    }
    const newExpense = debtProcess.createExpense(expenseFromClient)
    expect(newExpense.description).toEqual('Electricity')
    expect(newExpense.amount).toEqual('1520.12')
  })
})

describe('Tests for adding expenses to the private list', () => {
  test('An expense can be added to an empty list', () => {
    debtProcess.clearList()
    const list = debtProcess.getList()
    const expenseFromClient = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    const newExpense = debtProcess.createExpense(expenseFromClient)
    debtProcess.addExpense(newExpense)
    expect(debtProcess.getList()).not.toEqual(list)
    expect(debtProcess.getList().length).toEqual(1)
    expect(debtProcess.getList()[0]).toEqual(newExpense)
  })
  test('Multiple expenses can be added to the list', () => {
    debtProcess.clearList()
    const list = debtProcess.getList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    const expense2 = {
      expenseDescription: 'Electricity',
      expenseAmount: '1500.60',
      username: 'GeriKirui'
    }
    const newExpense1 = debtProcess.createExpense(expense1)
    const newExpense2 = debtProcess.createExpense(expense2)
    debtProcess.addExpense(newExpense1)
    debtProcess.addExpense(newExpense2)
    expect(debtProcess.getList()).not.toEqual(list)
    expect(debtProcess.getList().length).toEqual(2)
    expect(debtProcess.getList()[0]).toEqual(newExpense1)
    expect(debtProcess.getList()[1]).toEqual(newExpense2)
  })
})

describe('Tests for querying expenses', () => {
  test('Querying an empty list return false', () => {
    debtProcess.clearList()
    expect(debtProcess.doesExpenseExist('Rent')).toEqual(false)
  })
  test('Querying for an existing expense returns true', () => {
    debtProcess.clearList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    debtProcess.addExpense(debtProcess.createExpense(expense1))
    expect(debtProcess.doesExpenseExist('Rent')).toEqual(true)
  })
  test('Querying for a non existant expense returns false', () => {
    debtProcess.clearList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    debtProcess.addExpense(debtProcess.createExpense(expense1))
    expect(debtProcess.doesExpenseExist('Electricity')).toEqual(false)
  })
  test('Querying for an existing expense works regardless of the query formatting', () => {
    debtProcess.clearList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    debtProcess.addExpense(debtProcess.createExpense(expense1))
    expect(debtProcess.doesExpenseExist('rent')).toEqual(true)
  })
})

describe('Tests for returning an expense', () => {
  test('A blank list returns a blank object', () => {
    debtProcess.clearList()
    expect(debtProcess.getExpense('Rent')).toEqual({})
  })
  test('An existing expense can be returned', () => {
    debtProcess.clearList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    const newExpense = debtProcess.createExpense(expense1)
    debtProcess.addExpense(newExpense)
    expect(debtProcess.getExpense('Rent')).toEqual(newExpense)
  })
  test('A non-existant expense is not returned', () => {
    debtProcess.clearList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    debtProcess.addExpense(debtProcess.createExpense(expense1))
    expect(debtProcess.getExpense('Electricity')).toEqual({})
  })
  test('An existing expense returned regarless of how the query is formatted', () => {
    debtProcess.clearList()
    const expense1 = {
      expenseDescription: 'Rent',
      expenseAmount: '200.00',
      username: 'NMohajane'
    }
    const newExpense = debtProcess.createExpense(expense1)
    debtProcess.addExpense(newExpense)
    expect(debtProcess.getExpense('rent')).toEqual(newExpense)
  })
})

test('A blank list of debts is returned', () => {
  debtProcess.clearDebtList()
  expect(debtProcess.getDebts()).toEqual([])
})

describe('Tests for adding a debt', () => {
  test('A debt can be added to the list', () => {
    debtProcess.clearDebtList()
    const date = new Date()
    const debt = {
      debtID: '1',
      description: 'Food',
      payer: 'GeriKirui',
      paid: 'ChiloaneL',
      datePayed: date.toLocaleString()
    }
    debtProcess.addDebt(debt)
    const debts = debtProcess.getDebts()
    expect(debts[0].debtID).toEqual(debt.debtID)
    expect(debts[0].description).toEqual(debt.description)
    expect(debts[0].payer).toEqual(debt.payer)
    expect(debts[0].paid).toEqual(debt.paid)
    expect(debts[0].datePayed).toEqual(debt.datePayed)
    expect(debts[0].datePayed).toEqual(date.toLocaleString())
  })
})

describe('Tests for comparing debts', () => {
  test('Debts where all fields have different values not the same', () => {
    debtProcess.clearDebtList()
    const date = new Date()
    const debt1 = {
      debtID: 1,
      description: 'Food',
      payer: 'GeriKirui',
      paid: 'ChiloaneL',
      datePayed: date.toLocaleString()
    }
    debtProcess.addDebt(debt1)
    const date2 = new Date()
    const debt2 = {
      debtID: '2',
      description: 'Food',
      payer: 'ChiloaneL',
      paid: 'GeriKirui',
      datePayed: date2.toLocaleString()
    }
    expect(debtProcess.doesDebtExist(debt2)).not.toEqual(true)
  })
  test('Debts where debtID fields are the same, but the payer fields arent are not the same', () => {
    debtProcess.clearDebtList()
    const date = new Date()
    const debt1 = {
      debtID: 1,
      description: 'Food',
      payer: 'GeriKirui',
      paid: 'ChiloaneL',
      datePayed: date.toLocaleString()
    }
    debtProcess.addDebt(debt1)
    const date2 = new Date()
    const debt2 = {
      debtID: '1',
      description: 'Food',
      payer: 'Ntladi',
      paid: 'ChiloaneL',
      datePayed: date2.toLocaleString()
    }
    expect(debtProcess.doesDebtExist(debt2)).not.toEqual(true)
  })
  test('Debts where debtID fields and payer fields are equal are the same', () => {
    debtProcess.clearDebtList()
    const date = new Date()
    const debt1 = {
      debtID: 1,
      description: 'Food',
      payer: 'GeriKirui',
      paid: 'ChiloaneL',
      datePayed: date.toLocaleString()
    }
    debtProcess.addDebt(debt1)
    const date2 = new Date()
    const debt2 = {
      debtID: '1',
      description: 'Food',
      payer: 'GeriKirui',
      paid: 'ChiloaneL',
      datePayed: date2.toLocaleString()
    }
    expect(debtProcess.doesDebtExist(debt2)).toEqual(true)
  })
})
