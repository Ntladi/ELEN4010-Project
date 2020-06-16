'use strict'

const newInputField = function (id, placeholder, labelText, required) {
  const field = document.createElement('input')
  const label = document.createElement('label')

  // set field attributes
  field.placeholder = placeholder
  field.setAttribute('id', id)
  field.setAttribute('name', id)
  field.required = required
  field.setAttribute('type', 'text')

  // set label attributes
  label.textContent = labelText
  label.htmlFor = id

  return [field, label]
}

const signUpForm = function () {
  // initialise DOM attributes for the signup form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')

  // initialise all fields
  const nameField = newInputField('signUpName', 'Enter Name', 'Name', true)
  const surnameField = newInputField('signUpSurname', 'Enter Surname', 'Surname', true)
  const usernameField = newInputField('signUpUsername', 'Enter Username', 'Username', true)
  const emailField = newInputField('signUpEmail', 'Enter Email', 'Email', true)
  const passField = newInputField('signUpPassword', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-box'
  form.action = '/create-user'
  form.method = 'post'

  // set container attributes
  container.classList = 'submission-form'
  buttons.classList = 'modal-button-container'

  // set heading attributes
  heading.textContent = 'Sign Up'

  // set button attributes
  submitButton.textContent = 'Create'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'sign-up-cancel-button')
  submitButton.classList = 'modal-submit-button'
  cancelButton.classList = 'modal-cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
  buttons.appendChild(cancelButton)

  // append DOM attributes to container
  container.appendChild(heading)
  container.appendChild(line)
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
  container.appendChild(buttons)

  // append container to form
  form.appendChild(container)

  return form
}
const usernameLoginForm = function () {
  // initialise DOM attributes for the login form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')
  const emailButton = document.createElement('button')

  // initialise the username and password field

  const usernameField = newInputField('loginUsername', 'Enter Username', 'Username', true)
  const passField = newInputField('loginUsernamePassword', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-box'
  form.action = '/logged-in'
  form.method = 'post'

  // set container attributes
  container.classList = 'submission-form'
  buttons.classList = 'modal-button-container'

  // set heading attributes
  heading.textContent = 'Login'

  // set button attributes
  submitButton.textContent = 'Login'
  emailButton.textContent = 'Login With Email'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  emailButton.setAttribute('type', 'button')
  emailButton.setAttribute('id', 'login-email-button')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'username-cancel-button')
  submitButton.classList = 'modal-submit-button'
  emailButton.classList = 'modal-action-button'
  cancelButton.classList = 'modal-cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
  buttons.appendChild(emailButton)
  buttons.appendChild(cancelButton)

  // append DOM attributes to container
  container.appendChild(heading)
  container.appendChild(line)
  container.appendChild(usernameField[1])
  container.appendChild(usernameField[0])
  container.appendChild(passField[1])
  container.appendChild(passField[0])
  container.appendChild(buttons)

  // append container to form
  form.appendChild(container)

  return form
}

const emailLoginForm = function () {
  // initialise DOM attributes for the login email form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')
  const usernameButton = document.createElement('button')

  // initialise the field for email and password
  const emailField = newInputField('loginEmail', 'Enter Email', 'Email', true)
  const passField = newInputField('loginEmailPassword', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-box'
  form.action = '/logged-in'
  form.method = 'post'

  container.classList = 'submission-form'
  buttons.classList = 'modal-button-container'

  heading.textContent = 'Login'

  // set button attributes
  submitButton.textContent = 'Login'
  usernameButton.textContent = 'Login with Username'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  usernameButton.setAttribute('type', 'button')
  usernameButton.setAttribute('id', 'login-username-button')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'email-cancel-button')
  submitButton.classList = 'modal-submit-button'
  usernameButton.classList = 'modal-action-button'
  cancelButton.classList = 'modal-cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
  buttons.appendChild(usernameButton)
  buttons.appendChild(cancelButton)

  // append DOM attributes to container
  container.appendChild(heading)
  container.appendChild(line)
  container.appendChild(emailField[1])
  container.appendChild(emailField[0])
  container.appendChild(passField[1])
  container.appendChild(passField[0])
  container.appendChild(buttons)

  // append container to form
  form.appendChild(container)

  return form
}

const signUpBox = document.querySelector('#sign-up-box')
signUpBox.appendChild(signUpForm())
const usernameLoginBox = document.querySelector('#username-login-box')
usernameLoginBox.appendChild(usernameLoginForm())
const emailLoginBox = document.querySelector('#email-login-box')
emailLoginBox.appendChild(emailLoginForm())

const signUpButton = document.querySelector('#sign-up-button')
const loginButton = document.querySelector('#login-button')

const usernameButton = document.querySelector('#login-username-button')
const emailButton = document.querySelector('#login-email-button')

const signUpCancelButton = document.querySelector('#sign-up-cancel-button')
const logInCancelButton = document.querySelector('#username-cancel-button')
const emailCancelButton = document.querySelector('#email-cancel-button')

window.onclick = function (event) {
  if (event.target === signUpBox || event.target === signUpCancelButton) {
    signUpBox.style.display = 'none'
  }
  if (event.target === usernameLoginBox || event.target === logInCancelButton) {
    usernameLoginBox.style.display = 'none'
  }
  if (event.target === emailLoginBox || event.target === emailCancelButton) {
    emailLoginBox.style.display = 'none'
  }
  if (event.target === signUpButton) {
    signUpBox.style.display = 'block'
  }
  if (event.target === loginButton) {
    usernameLoginBox.style.display = 'block'
    emailLoginBox.style.display = 'none'
  }
  if (event.target === emailButton) {
    emailLoginBox.style.display = 'block'
    usernameLoginBox.style.display = 'none'
  }
  if (event.target === usernameButton) {
    usernameLoginBox.style.display = 'block'
    emailLoginBox.style.display = 'none'
  }
}
