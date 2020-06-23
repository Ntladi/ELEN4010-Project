'use strict'

const card = function (expenses) {
  const cardBox = document.createElement('div')
  const header = document.createElement('h2')
  const details = document.createElement('div')
  const amount = document.createElement('p')
  const user = document.createElement('p')
  const date = document.createElement('p')

  cardBox.classList = 'card-box'
  cardBox.setAttribute('id', 'expense-box')
  header.classList = 'card-header'
  details.classList = 'card-message-container'

  header.textContent = expenses.description
  amount.textContent = `Amount: R${expenses.amount}`
  user.textContent = `User: ${expenses.username}`
  date.textContent = `Date: ${expenses.dateAdded}`
  // button.textContent = 'Settle'

  details.appendChild(amount)
  details.appendChild(user)
  details.appendChild(date)
  cardBox.appendChild(header)
  cardBox.appendChild(details)

  return cardBox
}

async function listExpenses (cardContainer) {
  try {
    const response = await window.fetch('/api/get-expenses')
    const expenses = await response.json()
    expenses.forEach((expense) => {
      const newCard = card(expense)
      cardContainer.appendChild(newCard)
    })
  } catch (err) {
    console.log('fetch failed', err)
  }
}

export { listExpenses }
