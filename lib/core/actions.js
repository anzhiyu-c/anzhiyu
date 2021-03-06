const { promisify } = require('util')
const path = require('path')
const download = promisify(require('download-git-repo'))
const { vueRepo, vue3Repo } = require('../config/repo-config')
const { spawn } = require('../utils/terminal')
const log = require('../utils/log')
const { ejsCompile, writeToFile, createDirSync } = require('../utils/file')

const crateProjectAction = async (project, others) => {
  log.hint('anzhiyu help you create your project')
  // 1.clone项目
  await download(vueRepo, project, { clone: true })
  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await spawn(command, ['install'], { cwd: `./${project}` })
  // 3.运行npm run serve
  await spawn(command, ['run', 'serve'], { cwd: `./${project}` })
}

const crateVue3ProjectAction = async (project, others) => {
  log.hint('anzhiyu help you create vue3 your project')
  // 1.clone项目
  await download(vue3Repo, project, { clone: true })
  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await spawn(command, ['install'], { cwd: `./${project}` })
  // 3.运行npm run serve
  await spawn(command, ['run', 'serve'], { cwd: `./${project}` })
}

const handleEjsToFile = async (name, dest, template, filename, type) => {
  let routerDest = ''
  if (dest.slice(0, 10) == 'src/router') {
    routerDest = dest.slice(10)
    if (routerDest === '') routerDest = '/' + name
  }
  const data = {
    name,
    dest,
    lowerName: name.toLowerCase(),
    routerDest: routerDest,
  }
  // 1.获取模块引擎的路径
  const result = await ejsCompile(template, data)
  // 2.写入文件中
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (type != 'vue3') {
    // 判断文件不存在,那么就创建文件
    createDirSync(targetDest)
    const targetPath = path.resolve(targetDest, filename)
    writeToFile(targetPath, result)
  } else {
    // 判断文件不存在,那么就创建文件
    if (dest === 'src/router' || dest === 'src/views') {
      createDirSync(targetDest)
      const targetPath = path.resolve(targetDest, filename)
      writeToFile(targetPath, result)
    } else {
      createDirSync(dest)
      const targetPath = path.resolve(dest, filename)
      writeToFile(targetPath, result)
    }
  }
}

// 添加vue2组件的action
const addComponentAction = async (name, dest) => {
  handleEjsToFile(name, dest, 'vue-component.ejs', `${name}.vue`)
}

// 添加vue2页面的action
const addPageAndRouteAction = async (name, dest) => {
  addComponentAction(name, dest)
  handleEjsToFile(name, dest, 'vue-router.ejs', 'router.js')
}

// 添加vuex的action
const addStroeAction = async (name, dest) => {
  handleEjsToFile(name, dest, 'vue-store.ejs', 'index.js')
  handleEjsToFile(name, dest, 'vue-types.ejs', 'types.js')
}

// 添加vue3页面的action
const addPage3AndRouteAction = async (name, dest) => {
  handleEjsToFile(name, dest, 'vue3-component.ejs', `${name}.vue`, 'vue3')
  if (dest === 'src/views') {
    handleEjsToFile(name, `src/router`, 'vue3-router.ejs', `${name}.ts`, 'vue3')
  } else {
    handleEjsToFile(name, 'src/router' + dest.slice(9), 'vue3-router.ejs', `${name}.ts`, 'vue3')
  }
}

module.exports = {
  crateProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStroeAction,
  addPage3AndRouteAction,
  crateVue3ProjectAction,
}
