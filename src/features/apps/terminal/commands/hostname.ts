import { Command, ExecuteParams } from "../command";

export const hostname = new Command()
    .setManual({
        purpose: "Display the hostname",
        usage: "hostname",
        description: "Display the name of the current host."
    })
    .setExecute(function(args, params) {
        const { hostname } = params as ExecuteParams;
        return hostname;
    });
