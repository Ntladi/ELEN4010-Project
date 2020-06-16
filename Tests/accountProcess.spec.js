/* eslint-env jest */
'use strict'

const accountProcess = require('../Backend/accountProcess')

test('A blank list of users is returned', () => {
  accountProcess.clearList()
  expect(accountProcess.getList()).toEqual([])
})

describe('Tests for uniqueness', () => {
  test('A username that does not exist in the list is unique', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameUnique('Gerald')).toEqual(true)
  })

  test('A username that already exists in the list is not unique', () => {
    accountProcess.clearList()
    const dummyUser = {
      signUpUsername: 'Gerald'
    }
    accountProcess.addUser(accountProcess.createUser(dummyUser))
    expect(accountProcess.isUsernameUnique('Gerald')).not.toEqual(true)
  })

  test('An email address that does not exist in the server is unique', () => {
    accountProcess.clearList()
    expect(accountProcess.isEmailUnique('geraldkirui8@gmail.com')).toEqual(true)
  })

  test('An email address that already exists in the list is not unique', () => {
    accountProcess.clearList()
    const dummyUser = {
      signUpEmail: 'geraldkirui8@gmail.com'
    }
    accountProcess.addUser(accountProcess.createUser(dummyUser))
    expect(accountProcess.isEmailUnique('geraldkirui8@gmail.com')).not.toEqual(true)
  })
})

describe('Tests for validity', () => {
  test('A valid email address is accepted.', () => {
    accountProcess.clearList()
    expect(accountProcess.isEmailValid('geraldkirui8@gmail.com')).toEqual(true)
  })

  test('An invalid email address is rejected.', () => {
    accountProcess.clearList()
    expect(accountProcess.isEmailValid('gerald.com')).not.toEqual(true)
  })

  test('A valid username is accepted.', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameValid('GeriKirui')).toEqual(true)
  })

  test('A username shorter than 5 characters is rejected.', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameValid('Geri')).not.toEqual(true)
  })

  test('A username with punctuation marks is rejected.', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameValid('GeriKirui!')).not.toEqual(true)
  })

  test('A valid password is accepted.', () => {
    accountProcess.clearList()
    expect(accountProcess.isPasswordValid('ICT56473', 'GeriKirui')).toEqual(true)
  })

  test('An invalid password is rejected.', () => {
    accountProcess.clearList()
    expect(accountProcess.isPasswordValid('GeriKirui', 'GeriKirui')).not.toEqual(true)
  })
})

describe('Tests for adding users to the private user list', () => {
  test('A user can be added to the list', () => {
    accountProcess.clearList()
    const userObj1 = {
      signUpName: 'Gerald',
      signUpSurname: 'Kirui',
      signUpUsername: 'GeriKirui',
      signUpEmail: 'geraldkirui8@gmail.com',
      signUpPassword: 'helloWorld'
    }

    accountProcess.addUser(accountProcess.createUser(userObj1))
    const retrievedObj = accountProcess.getList()[0]
    expect(retrievedObj.firstName).toEqual(userObj1.signUpName)
    expect(retrievedObj.lastName).toEqual(userObj1.signUpSurname)
    expect(retrievedObj.username).toEqual(userObj1.signUpUsername)
    expect(retrievedObj.email).toEqual(userObj1.signUpEmail)
    expect(retrievedObj.password).toEqual(userObj1.signUpPassword)
  })
})

describe('Tests for user login', () => {
  test('An empty list returns an invalid user', () => {
    accountProcess.clearList()
    const usernameIndex = accountProcess.userNameExists('Learn')
    const emailIndex = accountProcess.emailExists('leago89@gmail.com')
    expect(emailIndex).toEqual(-1)
    expect(usernameIndex).toEqual(-1)
  })

  test('The index of a valid user is returned from a populated list', () => {
    accountProcess.clearList()
    const userObj0 = {
      signUpName: 'Gerald',
      signUpSurname: 'Kirui',
      signUpUsername: 'GeriKirui',
      signUpEmail: 'geraldkirui8@gmail.com',
      signUpPassword: 'helloWorld'
    }
    const userObj1 = {
      signUpName: 'Learn',
      signUpSurname: 'Chiloane',
      signUpUsername: 'Chiloanel',
      signUpEmail: 'leago89@gmail.com',
      signUpPassword: 'hiPassword'
    }
    accountProcess.addUser(accountProcess.createUser(userObj0))
    accountProcess.addUser(accountProcess.createUser(userObj1))
    const usernameIndex0 = accountProcess.userNameExists('GeriKirui')
    const usernameIndex1 = accountProcess.userNameExists('Chiloanel')
    expect(usernameIndex0).toEqual(0)
    expect(usernameIndex1).toEqual(1)
    const emailIndex0 = accountProcess.emailExists('geraldkirui8@gmail.com')
    const emailIndex1 = accountProcess.emailExists('leago89@gmail.com')
    expect(emailIndex0).toEqual(0)
    expect(emailIndex1).toEqual(1)
  })

  test('The list of an invalid user is not returned from a populated list', () => {
    accountProcess.clearList()
    const userObj0 = {
      signUpName: 'Gerald',
      signUpSurname: 'Kirui',
      signUpUsername: 'GeriKirui',
      signUpEmail: 'geraldkirui8@gmail.com',
      signUpPassword: 'helloWorld'
    }
    const userObj1 = {
      signUpName: 'Learn',
      signUpSurname: 'Chiloane',
      signUpUsername: 'Chiloanel',
      signUpEmail: 'leago89@gmail.com',
      signUpPassword: 'hiPassword'
    }
    accountProcess.addUser(accountProcess.createUser(userObj0))
    accountProcess.addUser(accountProcess.createUser(userObj1))
    const usernameIndex = accountProcess.userNameExists('WrongPerson')
    const emailIndex = accountProcess.userNameExists('wrongPerson@email.com')
    expect(usernameIndex).toEqual(-1)
    expect(emailIndex).toEqual(-1)
  })

  test('Querying for a user does not alter the list', () => {
    accountProcess.clearList()
    let usernameIndex = accountProcess.userNameExists('GeriKirui')
    let emailIndex = accountProcess.emailExists('leago89@gmail.com')
    expect(usernameIndex).toEqual(-1)
    expect(emailIndex).toEqual(-1)
    expect(accountProcess.getList()).toEqual([])
    const userObj = {
      signUpName: 'Learn',
      signUpSurname: 'Chiloane',
      signUpUsername: 'Chiloanel',
      signUpEmail: 'leago89@gmail.com',
      signUpPassword: 'hiPassword'
    }
    accountProcess.addUser(accountProcess.createUser(userObj))
    usernameIndex = accountProcess.userNameExists('Chiloanel')
    emailIndex = accountProcess.emailExists('leago89@gmail.com')
    expect(usernameIndex).toEqual(0)
    expect(emailIndex).toEqual(0)
  })
})
