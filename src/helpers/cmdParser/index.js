export const cmdParser = (cmd) => {
  const matches = cmd.match(/-[a-z]\s[A-Za-z1-9#@]*/g)

  const matchesNoAt = matches.map((elem) => elem.replace('@', ''))

  return Object.fromEntries(
    matchesNoAt.map((elem) => {
      const destructCmd = elem.split(' ')
      return [...destructCmd]
    })
  )
}
