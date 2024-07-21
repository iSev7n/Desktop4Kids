import { VirtualFile } from "../../../virtual-drive/file";
import { formatError as importedFormatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams, CommandResponse } from "../command";

export const mkfile = new Command()
    .setRequireArgs(true)
    .setManual({
        purpose: "Create a new file",
        usage: "mkfile [FILENAME]",
        description: "Create a new file with the specified name."
    })
    .setExecute(async function(this: Command, args: string[] = [], params: ExecuteParams = {} as ExecuteParams): Promise<CommandResponse> {
        const { currentDirectory } = params;

        if (args.length < 1) {
            return customFormatError("mkfile", "Missing file name operand");
        }

        const fileName = args[0];
        const { name, extension } = VirtualFile.splitId(fileName);

        if (currentDirectory.findFile(name, extension)) {
            return customFormatError("mkfile", `File '${fileName}' already exists`);
        }

        currentDirectory.createFile(name, extension as string | undefined);

        return { blank: true };
    });

function customFormatError(commandName: string, message: string): string {
    return `${commandName}: ${message}`;
}
