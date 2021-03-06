const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const log = require('./log')

const ejsCompile = (templateName, data = {}, options = {}) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, options, (err, str) => {
      if (err) {
        reject(err)
        return
      }
      resolve(str)
    })
  })
}

const writeToFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error('the file already exists~')
    return
  }
  return fs.promises.writeFile(path, content)
}

const createDirSync = pathName => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // 不存在,判断父文件夹是否存在
    if (createDirSync(path.dirname(pathName))) {
      // 存在父文件，就直接新建该文件
      fs.mkdirSync(pathName)
      return true
    }
  }
}

module.exports = {
  ejsCompile,
  writeToFile,
  createDirSync,
}
