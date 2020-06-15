'use strict'

// load from external modules
const express = require('express') // load the express module
const app = express()
const bodyParser = require('body-parser') // load the body parser
const mainRouter = require('./Backend/mainRoutes.js') // load the main router

// tell express to use ejs as the view engine
app.set('view engine', 'ejs')
app.set('views', './Views')

// tell Express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/cdn', express.static('Public'))

// mount the router
app.use('/', mainRouter)

// start the node server
const port = process.env.PORT || 3000 // use the standard port (80) when deployed or 3000 when testing locally
app.listen(port) // start listening on the port
console.log('The server has started on port', port)
