const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


const questions = [
  {
    type: "input",
    name: "profile",
    message: "Write the GitHub profile name you'd like to view."
  },
  {
    type: "list",
    message: "What is your favorite color?",
    name: "color",
    choices: [
      "GREEN",
      "BLUE",
      "PINK",
      "RED"
    ]
  }
];

// Prompting for the questions when 'node index.js' is run in CLI.  
inquirer.prompt(questions)

  // Capturing the Inquirer answers into variables and console.log'ing results.
  .then(answers => {
    let gitProfile = `${answers['profile']}`
    let favColor = `${answers['color']}`
    console.log(gitProfile + ' & ' + favColor + " were your inputs!"),

      function (err) {
        if (err) {
          return console.log(err);
        };
      };

    // Setting up my API call to pull the GitHub account username
    const queryUrl = "https://api.github.com/users/" + gitProfile;
    console.log(queryUrl);

    // Had trouble getting the queryURL const to work if I put it into the parenthesis below.
    // Going to use this preset Axios call in the mean time.
    axios
      .get("https://api.github.com/users/BrianHdz")
      .then(function (res) {
        console.log(res.data);
      });

  });






//function writeToFile(fileName, data) {

//}

// function init() {
// };

// init();

