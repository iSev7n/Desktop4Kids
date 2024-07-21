// commands.ts
import { Command } from "./command";

let commands: Command[] = [];

/**
 * Dynamically import commands
 */
const loadCommands = () => {
    commands = [];
    const modules = import.meta.glob("./commands/*.ts");
    for (const path in modules) {
        if (path.includes("helpTexts.ts")) continue; // Exclude helpTexts.ts
        void modules[path]().then((commandModule) => {
            const commandName = Object.keys(commandModule as Record<string, Command>)[0];
            const command = (commandModule as Record<string, Command>)[commandName];
            if (typeof command.setName === 'function') {
                command.setName(commandName.toLowerCase());
                commands.push(command);
            } else {
                console.error(`Failed to load command from ${path}: setName is not a function`);
            }
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
