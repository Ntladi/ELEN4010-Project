/* eslint-env jest */
'use strict'

const accountProcess = require('../Backend/accountProcess')

test('A blank list of users is returned', () => {
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
