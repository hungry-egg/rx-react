#!/usr/bin/env node

const yargs = require("yargs");
const inquirer = require("inquirer");

yargs
  .usage("$0 <cmd> [args]")
  .command("$0", "default command yay", () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "What would you like to generate?",
          choices: ["module", "controller", "component"],
        },
      ])
      .then(({ command }) => {
        switch (command) {
          case "module":
            generateModule();
            break;
          case "controller":
            generateController();
            break;
          case "component":
            generateComponent();
            break;
        }
      })
      .catch(console.error);
  })
  .command("module", "Generate a module", () => {}, generateModule)
  .command("controller", "Generate a controller", () => {}, generateController)
  .command("component", "Generate a component", () => {}, generateComponent)
  .help().argv;

function generateModule() {
  console.log("TODO: generate module");
}

function generateController() {
  console.log("TODO: generate controller");
}

function generateComponent() {
  console.log("TODO: generate component");
}
