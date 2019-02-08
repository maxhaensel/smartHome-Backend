const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000
let oldColor = 0

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.post('/changelight', (req, res) => {
  if (req.body.brightness !== oldColor) {
    const string = `{brightness: ${req.body.brightness}, start: ${oldColor} }`
    console.log(string)
    //   request.post(
    //     {
    //       headers: { 'content-type': 'application/json' },
    //       url: 'http://10.0.0.100/api/v1/state',
    //       body: `{brightness: ${req.body.brightness}, start: ${oldColor} }`
    //     },
    //     function(err, response, body) {
    //       if (err) console.log(err)
    //       console.log(response)
    //     }
    //   )
    oldColor = req.body.brightness
  }

  res.send('succ')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
