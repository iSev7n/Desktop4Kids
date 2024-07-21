import { Command } from "../command";
import { CommandsManager } from "../commands";

export const reload = new Command()
    .setManual({
        purpose: "Reload the terminal",
        usage: "reload",
        description: "Reload the terminal to apply changes or reset the state."
    })
    .setExecute(function() {
        CommandsManager.reload();
        return { blank: true };
    });
