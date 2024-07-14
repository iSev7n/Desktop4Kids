import { MAX_WIDTH } from "../../../../config/apps/terminal.config";
import { Command, ExecuteParams } from "../command";

const COW = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

export const cowsay = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show a cow saying something",
		usage: "cowsay text",
		description: "Show ASCII art of a cow saying something."
	})
	.setExecute(function(args, params) {
		const { rawInputValue } = params as ExecuteParams;

		// Separate input value into lines
		const segments = rawInputValue?.split(" ");
		const lines: string[] = [];
		let currentLine = "";
		let maxLineWidth = 0;

		const addLine = (line: string) => {
			line = line.trimEnd();
			lines.push(line);
			if (line.length > maxLineWidth)
				maxLineWidth = line.length;
		};

		const nextLine = (word?: string) => {
			addLine(currentLine);

			if (word) {
				currentLine = word + " ";
			} else {
				currentLine = "";
			}
		};

		segments?.forEach((segment) => {
			// Add empty spaces preceding lines
			if (segment === "") {
				currentLine += " ";
				return;
			}

			const words = segment.split("\n");
			for (let i = 0; i < words.length; i++) {
				const word = words[i];
				
				// Handle next lines
				if (i > 0)
					nextLine();

				// Fit word on current line
				if ((currentLine + word).length <= MAX_WIDTH) {
					currentLine += word + " ";
				} else if (word.length > MAX_WIDTH) {
					const remainingSpaces = MAX_WIDTH - currentLine.length;

					if (remainingSpaces >= 2) {
						addLine(currentLine + word.substring(0, remainingSpaces - 1) + "-");
						currentLine = word.substring(remainingSpaces - 1) + " ";
					} else {
						nextLine(word);
					}
				} else {
					nextLine(word);
				}
			}
		});

		if (currentLine.length > 0)
			addLine(currentLine);

		// Turn lines into speech bubble
		const speechBubble = [` ${"_".repeat(maxLineWidth + 2)} `];

		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			const missingSpaces = maxLineWidth - line.length;

			if (missingSpaces > 0)
				line += " ".repeat(missingSpaces);

			if (lines.length > 1) {
				if (i === 0) {
					line = `/ ${line} \\`;
				} else if (i === lines.length - 1) {
					line = `\\ ${line} /`;
				} else {
					line = `| ${line} |`;
				}
			} else {
				line = `< ${line} >`;
			}

			speechBubble.push(line);
		}

		speechBubble.push(` ${"-".repeat(maxLineWidth + 2)} `);

		return speechBubble.join("\n") + COW;
	});