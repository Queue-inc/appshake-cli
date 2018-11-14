const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')

class InitVueCommand extends Command {
  async run() {
    const {args} = this.parse(InitVueCommand)
    ghdownload(args.repo, '.', err => {
      this.log(err ? 'Error' : 'Success')
    })
  }
}

InitVueCommand.description = 'Initialize your project with template reppsitory'

InitVueCommand.args = [{name: 'repo'}]

module.exports = InitVueCommand
