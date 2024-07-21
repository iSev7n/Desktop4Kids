import { Command } from "../command";

export const df = new Command()
    .setManual({
        purpose: "Report file system disk space usage",
        usage: "df",
        description: "Display the amount of disk space available on the file system."
    })
    .setExecute(function() {
        // Mock data for example purposes
        return `
Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda1      100000000  50000000  50000000  50% /
tmpfs            4000000   2000000   2000000  50% /run
/dev/sdb1       20000000  10000000  10000000  50% /mnt/data
        `.trim();
    });
