const express = require('express')
const path = require('path')


// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: '19b6ad7f2d784ba58232c5e9a6d4aacc',
    captureUncaught: true,
    captureUnhandledRejections: true,
})
// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express()


app.use(express.json())
app.use('/style', express.static('../index.css'))

let bitcoins = []

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.css'))
    rollbar.info('css file served successfully.')
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.js'))
})


app.post('/api/bitcoin', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = bitcoins.findIndex(bitcoinName=> bitcoinName === name)

    if(index === -1 && name !== ''){
        bitcoins.push(name)
        rollbar.log('Reason added successfully', {author: 'Trent', type: 'manual entry'})
        res.status(200).send(bitcoins)
    } else if (name === 'bitcoin'){
        rollbar.critical('please do not do that')
        res.status(400).send('idiot.')
    } else {
        rollbar.warning('reason already exists')
        res.status(400).send('that reason already exists')
    }

})


const port = process.env.PORT || 4005

app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})