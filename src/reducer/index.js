import {combineReducers} from 'redux'

let moduleMethods = {};
(function updateModules() {
  const requireModule = require.context('.', true, /^((?!index|\.unit\.).)*\.js$/)
  requireModule.keys().forEach((fileName) => {
    const moduleConfig = requireModule(fileName)
    const moduleName = (fileName.replace(/^\.\//, '').replace(/\.js/, ''))
    moduleMethods[moduleName] = moduleConfig.default || moduleConfig
  })
})()

// 自动引入模块中的js文件，并合并在reducer中
const reducers = combineReducers({
  ...moduleMethods
})

export default reducers