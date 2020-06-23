'use strict'

const mssql = require('mssql')

const config = {
  server: 'billsplitter13.database.windows.net',
  database: 'BillSplitter13DB',
  user: process.env.databaseUsername,
  password: process.env.databasePassword,
  port: 1433,
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}

let isConnected = true
let connectionError = null
const pools = new mssql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to Database')
    return pool
  })
  .catch(err => {
    isConnected = false
    connectionError = err
    console.log(err)
  })
module.exports = {
  sql: mssql,
  pools: pools,
  isConnected: isConnected,
  connectionError: connectionError
}
