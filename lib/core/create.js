const program = require('commander')
const {
  crateProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStroeAction,
  addPage3AndRouteAction,
  crateVue3ProjectAction,
} = require('./actions')
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(crateProjectAction)

  program
    .command('create3 <project> [others...]')
    .description('clone a repository into a folder')
    .action(crateVue3ProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: anzhiyu addcpn HelloWorld [-d src/components]')
    .action(name => {
      addComponentAction(name, `${program.opts().dest ?? 'src/components'}`)
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: anzhiyu addpage Home [-d src/pages]')
    .action(page => {
      addPageAndRouteAction(page, `${program.opts().dest ?? 'src/pages'}`)
    })

  program
    .command('addstore <store>')
    .description('add vue component, 例如: anzhiyu addstore Home -d src/store')
    .action(store => {
      addStroeAction(store, `${program.opts().dest ?? 'src/store/modules'}`)
    })

  program
    .command('add3page <vue3page>')
    .description('add vue3.0 page, 例如: anzhiyu add3page role [-d src/views/main/system/role]')
    .action(vue3page => {
      addPage3AndRouteAction(vue3page, `${program.opts().dest ?? 'src/views'}`)
    })
}

module.exports = createCommands
