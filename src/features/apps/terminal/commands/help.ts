import { ANSI } from "../../../../config/apps/terminal.config";
import { formatError } from "../_utils/terminal.utils";
import { Command } from "../command";
import { CommandsManager } from "../commands";
import { helpTexts } from "./helpTexts"; // Import the help texts

export const help = new Command()
.setManual({
	purpose: "Display list of help commands",
	usage: "help [command]",
	description: "Display a list of help commands or detailed help for a specific command."
})
    .setExecute(function(this: Command, args) {
        if (args?.length === 0) {
            return CommandsManager.COMMANDS.map((command) => {
                if (command.manual?.purpose) {
                    return `${command.name} - ${ANSI.fg.green}${ANSI.decoration.dim}${command.manual.purpose}${ANSI.reset}`;
                } else {
                    return command.name;
                }
            }).sort().join("\n");
        }

        const commandName = (args as string[])[0].toLowerCase();
        const command = CommandsManager.find(commandName);

        if (!command)
            return formatError(this.name, `${commandName}: Command not found`);

        const helpText = helpTexts[commandName]; // Retrieve the help text

        if (helpText) {
            return helpText;
        }

        if (!command.manual?.purpose)
            return formatError(this.name, `${commandName}: No manual found`);

        return command.manual.purpose;
    });
