const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')
const exec = require('child_process').exec
const chalk = require('chalk')

class CreateCommand extends Command {
  async run() {
    const {args} = this.parse(CreateCommand)
    const repo = args.repo || 'Queue-Inc/appshake-template-vue#package/master'
    this.log('Fetching package boilerplate')
    exec('appshake init', (err, stdout) => {
      if (err) {
        this.log(err)
        return
      }

      this.log(stdout)

      ghdownload(repo, '.', err => {
        if (err) this.log(chalk.red(err))
        this.log(chalk.green('Package boilerplate created.'))
      })
    })
  }
}

CreateCommand.description = 'Initialize your project with template reppsitory'

CreateCommand.args = [{name: 'repo'}]

module.exports = CreateCommand
