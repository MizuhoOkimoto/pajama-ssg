# pajama-ssg
# Pajama-ssg :zzz:
##### Simple Static Site Generator (SSG):
##### generating a complete HTML web site from txt file
All you have to do is enter the content in a text file, enter the filename on the command line and the tool will automatically convert it to an HTML file.
## Features
- Generate static HTML file(s) from .txt file(s)
- All generated HTML files are stored in the dist folder.
- Convert the file name as the title in the head tag
- Converts the first line in the text file as an h1 tag
## Option Features
- type -s or -stylesheet on the command line, it will be converted to a style tag link.
- By installing Prettier, the converted HTML will be formatted

## Installation
1. Clone the repo
2. Install Node.js
3. Redirect to project directory
Install the tool with npm i -g .
```sh
git clone https://github.com/MizuhoOkimoto/pajama-ssg
```
```sh
npm install
```
```sh
npm install -g .
```
## Usage
node pajama-ssg.js -i <path>
node pajama-ssg.js -input <path>
node pajama-ssg.js -input <path> -stylesheet <URL>
node pajama-ssg.js -i <path> -s <URL>

## Help
Options:
  > -h, --help   Show help                                               [boolean]
  > -v           version                                                 [boolean]
  > -i, --input                                                 [array] [required]

## Example
Input file: test.txt
Enter on command line:  node pajama-ssg -i test.txt
./test.txt
  Silver Blaze


  I am afraid, Watson, that I shall have to go,” said Holmes, as we
  sat down together to our breakfast one morning.

  “Go! Where to?”

  “To Dartmoor; to King’s Pyland.”

  I was not surprised. Indeed, my only wonder was that he had not already been mixed up in this extraordinary case, which was the one topic of conversation through the length and breadth of England.
  
  ./dist/test.html
  ```sh
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="please add your css path" />
    <title>test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>Silver Blaze</h1>

    <p>
      I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down
      together to our breakfast one morning.
    </p>
    <p>“Go! Where to?”</p>
    <p>“To Dartmoor; to King’s Pyland.”</p>
  </body>
</html>
  ```
 
## Author
Mizuho Okimoto
Github: @MizuhoOkimoto

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

