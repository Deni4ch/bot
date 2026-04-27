import minecraft_launcher_lib
import mineflayer
from flask import Flask
from threading import Thread

# Веб-сервер чтобы Render не усыплял
app = Flask('')

@app.route('/')
def home():
    return "Bot is alive!"

def run_web():
    app.run(host='0.0.0.0', port=8080)

Thread(target=run_web).start()

# Настройки — замени на свои
HOST = "megasosalka.aternos.me"
PORT = 16429
USERNAME = "AFK_Bot"

bot = mineflayer.createBot({
    'host': HOST,
    'port': PORT,
    'username': USERNAME,
    'version': '1.21.11'  # версия твоего сервера
})

@bot.on('spawn')
def on_spawn():
    print("Бот зашёл на сервер!")

@bot.on('kicked')
def on_kicked(reason):
    print(f"Бота кикнули: {reason}")

@bot.on('error')
def on_error(err):
    print(f"Ошибка: {err}")
