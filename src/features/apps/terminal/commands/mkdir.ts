import { Command, ExecuteParams } from "../command";

export const mkdir = new Command()
    .setManual({
        purpose: "Create a directory",
        usage: "mkdir [DIRECTORY]",
        description: "Create a new directory with the specified name."
    })
    .setRequireArgs(true)
    .setExecute(function(args, params) {
        const { currentDirectory } = params as ExecuteParams;
        const name = (args as string[])[0];

        if (currentDirectory.findSubFolder(name))
            return { blank: true };

        currentDirectory.createFolder(name);
        return { blank: true };
    });
