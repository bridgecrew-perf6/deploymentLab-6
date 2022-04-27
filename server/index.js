const express = require('express')
const path = require('path')

const app = express()

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.js'))
})

const port = process.env.PORT || 4005

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})