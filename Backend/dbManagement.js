const db = require('./dbConnect')
const accountProcess = require('./accountProcess')

const createUserQuery = function (user) {
  const command = 'INSERT INTO Users (firstName, lastName, username, email, password) '
  const formattedData = `VALUES ('${user.firstName}', '${user.lastName}', '${user.username}', '${user.email}', '${user.password}');`
  return command + formattedData
}

const passwordCompare = function (index, password, res) {
  const user = accountProcess.getList()[index]
  if (user.password === password) {
    res.send('Login Successful')
  } else { res.send('Invalid Password') }
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

module.exports.addUser = async function (details, res) {
  const user = accountProcess.createUser(details)
  try {
    await getList()
    if (!accountProcess.isUsernameUnique(user.username)) { res.send('Username ia Already Taken'); return }
    if (!accountProcess.isEmailUnique(user.email)) { res.send('Email is Already Taken'); return }
    if (!accountProcess.isUsernameValid(user.username)) { res.send('Invalid Username.'); return }
    if (!accountProcess.isEmailValid(user.email)) { res.send('Invalid Email Address.'); return }
    if (!accountProcess.isPasswordValid(user.username, user.password)) { res.send('Invalid Password.'); return }
    const pool = await db.pools
    await pool.request().query(createUserQuery(user))
    res.send(`User '${user.username}' Created.`)
  } catch (err) {
    console.log(err)
    res.send('Error Accessing Database, Please Try Again')
  }
}

module.exports.login = async function (details, res) {
  try {
    await getList()
    if ('loginUsername' in details) {
      const index = accountProcess.userNameExists(details.loginUsername)
      if (index !== -1) {
        passwordCompare(index, details.loginUsernamePassword, res)
      } else { res.send('Invalid Username.') }
    }
    if ('loginEmail' in details) {
      const index = accountProcess.emailExists(details.loginEmail)
      if (index !== -1) {
        passwordCompare(index, details.loginEmailPassword, res)
      } else { res.send('Invalid Username.') }
    }
  } catch (err) {
    console.log(err)
    res.send('Error Accessing Database, Please Try Again')
  }
}
