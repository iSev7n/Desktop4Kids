import { Command } from "../command";
import { CommandsManager } from "../commands";

export const reload = new Command()
	.setManual({
		purpose: "Reload the terminal",
	})
	.setExecute(function() {
		CommandsManager.reload();
		return { blank: true };
	});