const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')
const fs = require('fs')
const chalk = require('chalk')
const {cli} = require('cli-ux')
const execSync = require('child_process').execSync

const CONFIG_PATH = 'asconfig.json'

class AddCommand extends Command {
  async run() {
    const {args} = this.parse(AddCommand)
    ghdownload(args.repo, '.', err => {
      if (err) this.log(chalk.red('Package install error'))
      // this.log(chalk.green('Package added!'))
      let configExists = true
      try {
        fs.accessSync(CONFIG_PATH)
      } catch (e) {
        this.log(e)
        configExists = false
      }

      if (configExists) {
        this.runConfig()
      }
    })
  }

  async runConfig() {
    this.log('Analyzing asconfig.json')
    const json = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
    const prompts = json.prompts
    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i]
      const answer = await cli.prompt(prompt.text)
      const commandString = prompt.action.replace('$answer', answer)
      const result = execSync(commandString)
      this.log(result)
    }
  }
}

AddCommand.description = 'Initialize your project with template reppsitory'

AddCommand.args = [{name: 'repo'}]

module.exports = AddCommand
