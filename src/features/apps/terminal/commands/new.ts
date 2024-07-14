import { VirtualFile } from "../../../virtual-drive/file";
import { formatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";

export const touch = new Command()
    .setRequireArgs(true)
    .setManual({
        purpose: "Create a new file"
    })
    .setExecute(function(this: Command, args, params) {
        const { currentDirectory } = params as ExecuteParams;
        const fileId = (args as string[])[0];
        const { name, extension } = VirtualFile.splitId(fileId);
        const existingFile = currentDirectory.findFile(name, extension);

        if (existingFile)
            return formatError(this.name, `${fileId}: File already exists`);

        // Ensure the extension is either a string or undefined
        const validExtension = typeof extension === 'string' ? extension : undefined;
        currentDirectory.createFile(name, validExtension);
        return { blank: true };
    });