import { Command, ExecuteParams } from "../command";

export const pwd = new Command()
    .setManual({
        purpose: "Display path of the current directory",
        usage: "pwd",
        description: "Display the absolute path of the current directory."
    })
    .setExecute(function(args, params) {
        const { currentDirectory } = params as ExecuteParams;

        if (currentDirectory.root) {
            return "/";
        } else {
            return currentDirectory.absolutePath;
        }
    });
