const mineflayer = require('mineflayer')
const express = require('express')

// Веб-сервер чтобы Render не спал
const app = express()
app.get('/', (req, res) => res.send('Bot is alive!'))
app.listen(8080, () => console.log('Web server running'))

// Настройки — замени HOST на адрес твоего Aternos сервера
const HOST = 'megasosalka.aternos.me'
const PORT = 16429
const USERNAME = 'AFK_Bot'

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: '1.20.1'
  })

  bot.on('spawn', () => console.log('Бот зашёл на сервер!'))
  bot.on('kicked', (reason) => {
    console.log('Кикнули:', reason)
    setTimeout(createBot, 5000) // переподключение через 5 сек
  })
  bot.on('error', (err) => {
    console.log('Ошибка:', err)
    setTimeout(createBot, 5000)
  })
  bot.on('end', () => {
    console.log('Отключился, переподключаюсь...')
    setTimeout(createBot, 5000)
  })
}

createBot()
