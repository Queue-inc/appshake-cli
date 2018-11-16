const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class HelloCommand extends Command {
  async run() {
    const name = await cli.prompt('What is your name?')
    this.log(name)
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = HelloCommand
