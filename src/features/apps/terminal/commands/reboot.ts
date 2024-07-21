import { reloadViewport } from "../../../_utils/browser.utils";
import { Command } from "../command";

export const reboot = new Command()
    .setManual({
        purpose: "Reboot the system",
        usage: "reboot",
        description: "Reboot the system to apply changes or reset the state."
    })
    .setExecute(function() {
        reloadViewport();
        return { blank: true };
    });
