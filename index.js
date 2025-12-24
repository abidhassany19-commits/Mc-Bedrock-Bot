const mineflayer = require('mineflayer');
const { bedrock } = require('mineflayer-bedrock');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server is ready.'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'ItsBizzare.aternos.me', 
    port: 42778,
    username: 'RenderBotAFK',
    offline: true,
    version: false 
  });

  bedrock(bot);

  bot.on('spawn', () => {
    console.log('✅ Success: Bot is now in the server!');
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 30000);
  });

  bot.on('error', (err) => console.log('Error Message:', err.message));
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });
}

createBot();
