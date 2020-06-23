'use strict'

const card = function (expenses) {
  const cardBox = document.createElement('div')
  const header = document.createElement('h2')
  const details = document.createElement('div')
  const amount = document.createElement('p')
  const user = document.createElement('p')
  const date = document.createElement('p')
  const buttonContainer = document.createElement('div')
 // const button = document.createElement('button')

  cardBox.classList = 'card-box'
  cardBox.setAttribute('id', 'expense-box')
  header.classList = 'card-header'
  details.classList = 'card-message-container'
  //button.classList = 'card-button'
  //buttonContainer.classList = 'card-button-container'

  header.textContent = expenses.description
  amount.textContent = `Amount: R${expenses.amount}`
  user.textContent = `User: ${expenses.user}`
  date.textContent = `Date: ${expenses.date}`
  //button.textContent = 'Settle'

  details.appendChild(amount)
  details.appendChild(user)
  details.appendChild(date)
  //buttonContainer.appendChild(button)
  cardBox.appendChild(header)
  cardBox.appendChild(details)
 // cardBox.appendChild(buttonContainer)

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
