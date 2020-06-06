import { Client } from 'discord.js'

import { addToRole } from './commands'
import { PREFIX } from './constants'

const client = new Client()

client.on('message', async (msg) => {
  const { content, author } = msg

  const cmd = content.split(' ')[0].replace('$', '')

  const index = {
    addtr: addToRole,
  }

  if (author.bot) return

  if (!content.startsWith(PREFIX)) return

  try {
    index[cmd](msg)
  } catch (err) {
    console.log(err)
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

const token = 'NzE2NzQ1MTEyMTAwNzk4NTI2.XtQSKA.BqIEUZYfYyJjCBTvOZ79S0GeQNo'
client.login(token).catch((err) => console.log(err))
