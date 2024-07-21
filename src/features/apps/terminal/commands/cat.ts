import { VirtualFile } from "../../../virtual-drive/file";
import { Command, ExecuteParams, CommandResponse } from "../command";

export const cat = new Command()
    .setRequireArgs(true)
    .setManual({
        purpose: "Concatenate files and display on the terminal screen",
        usage: "cat [options] [files]",
        description: "Concatenate files to standard output."
    })
    .setExecute(async function(this: Command, args: string[] = [], params: ExecuteParams = {} as ExecuteParams): Promise<CommandResponse> {
        const { currentDirectory, options } = params;
        
        if (!currentDirectory) {
            return formatError("cat", "Current directory not found");
        }

        const fileId = args[0];
        const { name, extension } = VirtualFile.splitId(fileId);
        const file = currentDirectory.findFile(name, extension);

        if (!file) {
            return formatError("cat", `${fileId}: No such file`);
        }

        if (file.content) {
            return formatContent(file.content, options);
        } else if (file.source) {
            return `Src: ${file.source}`;
        } else {
            return { blank: true };
        }
    });

function formatContent(content: string, options?: string[]): string {
    if (options?.includes("e")) {
        // Append "$" at the end of every line
        return content.split("\n").join("$\n") + "$";
    }
    return content;
}

function formatError(commandName: string, message: string): string {
    return `${commandName}: ${message}`;
}
