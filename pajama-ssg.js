/* eslint-disable no-undef */
var argv = require("./yargsConfig");
var fs = require("fs");
const prettier = require("prettier");
const path = require("path");
var distPath = "./dist";
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();

var tempGenerate = require("./tempGenerator");

console.log(argv.i);

if (fs.existsSync(distPath)) {
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(distPath + "/" + filename).isDirectory()) {
          removeDir(distPath + "/" + filename);
        } else {
          fs.unlinkSync(distPath + "/" + filename);
        }
      });
      fs.rmdirSync(distPath);
    } else {
      fs.rmdirSync(distPath);
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

if (argv.c) {
  try {
    const jsonFile = fs.readFileSync(path.normalize(argv.c));
    const data = JSON.parse(jsonFile);
    argv.i = [data.input];
    argv.s = data.stylesheet;
    argv.l = data.lang || "en-CA";
  } catch (err) {
    console.error("Error: Impossible to read from JSON file.");
    process.exit(1);
  }
}

// Read files/lines
argv.i.forEach((input) => {
  if (!fs.existsSync(input)) {
    console.error("Input is not a file or directory!");
    return;
  }

  var stats = fs.statSync(input);
  // console.log("Is txt file in a directory ? " + stats.isDirectory());

  if (stats.isDirectory()) {
    files = fs.readdirSync("./" + input);

    files.forEach((file) => {
      if (file.includes(".txt")) {
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

            let template = tempGenerate(argv.s, argv.l, title, titleName, text);

            const compTemp = prettier.format(template, { parser: "html" });
            fs.writeFile(`./dist/${title}.html`, compTemp, function (err) {
              if (err) {
                console.log(
                  "Error:Something went wrong while generate a HTML file"
                );
                process.exit(-1);
              } else {
                console.log(title + ".html was saved!");
              }
            });
          }
        });
      } else {
        lines = [];
        title = file.split(".md").shift();

        fs.readFile(`${input}/${file}`, "utf8", (err, data) => {
          if (err) {
            return console.log(err);
          } else {
            lines = data.toString().split(/\r?\n\r?\n/);
            // console.log(lines)
            var text = "";

            lines.forEach((line) => {
              var result = md.render(line);
              text += result;
              //replaced
              template = tempGenerate(argv.s, argv.l, title, titleName, text);
            });

            const compTemp = prettier.format(template, { parser: "html" });
            fs.writeFile(`./dist/${title}.html`, compTemp, function (err) {
              if (err) {
                return console.log(err);
              } else {
                console.log(title + ".html was saved!");
              }
            });
          }
        });
      }
    });
  } else {
    if (input.includes(".txt")) {
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

          //replaced
          let template = tempGenerate(argv.s, argv.l, title, titleName, text);

          const compTemp = prettier.format(template, { parser: "html" });
          fs.writeFile(`./dist/${title}.html`, compTemp, function (err) {
            if (err) {
              console.log(
                "Error:Something went wrong when create a dist directory"
              );
              process.exit(-1);
            } else {
              console.log(title + ".html was saved!");
            }
          });
        }
      });
    } else {
      lines = [];
      title = input.split(".md").shift();

      var template;
      fs.readFile(`${input}`, "utf8", (err, data) => {
        // console.log(data)
        if (err) {
          return console.log(err);
        } else {
          lines = data.toString().split(/\r?\n\r?\n/);
          // console.log(lines)
          var text = "";
          lines.forEach((line) => {
            var result = md.render(line);
            text += result;
            //replaced
            template = tempGenerate(argv.s, argv.l, title, "", text);
          });

          const compTemp = prettier.format(template, { parser: "html" });
          fs.writeFile(`./dist/${title}.html`, compTemp, function (err) {
            if (err) {
              return console.log(err);
            } else {
              console.log(title + ".html was saved!");
            }
          });
        }
      });
    }
  }
});
