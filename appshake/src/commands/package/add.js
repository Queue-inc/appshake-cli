const {Command} = require('@oclif/command')
const ghdownload = require('download-git-repo')
const fs = require('fs')
const chalk = require('chalk')
const {cli} = require('cli-ux')
const execSync = require('child_process').execSync
const _ = require('lodash')

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
    const questions = _.filter(prompts, prompt => {
      return prompt.type === 'Question'
    })
    const actions = _.filter(prompts, prompt => {
      return prompt.type === 'Actions'
    })
    let answers = {}

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      const answer = await cli.prompt(question.text)
      answers[question.key] = answer
    }

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i]
      for (let k in answers) {
        if (answers.hasOwnPropery(k)) {
          action.replace(`$${k}`, answers[k])
        }
      }
      const result = execSync(action)
      this.log(result)
    }
  }
}

AddCommand.description = 'Initialize your project with template reppsitory'

AddCommand.args = [{name: 'repo'}]

module.exports = AddCommand
