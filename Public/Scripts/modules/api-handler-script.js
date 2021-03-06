'use strict'

const card = function (expenses, type) {
  const cardBox = document.createElement('div')
  const header = document.createElement('h2')
  const details = document.createElement('div')
  const cardType = document.createElement('p')
  const debtID = document.createElement('p')
  const amount = document.createElement('p')
  const user = document.createElement('p')
  const date = document.createElement('p')
  const buttonContainer = document.createElement('div')
  const button = document.createElement('button')

  if (expenses.status === 'mine') {
    cardBox.classList.add('card-box', 'my-expense')
    cardType.classList = 'my-expense-type'
  } else {
    cardBox.classList.add('card-box', 'pending-expense')
    cardType.classList = 'pending-expense-type'
  }
  cardBox.setAttribute('id', 'expense-box')
  header.classList = 'card-header'
  debtID.classList = 'debt-id'
  amount.classList = 'amount-details'
  user.classList = 'user-details'
  date.classList = 'date-details'
  details.classList = 'card-message-container'
  button.classList = 'card-button settle-button'
  buttonContainer.classList = 'card-button-container'

  header.textContent = expenses.description
  if (expenses.status === 'mine') {
    cardType.textContent = 'Type: My Posted Expense'
  } else { cardType.textContent = 'Type: My Pending Expense' }
  debtID.textContent = `${expenses.debtID}`
  user.textContent = `Posted By: ${expenses.username}`
  amount.textContent = `Amount: R${expenses.amount}`
  date.textContent = `Date: ${expenses.dateAdded}`
  button.textContent = 'Settle'
  debtID.style.display = 'none'

  details.appendChild(debtID)
  details.appendChild(cardType)
  details.appendChild(user)
  details.appendChild(amount)
  if (expenses.status !== 'mine') {
    const owed = document.createElement('p')
    owed.textContent = `Owed: R${expenses.owed}`
    details.appendChild(owed)
  }
  buttonContainer.appendChild(button)
  details.appendChild(date)
  cardBox.appendChild(header)
  cardBox.appendChild(details)

  if (expenses.status !== 'mine') {
    cardBox.appendChild(buttonContainer)
  }

  return cardBox
}

async function listExpenses (cardContainer) {
  try {
    const response = await window.fetch('/api/get-expenses')
    const responsed = await window.fetch('/api/get-debts')
    const expenses = await response.json()
    const debts = await responsed.json()
    console.log(debts)
    let username = ''
    expenses.forEach((expense) => {
      const newCard = card(expense, 'Houesehold Expense')
      if (newCard.classList.contains('my-expense')) {
        username = newCard.querySelector('.user-details').textContent.replace('Posted By: ', '')
      }
      const debtID = newCard.querySelector('.debt-id').textContent
      const description = newCard.querySelector('.card-header').textContent
      debts.forEach(debt => {
        if (debt.debtID === parseInt(debtID) &&
        debt.description === description && debt.payer === username) {
          newCard.classList = 'card-box settled-expense'
          const type = newCard.querySelector('.pending-expense-type')
          type.textContent = 'Type: My Settled Expense'
          type.classList = 'settled-expense-type'
          const dateSettled = document.createElement('p')
          dateSettled.textContent = `Settled on: ${debt.datePayed}`
          newCard.querySelector('.card-message-container').appendChild(dateSettled)
          newCard.querySelector('.card-button-container').style.display = 'none'
        }
      })
      cardContainer.appendChild(newCard)
    })
  } catch (err) {
    console.log('fetch failed', err)
  }
}

async function settleDebt (expense) {
  try {
    const userCard = document.querySelector('.my-expense')
    const username = userCard.querySelector('.user-details').textContent.replace('Posted By: ', '')
    const description = expense.querySelector('.card-header').textContent
    const expenseBox = expense.querySelector('.card-message-container')
    const debtID = expenseBox.querySelector('.debt-id').textContent
    const paying = expenseBox.querySelector('.user-details').textContent
    const details = {
      debtID: debtID,
      description: description,
      paying: paying.replace('Posted By: ', '')
    }
    console.log(details)
    const response = await window.fetch('/api/settle-debt', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    })
    const debts = await response.json()
    console.log(username)
    debts.forEach(debt => {
      if (debt.debtID === parseInt(debtID) &&
      debt.description === description && debt.payer === username) {
        expense.classList = 'card-box settled-expense'
        const type = expense.querySelector('.pending-expense-type')
        type.textContent = 'Type: My Settled Expense'
        type.classList = 'settled-expense-type'
        const dateSettled = document.createElement('p')
        dateSettled.textContent = `Settled on: ${debt.datePayed}`
        expense.querySelector('.card-message-container').appendChild(dateSettled)
        expense.querySelector('.card-button-container').style.display = 'none'
      }
    })
  } catch (err) {
    console.log('post failed', err)
  }
}

export { listExpenses, settleDebt }
