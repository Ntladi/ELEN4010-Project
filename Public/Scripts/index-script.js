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
  form.classList = 'modal-content'
  form.action = '/create-user'
  form.method = 'post'

  // set container attributes
  container.classList = 'container'
  buttons.classList = 'modal-buttons'

  // set heading attributes
  heading.textContent = 'Sign Up'

  // set button attributes
  submitButton.textContent = 'Create'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'signUp-cancel-button')
  submitButton.classList = 'submit-button'
  cancelButton.classList = 'cancel-button'

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
const LogInForm = function () {
  // initialise DOM attributes for the login form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')
  const emailButtun = document.createElement('button')

  // initialise the username and password field

  const usernameField = newInputField('loginUsername', 'Enter Username', 'Username', true)
  const passField = newInputField('loginUsernamePassword', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-content'
  form.action = '/logged-in'
  form.method = 'post'

  // set container attributes
  container.classList = 'container'
  buttons.classList = 'modal-buttons'

  // set heading attributes
  heading.textContent = 'Login'

  // set button attributes
  submitButton.textContent = 'Login'
  emailButtun.textContent = 'Login With Email'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  emailButtun.setAttribute('type', 'button')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'logIn-cancel-button')
  submitButton.classList = 'submit-button'
  emailButtun.classList = 'email-button'
  cancelButton.classList = 'cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
  buttons.appendChild(emailButtun)
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

const LogWithEmail = function () {
  // initialise DOM attributes for the login email form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')

  // initialise the field for email and password
  const emailField = newInputField('loginEmail', 'Enter Email', 'Email', true)
  const passField = newInputField('loginEmailPassword', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-content'
  form.action = '/logged-in'
  form.method = 'post'

  container.classList = 'container'
  buttons.classList = 'modal-buttons'

  heading.textContent = 'LogIn'

  // set button attributes
  submitButton.textContent = 'Login'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'email-cancel-button')
  submitButton.classList = 'submit-button'
  cancelButton.classList = 'cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
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
const signUpButton = document.querySelector('#sign-up-button')
signUpBox.appendChild(signUpForm())

const LogInBox = document.querySelector('#login-box')
const LogInButton = document.querySelector('#login-button')
LogInBox.appendChild(LogInForm())

const EmailBox = document.querySelector('#email-box')
const EmailButton = document.querySelector('.email-button')
EmailBox.appendChild(LogWithEmail())

const signUpCancelButton = document.querySelector('#signUp-cancel-button')
const logInCancelButton = document.querySelector('#logIn-cancel-button')
const emailCancelButton = document.querySelector('#email-cancel-button')

window.onclick = function (event) {
  if (event.target === signUpBox || event.target === signUpCancelButton) {
    signUpBox.style.display = 'none'
  }
  if (event.target === LogInBox || event.target === logInCancelButton) {
    LogInBox.style.display = 'none'
  }
  if (event.target === EmailBox || event.target === emailCancelButton) {
    EmailBox.style.display = 'none'
  }
  if (event.target === signUpButton) {
    signUpBox.style.display = 'block'
  }
  if (event.target === LogInButton) {
    LogInBox.style.display = 'block'
  }
  if (event.target === EmailButton) {
    EmailBox.style.display = 'block'
  }
}
