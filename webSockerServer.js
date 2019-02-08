// wscat -c http://localhost:1234 --auth b:b

const WebSocket = require('ws')
const base64 = require('base-64')

const wss = new WebSocket.Server({ port: 3001, path: '/websocket' })
const userMap = new Map()
let currentVal = 0

exports.webSocketServer = () => {
  wss.on('connection', (ws, req) => {
    console.log('asd')
    // const auth = req.headers['authorization']
    // const pureAuthStr = auth.replace('Basic ', '').trim()
    // const username = base64.decode(pureAuthStr).split(':')[0]
    // const password = base64.decode(pureAuthStr).split(':')[1]
    var username = Math.random()

    const resultjson = JSON.stringify({
      value: currentVal
    })
    ws.send(resultjson)
    userMap.set(username, ws)

    ws.on('message', data => {
      console.log('message')
      try {
        json = JSON.parse(data)
      } catch (e) {
        console.log(e)
      }
      currentVal = json.value
      userMap.forEach(obj => {
        const resultjson = JSON.stringify({
          value: json.value
        })
        obj.send(resultjson)
      })
    })

    ws.on('close', () => {
      userMap.delete(username)
      console.log('Client beendet Verbindung')
    })
  })
}
