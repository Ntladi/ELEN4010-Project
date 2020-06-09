'use strict'

// Private
let userList = []

// Public
module.exports = {
  isUsernameUnique: function (username_) {
    for (let i = 0; i !== userList.length; i++) {
      if (userList[i].username === username_) { return false }
    }
    return true
  },

  isUsernameValid: function (username_) {
    const validLength = 5
    if (username_.length < validLength) { return false }

    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const numbers = '0123456789'.split('')

    for (let i = 0; i !== username_.length; i++) {
      if ((alphabets.indexOf(username_[i].toLowerCase()) !== -1) || (numbers.indexOf(username_[i]) !== -1)) { continue } else { return false }
    }
    return true
  },

  isEmailUnique: function (email_) {
    for (let i = 0; i !== userList.length; i++) {
      if (userList[i].email === email_) { return false }
    }
    return true
  },

  isEmailValid: function (email_) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String((email_.toLowerCase())))
  },

  isPasswordValid: function (username_, password_) {
    const validLength = 5
    return (password_.length >= validLength && password_ !== username_)
  },

  createUser: function (info) {
    // Extracts user info and returns an object with the necessary info
    const userObj = {
      firstName: info.signUpName,
      lastName: info.signUpSurname,
      username: info.signUpUsername,
      email: info.signUpEmail,
      password: info.signUpPassword
    }

    return userObj
  },

  addUser: function (userObj) {
    // Pushes user object into user list
    userList.push(userObj)
  },

  getList: function () {
    return [...userList]
  },

  clearList: function () {
    userList = []
  }
}
