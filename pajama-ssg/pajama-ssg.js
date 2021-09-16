#!/usr/bin/env node
var argv = require("yargs/yargs")(process.argv.slice(2))
  .example("$0 -i textFileName.txt")
  .alias("i", "input")
  .array("i")
  .demandOption(["i"])
  .help("h")
  .alias("h", "help")
  .alias("s", "stylesheet")
  .version("v", "version", "v0.1.0").argv;

// Node.js File System: it can read/create/delete/update/rename files
var fs = require("fs");
// var HTMLParser = require("node-html-parser");
const prettier = require("prettier");

// create new directory
var path = "./dist";

/*----- check if dist directory exist -----*/

if (fs.existsSync("./dist")) {
  if (fs.existsSync("./dist")) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename); //delete the directory
        } else {
          fs.unlinkSync(path + "/" + filename); //delete the file
        }
      });
      fs.rmdirSync(path); //deletes the entire directory recursively
    } else {
      fs.rmdirSync(path);
    }
  }
  // console.log("dist Directory already exists!");
}

// make the dist directory
fs.mkdir("./dist", (err) => {
  if (err) {
    throw err;
  }
  console.log("dist directory is created.");
});

/*----- Read files/lines -----*/
argv.i.forEach((input) => {
  var stats = fs.statSync(input);
  console.log("Is txt file in a directory ? " + stats.isDirectory());

  /*----- STEP:1 if txt file(s) is in a directory -----*/
  if (stats.isDirectory()) {
    console.log("im here");
    files = fs.readdirSync("./" + input);

    files.forEach((file) => {
      var lines = []; //array for storing data

      var title = file.split(".txt").shift();
      console.log("Title:" + title);

      // each line in the txt file executes and make it string

      fs.readFile(`${input}/${file}`, "utf8", (err, data) => {
        if (err) {
          return console.log(err);
        } else {
          lines = data.toString().split(/\r?\n\r?\n/);
          var titleName = `<h1>${lines.shift()}</h1>`;
          console.log("TitleName:" + titleName);
          var text = "";
          lines.forEach((line) => (text = text + `\n<p>${line}</p>`));

          if (argv.s == undefined) {
            var template = `
            <!doctype html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" type="text/css" href="please add your css path" />
              <title>${title}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
              ${titleName}
              ${text}
            </body>
            </html>
            `;
          } else {
            var template = `
              <!doctype html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="${argv.s}" />
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>
                ${titleName}
                ${text}
              </body>
              </html>
              `;
          }
          const compTemp = prettier.format(template, { parser: "html" });
          fs.writeFile(`./dist/${title}.html`, compTemp, function (err) {
            if (err) {
              return console.log(err);
            } else {
              console.log("HTML file(s) was saved!");
            }
          });
        }
      });
    });
    console.log("This is saved file:" + files);
  } else {
    //if it is not under directory
    var lines = []; //array for storing data

    console.log(argv.i);
    var title = input.split(".txt").shift();
    console.log("Title:" + title);

    // each line in the txt file executes and make it string

    fs.readFile(`${input}`, "utf8", (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        lines = data.toString().split(/\r?\n\r?\n/);
        var titleName = `<h1>${lines.shift()}</h1>`;
        console.log("TitleName:" + titleName);
        var text = "";
        lines.forEach((line) => (text += `\n<p>${line}</p>`));

        if (argv.s == undefined) {
          var template = `
            <!doctype html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" type="text/css" href="please add your css path" />
              <title>${title}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
              ${titleName}
              ${text}
            </body>
            </html>
            `;
        } else {
          var template = `
              <!doctype html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="${argv.s}" />
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>
                ${titleName}
                ${text}
              </body>
              </html>
              `;
        }
        const compTemp = prettier.format(template, { parser: "html" });
        fs.writeFile(`./dist/${title}.html`, compTemp, function (err) {
          if (err) {
            return console.log(err);
          } else {
            console.log("HTML file(s) was saved!");
          }
        });
      }
    });
    console.log("file is not under a directory");
  } //end stats.isDirectory()
}); //end foreach
