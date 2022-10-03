const express = require("express");
const app = express()
const userRoute = require('./userRoute')
const moviesRoute = require('./moviesRoute')
const bookingRoute = require('./bookingRoute');
const scheduleRoute = require('./scheduleRoute');
const authRoute = require('./authRoute')

app.use('/user', userRoute)
app.use('/movies', moviesRoute)
app.use('/booking', bookingRoute)
app.use('/schedule', scheduleRoute)
app.use('/auth', authRoute)




module.exports = app