const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')

class InitCommand extends Command {
  async run() {
    const {args} = this.parse(InitCommand)
    ghdownload(args.repo, '.', err => {
      this.log(err ? 'Error' : 'Success')
    })
  }
}

InitCommand.description = 'Initialize your project with template reppsitory'

InitCommand.args = [{name: 'repo'}]

module.exports = InitCommand
