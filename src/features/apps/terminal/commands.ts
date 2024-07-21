import { Command } from "./command";

let commands: Command[] = [];

/**
 * Dynamically import commands
 */
const loadCommands = () => {
    commands = [];
    const modules = import.meta.glob("./commands/*.ts");
    for (const path in modules) {
        void modules[path]().then((commandModule) => {
            const commandName = Object.keys(commandModule as Record<string, Command>)[0];
            const command = (commandModule as Record<string, Command>)[commandName];
            command.setName(commandName.toLowerCase());
            commands.push(command);
        }).catch((error) => {
            console.error(`Failed to load command from ${path}:`, error);
        });
    }
};

loadCommands();

export class CommandsManager {
    static COMMANDS = commands;

    static find(name: string): Command | null {
        let matchCommand: Command | null = null;
        this.COMMANDS.forEach((command) => {
            if (command.name === name) {
                matchCommand = command;
                return;
            }
        });
        return matchCommand;
    }

    static search(pattern: string): Command[] {
        const matches = this.COMMANDS.filter((command) => command.name?.match(pattern));
        return matches;
    }

    static reload() {
        loadCommands();
        CommandsManager.COMMANDS = commands;
    }
}
