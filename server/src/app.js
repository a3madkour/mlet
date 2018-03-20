const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
var mongoose = require('mongoose')

var posts = require('./routes/posts')
var experiments = require('./routes/experiments')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/posts',posts)
app.use('/experiments',experiments)
app.listen(process.env.PORT || 8081)
