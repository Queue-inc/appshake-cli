const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')

class AddCommand extends Command {
  async run() {
    const {args} = this.parse(AddCommand)
    ghdownload(args.repo, '.', err => {
      this.log(err ? 'Error' : 'Success')
    })
  }
}

AddCommand.description = 'Initialize your project with template reppsitory'

AddCommand.args = [{name: 'repo'}]

module.exports = AddCommand
