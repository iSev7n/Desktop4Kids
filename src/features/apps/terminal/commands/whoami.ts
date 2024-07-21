import { Command, ExecuteParams } from "../command";

export const whoami = new Command()
    .setManual({
        purpose: "Display the username",
        usage: "whoami",
        description: "Display the current user's username."
    })
    .setExecute((args, params) => {
        const { username } = params as ExecuteParams;
        return username;
    });
