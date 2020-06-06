'use strict'

const newInputField = function (id, placeholder, labelText, required) {
  const field = document.createElement('input')
  const label = document.createElement('label')

  // set field attributes
  field.placeholder = placeholder
  field.setAttribute('id', id)
  field.setAttribute('name', id)
  field.required = required

  // set label attributes
  label.textContent = labelText
  label.htmlFor = id

  return [field, label]
}

const signUpForm = function () {
  // initialise DOM attributes for the signup form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const submitButton = document.createElement('button')

  // initialise all fields
  const nameField = newInputField('sign-up-name', 'Enter Name', 'Name', true)
  const surnameField = newInputField('sign-up-surname', 'Enter Surname', 'Surname', true)
  const usernameField = newInputField('sign-up-username', 'Enter Username', 'Username', true)
  const emailField = newInputField('sign-up-email', 'Enter Email', 'Email', true)
  const passField = newInputField('sign-up-password', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-content'
  form.action = '/create-user'
  form.method = 'post'

  // set container attributes
  container.classList = 'container'

  // set button attributes
  submitButton.textContent = 'Create Account'
  submitButton.setAttribute('type', 'submit')
  submitButton.classList = 'submitButton'

  // append DOM attributes to container
  container.appendChild(nameField[1])
  container.appendChild(nameField[0])
  container.appendChild(surnameField[1])
  container.appendChild(surnameField[0])
  container.appendChild(usernameField[1])
  container.appendChild(usernameField[0])
  container.appendChild(emailField[1])
  container.appendChild(emailField[0])
  container.appendChild(passField[1])
  container.appendChild(passField[0])
  container.appendChild(submitButton)

  // append container to form
  form.appendChild(container)

  return form
}
document.querySelector('#sign-up-box').appendChild(signUpForm())
