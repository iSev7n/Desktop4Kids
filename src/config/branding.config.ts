import { ANSI } from "./apps/terminal.config";

export const NAME = "Desktop4Kids";
export const TAG_LINE = "Operating System for Kids";

export const ASCII_LOGO = `
 ____  _  _   _    
|  _ \| || | | | __
| | | | || |_| |/ /
| |_| |__   _|   < 
|____/   |_| |_|\_\        `;

export const ANSI_LOGO_COLOR = ANSI.fg.cyan;
export const ANSI_ASCII_LOGO = `
.....................
........................
.....................
DDDDDDDDDDDDD        
D::::::::::::DDD     
D:::::::::::::::DD   
DDD:::::DDDDD:::::D  
  D:::::D    D:::::D 
  D:::::D     D:::::D
  D:::::D-----D::::D${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR} 
  D:::::D------D::::D${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR}
  D:::::D------D::::D${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR}
  D:::::D------D::::D${ANSI.fg.white}${ANSI_LOGO_COLOR}${ANSI.fg.white}${ANSI_LOGO_COLOR}
  D:::::D     D:::::D
  D:::::D     D:::::D
  D:::::D    D:::::D 
DDD:::::DDDDD:::::D  
D:::::::::::::::DD   
D::::::::::::DDD     
DDDDDDDDDDDDD
.....................   
........................   
.....................`;