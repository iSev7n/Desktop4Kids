export const helpTexts: Record<string, string> = {
    cat: `
Usage: cat [OPTIONS] [FILE]...

Concatenate files and display on the terminal screen.

Options:
  -n    Number all output lines.
  -b    Number non-blank output lines.
  -s    Squeeze multiple adjacent blank lines into a single blank line.
  -e    Display $ at the end of each line and use ^ and M- notation for non-printing characters.
  -t    Display tab characters as ^I and use ^ and M- notation for non-printing characters.

Examples:
  cat file1.txt file2.txt
  This command will display the contents of file1.txt followed by the contents of file2.txt.

  cat file.txt
  This command will print the content of file.txt to the terminal.

  cat -n file.txt
  This command will print the content of file.txt with line numbers.

  cat -e file.txt
  This command will print the content of file.txt, showing $ at the end of each line and using ^ and M- notation for non-printing characters.
`,
    cd: `
Usage: cd [PATH]

Change the current directory to PATH.

Examples:
  cd /path/to/directory
  This command will change the current directory to /path/to/directory.

  cd ..
  This command will change the current directory to the parent directory.
`,
    dir: `
Usage: dir

List all directories in the current directory.

Examples:
  dir
  This command will list all subdirectories in the current directory.
`,
    ls: `
Usage: ls [OPTIONS] [FILES]

List directory contents.

Options:
  -a    Include hidden files (those starting with a dot).
  -l    Use a long listing format.

Examples:
  ls
  This command will list the contents of the current directory.

  ls /path/to/directory
  This command will list the contents of the specified directory.
`,
    mkdir: `
Usage: mkdir [DIRECTORY]

Create a directory.

Examples:
  mkdir new_folder
  This command will create a directory named 'new_folder' in the current directory.
`,
    pwd: `
Usage: pwd

Display the path of the current directory.

Examples:
  pwd
  This command will print the absolute path of the current directory.
`,
    rm: `
Usage: rm [FILE]

Remove a file.

Examples:
  rm file.txt
  This command will delete 'file.txt' from the current directory.
`,
    rmdir: `
Usage: rmdir [DIRECTORY]

Remove a directory.

Examples:
  rmdir old_folder
  This command will delete the directory named 'old_folder' from the current directory.
`,
    echo: `
Usage: echo [TEXT]

Display text on the terminal screen.

Examples:
  echo Hello, world!
  This command will display 'Hello, world!' on the terminal.
`
};
