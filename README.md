# Pajama-ssg :zzz:

### This is a Simple Static Site Generator (SSG) version_1.0.1

All you have to do is provide the content in a text file, type the filename on the command line and run it! This Pajama-ssg will automatically convert it to an HTML file. It's so simple and easy that you can start creating web pages right away, even in your pajamas!

## Features

- Generate static HTML file(s) from .txt file(s)
- Read .txt files inside folder(s) and generate HTML file(s)
- All generated HTML files are stored in the dist folder
- Convert the file name as the title in the head tag
- Convert the first line in the .txt file as an h1 tag
- Convert Markdown files into HTML(With italic, bold, and horizontal rule)

## Option Features

- type `-s` or `-stylesheet` on the command line, it will be converted to a style tag link
- type `-l` or `-lang` on the command line, it will generate the lang attribute on the root <html> element
- type `-c` or `--config` on the command line, it will get the flag values from your config JSON file.

## Installation
  ### Install npm package:
  - Open Terminal or CLI
  - Go to the directory/folder you would like to add the program
  - Type the `npm i pajama-ssg` command 

  > npm package: https://www.npmjs.com/package/pajama-ssg

<!-- 1. Clone the repo

   `$git clone https://github.com/MizuhoOkimoto/pajama-ssg`

2. Install Node.js

   `$npm install`

3. Redirect to project directory

   `$cd <\pajama-ssg>` -->

## Usage

`$npx pajama-ssg -i <path>` or `$npx pajama-ssg -input <path>` 
 
    These allows you to the text file to a HTML file. Please type file name into the <path>.

`$npx pajama-ssg -i <folder name>` 
 
    If your text file is in a folder, you can type folder name instead of text file name.
    This SSG tool checkes inside the folder.

`$npx pajama-ssg -input <path> -stylesheet <URL>` or `$npx pajama-ssg -i <path> -s <URL>` 
 
    You are able to add stylesheet. Please type the URL or path into the <URL>.
    
`$npx pajama-ssg -c config-file.json` 
 
    You are able to pass a configuration JSON file.

## Help

| Option           | Function                                              |
|------------------|-------------------------------------------------------|
| -i, --input      | input file                                            |
| -c, --config     | receive a config JSON file and get flags from it      |
| -s, --stylesheet | input the path for generating the stylesheet path     |
| -l, --lang       | input the language for the lang attribute             |
| -v, --version    | display version                                       |   

<!-- ```
  -i, --input       input file
  -c, --config      receive a config JSON file and get flags from it.
  -s, --stylesheet  input the path for generating the stylesheet path
  -l, --lang        input the language for the lang attribute
  -v, --version     version
``` -->
  

## Example

**Input file**

`test.txt`

**Type the on command line**

`npx pajama-ssg -i test.txt -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css`
(This example uses water.css)

**./test.txt**

```
 Silver Blaze


 I am afraid, Watson, that I shall have to go,??? said Holmes, as we
 sat down together to our breakfast one morning.

 ???Go! Where to????

 ???To Dartmoor; to King???s Pyland.???

 I was not surprised. Indeed, my only wonder was that he had not already been mixed up in this extraordinary case, which was the one topic of conversation through the length and breadth of England.

```

**./dist/test.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
    />
    <title>test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>Silver Blaze</h1>

    <p>
      I am afraid, Watson, that I shall have to go,??? said Holmes, as we sat down
      together to our breakfast one morning.
    </p>
    <p>???Go! Where to????</p>
    <p>???To Dartmoor; to King???s Pyland.???</p>
  </body>
</html>
```

## Author

Mizuho Okimoto

- Github Repo: [MizuhoOkimoto](https://github.com/MizuhoOkimoto)
- Blog: [https://dev.to/okimotomizuho](https://dev.to/okimotomizuho)
- Portofolio: [https://www.okimotomizuho.com](https://www.okimotomizuho.com)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Contribution
Thank you for investing your time in contributing to our project!<br>
Your contribution will invigorate this wonderful open source community and create even better ones. Your contribution is greatly welcomed!<br>
For details on contributing to this repository, see the [contributing guide](CONTRIBUTING.md).
