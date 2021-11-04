#!/usr/bin/env node
var argv = require("yargs/yargs")(process.argv.slice(2))
  .example("$0 -i textFileName.txt")
  .option("input", {
    alias: "i",
    describe: "input file",
  })
  .array("i")
  //.demandOption(["i"])
  .option("help", {
    alias: "h",
    describe: "display command options",
  })
  .option("stylesheet", {
    alias: "s",
    describe: "input the path for generating the stylesheet path",
  })
  .option("lang", {
    alias: "l",
    describe: "input the language for the lang attribute",
  })
  .option("config", {
    alias: "c",
    describe: "Read values from a Config JSON file",
  })

  .option("version", {
    alias: "v",
    describe: "this is version v0.1.0",
  })
  .version("v", "version", "pajama-ssg v0.1.0").argv;

module.exports = argv;
