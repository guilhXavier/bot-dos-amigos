// $addtr -m @NickBola#123 -c @cargoInexistente

import { cmdParser } from '../cmdParser'

export function extractArgs(cmd) {
  const command = cmd.split(' ')[0]

  const args = cmdParser(cmd)

  return {
    command,
    args,
  }
}
