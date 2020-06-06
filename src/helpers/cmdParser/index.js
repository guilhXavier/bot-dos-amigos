import { popFirst } from '../popFirst'

export const cmdParser = (cmd) => {
  const matches = cmd
    .replace(/[@<>!&]/g, '')
    .match(/-[a-z]\s[A-Za-z0-9#@<>&!\s]*/g)

  return Object.fromEntries(
    matches.map((elem) => {
      const destructCmd = elem.split(' ')

      return [...destructCmd]
    })
  )
}
