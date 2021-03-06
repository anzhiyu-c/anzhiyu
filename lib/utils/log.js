const consoleStyles = require('./consoleColor')

const hint = info => {
  console.log(consoleStyles.bold, info)
}

const error = info => {
  console.log(consoleStyles.red, info)
}

const clear = () => {
  console.clear()
}

module.exports = {
  hint,
  error,
  clear,
}
