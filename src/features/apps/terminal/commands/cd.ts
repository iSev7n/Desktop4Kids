import { Command, ExecuteParams, CommandResponse } from "../command";

export const cd = new Command()
    .setManual({
        purpose: "Change the current directory",
        usage: "cd [PATH]",
        description: "Change working directory to given path (the home directory by default)."
    })
    .setExecute(async function(this: Command, args: string[] = [], params: ExecuteParams = {} as ExecuteParams): Promise<CommandResponse> {
        const { currentDirectory, setCurrentDirectory } = params;

        if (!currentDirectory) {
            return formatError("cd", "Current directory not found");
        }

        const path = args[0] ?? "~";
        const destination = currentDirectory.navigate(path);

        if (!destination) {
            return formatError("cd", `${args[0]}: No such file or directory`);
        }

        setCurrentDirectory?.(destination);
        return { blank: true };
    });

function formatError(commandName: string, message: string): string {
    return `${commandName}: ${message}`;
}
