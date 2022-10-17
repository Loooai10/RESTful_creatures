//npm i express express-ejs-layouts
const express = require('express')
port = 3500

const ejsLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs');

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use((req,res, next) => {
    console.log('our own middleware')
    console.log(`Request for ${req.method} at ${req.path}`)
    next()
})
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: false}));
app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.listen(3500, ()=> {
    console.log('App listening on port 3500!')
})

