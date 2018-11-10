import {Command, flags} from '@oclif/command'

export default class Init extends Command {
  async run() {
    this.log('This is appshake init command')
  }
}
