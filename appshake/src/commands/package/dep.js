const {Command} = require('@oclif/command')
const exec = require('child_process').exec
const fs = require('fs')

const CONFIG_PATH = 'asconfig.json'

let asconfigBase = {
  dependencies: {},
  prompts: {},
}

class DepCommand extends Command {
  async run() {
    const {args} = this.parse(DepCommand)
    // this.log(process.cwd())
    if (!args.package) {
      this.log('ERROR: specify node package name')
      return
    }
    const packageName = args.package
    const version = args.version || 'latest'

    let configExists = true
    try {
      fs.accessSync(CONFIG_PATH)
    } catch (e) {
      this.log(e)
      configExists = false
    }
    let newJson = {}
    if (configExists) {
      this.log('config exists')
      newJson = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
    } else {
      this.log('config not exists')
      // ない場合には新しく作る
      newJson = Object.assign({}, asconfigBase)
    }

    newJson.dependencies[packageName] = version

    fs.writeFile(CONFIG_PATH, JSON.stringify(newJson, null, 2), err => {
      // 書き出しに失敗した場合
      if (err) {
        this.log('ERROR: ' + err)
        throw err
      } else {
        this.log('asconfig file successfully updated')
      }
    })
    exec(`npm install -D ${args.package}`, (err, stdout) => {
      if (err) {
        this.log(err)
        return
      }

      this.log(stdout)
      this.log('installation finished')
    })
  }
}

DepCommand.description = 'Initialize your project with template reppsitory'

DepCommand.args = [{name: 'package'}, {name: 'version'}]

module.exports = DepCommand
