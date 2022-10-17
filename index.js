//npm i express express-ejs-layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs');

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}));

app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.listen(3500, ()=> {
    console.log('App listening on port 3500!')
})

