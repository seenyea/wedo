import { TerminalCommand } from '@src/model/command/command'

export const parseTerminalCommand = (command: string): TerminalCommand => {
    return {
        type: 'success',
        commadCall: () => {

        },
        orginValue: command
    }
}