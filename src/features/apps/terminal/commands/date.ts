import { Command } from "../command";

export const date = new Command()
    .setManual({
        purpose: "Display the current date and time",
        usage: "date",
        description: "Display the current date and time."
    })
    .setExecute(function() {
        const now = new Date();
        return now.toString();
    });
