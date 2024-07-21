import { Command, ExecuteParams } from "../command";

export const rev = new Command()
    .setManual({
        purpose: "Display the reverse of a text",
        usage: "rev [TEXT]",
        description: "Display the reverse of the specified text."
    })
    .setExecute(function(args, params) {
        const { rawInputValue } = params as ExecuteParams;
        return rawInputValue?.split("").reverse().join("");
    });