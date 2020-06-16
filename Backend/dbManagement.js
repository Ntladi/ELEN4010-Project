const db = require('./dbConnect')
const accountProcess = require('./accountProcess')

const createUserQuery = function (user) {
  const command = 'INSERT INTO Users (firstName, lastName, username, email, password) '
  const formattedData = `VALUES ('${user.firstName}', '${user.lastName}', '${user.username}', '${user.email}', '${user.password}');`
  return command + formattedData
}

const passwordCompare = function (index, password, req, res) {
  const user = accountProcess.getList()[index]
  if (user.password === password) {
    req.session.user = { firstName: user.firstName, username: user.username }
    res.redirect('/home')
  } else {
    const message = 'Please try again'
    res.render('invalid_credentials.ejs', { error: 'Invalid Password', message: message, tips: [] })
  }
}

async function getList () {
  try {
    const pool = await db.pools
    const users = await pool.request().query('SELECT * FROM Users')
    accountProcess.clearList()
    users.recordset.forEach(user => {
      accountProcess.addUser(user)
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports.addUser = async function (details, req, res) {
  const user = accountProcess.createUser(details)
  try {
    await getList()
    if (!accountProcess.isUsernameUnique(user.username)) {
      const message = `The username for '${user.username}' already exists.`
      res.render('invalid_credentials.ejs', { error: 'Invalid Username', message: message, tips: [] })
      return
    }
    if (!accountProcess.isEmailUnique(user.email)) {
      const message = `The email address for '${user.email}' already exists.`
      res.render('invalid_credentials.ejs', { error: 'Invalid Email Address', message: message, tips: [] })
      return
    }
    if (!accountProcess.isUsernameValid(user.username)) {
      const message = `The username '${user.username}' cannot be used. A valid username must:`
      const tips = ['Have a minimum length of 5 alphanumeric characters', 'Not be the same as the password']
      res.render('invalid_credentials.ejs', { error: 'Invalid Username', message: message, tips: tips })
      return
    }
    if (!accountProcess.isEmailValid(user.email)) {
      res.render('invalid_credentials.ejs', { error: 'Invalid Email Address', message: '', tips: [] })
      return
    }
    if (!accountProcess.isPasswordValid(user.username, user.password)) {
      const message = 'The password is invalid. A valid password must:'
      const tips = ['Have a minimum length of 5 alphanumeric characters', 'Not be the same as the username']
      // const info = { message: message, tips: tips }
      res.render('invalid_credentials.ejs', { error: 'Invalid Password', message: message, tips: tips })
      return
    }
    const pool = await db.pools
    await pool.request().query(createUserQuery(user))
    req.session.user = { firstName: user.firstName, username: user.username }
    res.redirect('/home')
  } catch (err) {
    console.log(err)
    const message = 'Please Try Again'
    res.render('invalid_credentials.ejs', { error: 'Error Accessing Database', message: message, tips: [] })
  }
}

module.exports.login = async function (details, req, res) {
  try {
    await getList()
    if ('loginUsername' in details) {
      const index = accountProcess.userNameExists(details.loginUsername)
      if (index !== -1) {
        passwordCompare(index, details.loginUsernamePassword, req, res)
      } else {
        const message = `The username for '${details.loginUsername}' does not exist.`
        res.render('invalid_credentials.ejs', { error: 'Invalid Username', message: message, tips: [] })
      }
    }
    if ('loginEmail' in details) {
      const index = accountProcess.emailExists(details.loginEmail)
      if (index !== -1) {
        passwordCompare(index, details.loginEmailPassword, req, res)
      } else {
        const message = `The email address for '${details.loginEmail}' does not exist.`
        res.render('invalid_credentials.ejs', { error: 'Invalid Email', message: message, tips: [] })
      }
    }
  } catch (err) {
    console.log(err)
    const message = 'Please Try Again'
    res.render('invalid_credentials.ejs', { error: 'Error Accessing Database', message: message, tips: [] })
  }
}
