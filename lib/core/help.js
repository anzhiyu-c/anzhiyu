const program = require('commander')

const helpOptions = () => {
  // 增加自己的options
  program.option('-a --anzhiyu', 'a anzhiyu cli')

  program.option(
    '-d --dest <dest>',
    'a destination folder, 例如：-d /src/components'
  )
  program.option('-f --framework <framework>', 'your framework, 例如：vue3')
  program.on('--help', function () {
    console.log('')
    console.log('Other: ')
    console.log('   outer options')
  })
}

module.exports = helpOptions
