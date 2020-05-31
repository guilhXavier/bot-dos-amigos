export const cmdParser = (cmd) => {
  const matches = cmd.match(/-[a-z]\s[A-Za-z1-9#@]*/g)

  return Object.fromEntries(
    matches.map((elem) => {
      const destructCmd = elem.split(' ')
      return [...destructCmd]
    })
  )
}
