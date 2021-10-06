#!/usr/bin/env node
var argv = require("yargs/yargs")(process.argv.slice(2))
  .example("$0 -i textFileName.txt")
  .option('input', {
    alias: 'i',
    describe: 'input file'
  })
  .array("i")
  //.demandOption(["i"])
  .option('help', {
    alias: 'h',
    describe: 'display command options'
  })
  .option('stylesheet', {
    alias: 's',
    describe: 'input the path for generating the stylesheet path'
  })
  .option('lang', {
    alias: 'l',
    describe: 'input the language for the lang attribute'
  }) 
  .option('config', {
    alias: 'c',
    describe: "Read values from a Config JSON file",
  })

  .option('version', {
    alias: 'v',
    describe: 'this is version v0.1.0'
  })
  .version("v", "version", "pajama-ssg v0.1.0")
  .argv;

var fs = require("fs");
const prettier = require("prettier");

const path = require("path");

var distPath = "./dist";

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
  if(!fs.existsSync(input)){
    console.error("Input is not a file or directory!");
return;
  }

  var stats = fs.statSync(input);
  // console.log("Is txt file in a directory ? " + stats.isDirectory());

  if (stats.isDirectory()){
    files = fs.readdirSync("./" + input);

    files.forEach((file) => {
      if(file.includes(".txt")){
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
          var language = argv.l?argv.l:"en-CA";

          if (argv.s == undefined) {
            var template = `
            <!doctype html>
            <html lang="${language}">
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
              <html lang="${language}">
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
    }else{
      
      var lines = [];
      var title = file.split(".md").shift();
     
      var template ;
      fs.readFile(`${input}/${file}`, "utf8", (err, data) => {
        if (err) {
          return console.log(err);
        } else {
          lines = data.toString().split(/\r?\n\r?\n/);
          // console.log(lines)
          var text = "";

          lines.forEach((line) =>{

            if(line.includes("*")){
              // console.log(line)
              line = Array.from(new Set(line.split('*'))).toString();
              let get = line.replace(",", ' ')
              // console.log(get)
              text += `\n<i>${get}</i>`;
            }else if(line.includes("#")){
              line = Array.from(new Set(line.split('#'))).toString();
              let get = line.replace(",", ' ')
              // console.log(get)
              text += `\n<b>${get}</b>`;
            }else if(line.includes("---")) {
              let get = line.replace("---", '<hr>');
              text += `\n${get}`;
            }
            else {
              text += `\n<p>${line}</p>`;
            }
            
            // console.log(`1 ${line}`)
  
            if (argv.s == undefined) {
               template = `
                <!doctype html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <link rel="stylesheet" type="text/css" href="please add your css path" />
                  <title></title>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body>
                
                  ${text}
                </body>
                </html>
                `;
            } else {
               template = `
                  <!doctype html>
                  <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" type="text/css" href="${argv.s}" />
                    <title></title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                  </head>
                  <body>
                 
                    ${text}
                  </body>
                  </html>
                  `;
            }
  
  
  
          })



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


    
  }  else {


  if(input.includes(".txt")){

  

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
        var language = argv.l?argv.l:"en-CA";

        if (argv.s == undefined) {
          var template = `
            <!doctype html>
            <html lang="${language}">
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
              <html lang="${language}">
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

  }else{
    
    var lines = [];
    var title = input.split(".md").shift();
   
    var template ;
    fs.readFile(`${input}`, "utf8", (err, data) => {
      // console.log(data)
      if (err) {
        return console.log(err);
      } else {
        lines = data.toString().split(/\r?\n\r?\n/);
        // console.log(lines)
        var text = "";
        lines.forEach((line) =>{

          if(line.includes("*")){
            console.log(line)
            line = Array.from(new Set(line.split('*'))).toString();
            let get = line.replace(",", ' ')
            console.log(get)
            text += `\n<i>${get}</i>`;
          }else if(line.includes("#")){
            line = Array.from(new Set(line.split('#'))).toString();
            let get = line.replace(",", ' ')
            console.log(get)
            text += `\n<b>${get}</b>`;
          }else if(line.includes("---")) {
            let get = line.replace("---", '<hr>');
            text += `\n${get}`;
          }
          else {
            text += `\n<p>${line}</p>`;
          }
          
          // console.log(`1 ${line}`)

          if (argv.s == undefined) {
             template = `
              <!doctype html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="please add your css path" />
                <title></title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>
              
                ${text}
              </body>
              </html>
              `;
          } else {
             template = `
                <!doctype html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <link rel="stylesheet" type="text/css" href="${argv.s}" />
                  <title></title>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body>
               
                  ${text}
                </body>
                </html>
                `;
          }



        })


       
        
        

       
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
