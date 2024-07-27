import { VirtualFile } from "../../../virtual-drive/file";
import { formatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";

export const touch = new Command()
    .setRequireArgs(true)
    .setManual({
        purpose: "Change file timestamps",
        usage: "touch [options] files",
        description: "Update the access and modification times of each FILE to the current time.\n\n"
            + "A file argument that does not exist is created empty."
    })
    .setExecute(function (this: Command, args, params) {
        const { currentDirectory } = params as ExecuteParams;
        const files = args as string[];

        // Handle the case where no files are provided
        if (files.length === 0) {
            return formatError(this.name, "No file specified");
        }

        for (const fileId of files) {
            const { name, extension } = VirtualFile.splitId(fileId);

            // Check if the file already exists in the current directory
            if (currentDirectory.findFile(name, extension)) {
                // Optionally, update the file's timestamps here
                continue;
            }

            // Create the file if it does not exist
            currentDirectory.createFile(name, extension as string | undefined);
        }

        return { blank: true };
    });