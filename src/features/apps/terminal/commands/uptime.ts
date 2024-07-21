import { TimeManager } from "../../../_utils/time.utils";
import { Command } from "../command";

export const uptime = new Command()
    .setManual({
        purpose: "Display the current uptime of the system",
        usage: "uptime",
        description: "Display the current system uptime."
    })
    .setExecute(function() {
        return `Uptime: ${TimeManager.getUptime(2)}`;
    });
