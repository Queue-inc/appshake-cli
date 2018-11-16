const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')
const chalk = require('chalk')

class InitCommand extends Command {
  async run() {
    const {args} = this.parse(InitCommand)
    const repo = args.repo || 'Queue-Inc/appshake-template-vue'
    this.log('appshake starting init your project')
    ghdownload(repo, '.', err => {
      if (err) this.log(`appshake init finished with error : ${err}`)
      this.log(chalk.green('appshake init successfully completed.'))
    })
  }
}

InitCommand.description = 'Initialize your project with template reppsitory'

InitCommand.args = [{name: 'repo'}]

module.exports = InitCommand
