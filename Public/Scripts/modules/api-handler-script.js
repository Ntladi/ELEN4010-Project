'use strict'

const card = function (expenses, type) {
  const cardBox = document.createElement('div')
  const header = document.createElement('h2')
  const details = document.createElement('div')
  const cardType = document.createElement('p')
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
  details.classList = 'card-message-container'
  button.classList = 'card-button'
  buttonContainer.classList = 'card-button-container'

  header.textContent = expenses.description
  if (expenses.status === 'mine') {
    cardType.textContent = 'Type: My Posted Expense'
  } else { cardType.textContent = 'Type: My Pending Expense' }
  user.textContent = `Posted By: ${expenses.username}`
  amount.textContent = `Amount: R${expenses.amount}`
  date.textContent = `Date: ${expenses.dateAdded}`
  button.textContent = 'Settle'

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
    const expenses = await response.json()
    expenses.forEach((expense) => {
      const newCard = card(expense, 'Houesehold Expense')
      cardContainer.appendChild(newCard)
    })
  } catch (err) {
    console.log('fetch failed', err)
  }
}

export { listExpenses }
