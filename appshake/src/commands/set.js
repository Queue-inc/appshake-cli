const {Command} = require('@oclif/command')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const ENV_FILE_PATH = '.env'
const DEV_ENV_FILE_PATH = '.env.development'
const PREFIX_WEB = 'web' + path.sep
const PREFIX_ADMIN = 'admin' + path.sep

const createNewData = (data, key, value) => {
  let sameKeyFlag = false
  const varObjects = _.map(_.compact(data.split('\n')), line => {
    const keyValue = line.split(' = ')
    let obj = {}
    if (keyValue[0] === key) {
      sameKeyFlag = true
      obj =  {
        key: key,
        value: value,
      }
    } else {
      obj = {
        key: keyValue[0],
        value: keyValue[1],
      }
    }
    return obj
  })

  if (!sameKeyFlag) {
    varObjects.push({key: key, value: value})
  }
  const newLines = _.map(varObjects, obj => {
    return `${obj.key} = ${obj.value}`
  })

  return newLines.join('\n') + '\n'
}

class SetCommand extends Command {
  async run() {
    const {args} = this.parse(SetCommand)

    fs.readFile(ENV_FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        this.log(`Read error : ${err}`)
        return
      }
      const newData = createNewData(data, args.key, args.value)
      // prod
      fs.writeFile(ENV_FILE_PATH, newData, err => {
        if (err) {
          this.log(`write error ${err}`)
          return
        }
        this.log('SUCCESS')
      })
      fs.writeFile(PREFIX_WEB + ENV_FILE_PATH, newData, err => {
        if (err) {
          this.log(`write error ${err}`)
          return
        }
        this.log('SUCCESS')
      })
      fs.writeFile(PREFIX_ADMIN + ENV_FILE_PATH, newData, err => {
        if (err) {
          this.log(`write error ${err}`)
          return
        }
        this.log('SUCCESS')
      })
      // dev
      fs.writeFile(DEV_ENV_FILE_PATH, newData, err => {
        if (err) {
          this.log(`write error ${err}`)
          return
        }
        this.log('SUCCESS')
      })
      fs.writeFile(PREFIX_WEB + DEV_ENV_FILE_PATH, newData, err => {
        if (err) {
          this.log(`write error ${err}`)
          return
        }
        this.log('SUCCESS')
      })
      fs.writeFile(PREFIX_ADMIN + DEV_ENV_FILE_PATH, newData, err => {
        if (err) {
          this.log(`write error ${err}`)
          return
        }
        this.log('SUCCESS')
      })
    })
  }
}

SetCommand.description = 'Initialize your project with template reppsitory'

SetCommand.args = [{name: 'key'}, {name: 'value'}]

module.exports = SetCommand
