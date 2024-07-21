import { Command } from "../command";

export const cal = new Command()
    .setManual({
        purpose: "Display a calendar",
        usage: "cal",
        description: "Display a calendar for the current month."
    })
    .setExecute(function() {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const firstDay = new Date(year, now.getMonth(), 1).getDay();
        const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

        let calendar = `
        ${day} ${month} ${year}
        
Su Mo Tu We Th Fr Sa
`;

        // Add initial spaces for the first week
        for (let i = 0; i < firstDay; i++) {
            calendar += "   ";
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendar += day.toString().padStart(2, ' ') + ' ';
            if ((firstDay + day) % 7 === 0) {
                calendar += '\n';
            }
        }

        return calendar.trim();
    });
