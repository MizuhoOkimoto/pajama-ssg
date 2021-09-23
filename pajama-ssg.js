#!/usr/bin/env node
var argv = require("yargs/yargs")(process.argv.slice(2))
  .example("$0 -i textFileName.txt")
  .alias("i", "input")
  .array("i")
  .demandOption(["i"])
  .help("h")
  .alias("h", "help")
  .alias("s", "stylesheet")
  .version("v", "version", "pajama-ssg v0.1.0").argv;

var fs = require("fs");
const prettier = require("prettier");

var path = "./dist";

if (fs.existsSync("./dist")) {
  if (fs.existsSync("./dist")) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  }
}

// Make the dist directory
fs.mkdir("./dist", (err) => {
  if (err) {
    console.log("Error:Something went wrong when create a dist directory");
    process.exit(-1);
  }
  console.log("dist directory is created.");
});

// Read files/lines
argv.i.forEach((input) => {
  var stats = fs.statSync(input);
  // console.log("Is txt file in a directory ? " + stats.isDirectory());

  if (stats.isDirectory()) {
    files = fs.readdirSync("./" + input);

    files.forEach((file) => {
      var lines = [];
      var title = file.split(".txt").shift();

      fs.readFile(`${input}/${file}`, "utf8", (err, data) => {
        if (err) {
          console.log("Error:Something went wrong when read the text file");
          process.exit(-1);
        } else {
          lines = data.toString().split(/\r?\n\r?\n/);
          var titleName = `<h1>${lines.shift()}</h1>`;
          var text = "";
          lines.forEach((line) => (text = text + `\n<p>${line}</p>`));

          if (argv.s == undefined) {
            var template = `
            <!doctype html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" type="text/css" href="please_add_your_css_path" />
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
              console.log("Error:Something went wrong while generate a HTML file");
              process.exit(-1);
            } else {
              console.log(title + ".html was saved!");
            }
          });
        }
      });
    });
  } else {
    var lines = [];
    var title = input.split(".txt").shift();

    fs.readFile(`${input}`, "utf8", (err, data) => {
      if (err) {
        console.log("Error:Something went wrong when read the text file");
        process.exit(-1);
      } else {
        lines = data.toString().split(/\r?\n\r?\n/);
        var titleName = `<h1>${lines.shift()}</h1>`;
        var text = "";
        lines.forEach((line) => (text += `\n<p>${line}</p>`));

        if (argv.s == undefined) {
          var template = `
            <!doctype html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" type="text/css" href="please_add_your_css_path" />
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
            console.log("Error:Something went wrong when create a dist directory");
            process.exit(-1);
          } else {
            console.log(title + ".html was saved!");
          }
        });
      }
    });
  }
});
