import { Command, ExecuteParams, CommandResponse } from "../command";

export const clear = new Command()
    .setManual({
        purpose: "Clear terminal screen",
        usage: "clear",
        description: "Clear the terminal screen."
    })
    .setExecute(async function(this: Command, args: string[] = [], params: ExecuteParams = {} as ExecuteParams): Promise<CommandResponse> {
        const { pushHistory } = params;

        if (!pushHistory) {
            return formatError("clear", "Unable to clear screen, pushHistory function not found");
        }

        pushHistory({
            clear: true,
            isInput: false
        });

        return { blank: true };
    });

function formatError(commandName: string, message: string): string {
    return `${commandName}: ${message}`;
}
