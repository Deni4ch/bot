const mineflayer = require('mineflayer')
const express = require('express')

const app = express()
app.get('/', (req, res) => res.send('Bot is alive!'))
app.listen(8080, () => console.log('Web server running'))

const HOST = 'megasosalka.aternos.me'
const PORT = 16429
const USERNAME = 'sdfsfsdfsdsd'

function createBot() {
  console.log(`Подключаюсь к ${HOST}:${PORT}...`)
  
const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false,
    auth: 'offline'  // ← добавь эту строку
  })

  bot.on('spawn', () => console.log('✅ Бот зашёл на сервер!'))
  
  bot.on('login', () => console.log('✅ Логин успешен!'))
  
  bot.on('kicked', (reason) => {
    console.log('❌ Кикнули:', JSON.stringify(reason))
    setTimeout(createBot, 5000)
  })
  
  bot.on('error', (err) => {
    console.log('❌ Ошибка:', err.message)
    setTimeout(createBot, 5000)
  })
  
  bot.on('end', (reason) => {
    console.log('🔌 Отключился. Причина:', reason)
    setTimeout(createBot, 5000)
  })

  bot._client.on('connect', () => console.log('🔗 TCP соединение установлено!'))
}

createBot()
