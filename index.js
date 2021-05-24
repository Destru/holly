require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const cron = require('node-cron');
const fetch = require('node-fetch');

const complimentChannels = ['836963196916858902'];
const complimentEmoji = [':heart:', ':heart_eyes:', ':black_heart:', ':blue_heart:', ':brown_heart:', ':green_heart:', ':orange_heart:', ':purple_heart:', ':sparkling_heart:', ':white_heart:', ':yellow_heart:', ':smiling_face_with_3_hearts:', ':kiss:', ':kissing:', ':kissing_heart:', ':kissing_closed_eyes:', ':kissing_smiling_eyes:'];
const insultUsers = ['400786664861204481'];
const randomChance = 0.01;
const status = ['Back to Reality', 'Better Than Life', 'Gunmen of the Apocalypse', 'Play-by-mail Chess'];

cron.schedule('0 */4 * * *', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
      name: status[Math.floor(Math.random() * status.length)],
      type: 'PLAYING',
    }
  });
});

client.on('message', message => {
  if (insultUsers.includes(message.author.id) && Math.random() < randomChance) {
    fetch('https://insult.mattbas.org/api/insult.json')
      .then(response => response.json())
      .then(data => {
        message.channel.send(`${data.insult}, ${message.author}`);
      });
  }

  if (message.author.bot) return;

  if (complimentChannels.includes(message.channel.id) && Math.random() < randomChance) {
    fetch('https://complimentr.com/api')
      .then(response => response.json())
      .then(data => {
        let compliment = data.compliment.charAt(0).toUpperCase() + data.compliment.slice(1);
        let emoji = complimentEmojis[Math.floor(Math.random() * status.length)];

        message.channel.send(`${compliment}, ${message.author} ${emoji}`);
      });
  } else
  if (message.content.startsWith('!ping')) {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms`);
  }
});

client.on('ready', () => {
  console.log(`Holly ${process.env.npm_package_version || '(nodemon)'} is online.`);
  client.user.setPresence({
    status: 'online',
    activity: {
      name: `Destru's OnlyFans`,
      type: 'WATCHING',
    }
  });
});

client.login();