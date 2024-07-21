import { Command } from "../command";

export const bc = new Command()
    .setManual({
        purpose: "Basic calculator",
        usage: "bc [EXPRESSION]",
        description: "Evaluate the arithmetic expression."
    })
    .setExecute(function(args: string[] = []) {
        if (args.length === 0) {
            return "Usage: bc [EXPRESSION]";
        }
        
        const expression = args.join(' ');
        try {
            const result = eval(expression); // Note: Using eval for simplicity; in a real-world scenario, a safer approach should be used
            return result.toString();
        } catch (error) {
            return `Error: Invalid expression "${expression}"`;
        }
    });

