const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const generateHTML = require("./generateHTML.js");

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

    axios
      .get(`https://api.github.com/users/${answers['profile']}`)
      .then(function (res) {
        console.log(`${answers['color']}`);
        // console.log(res)
        const data = res.data;
        //  console.log(data);

        // Call the generateHTML() here with FS.writeFile 
        let html = generateHTML(data, answers);

        //writing to html file the using a callback to make that into a pdf.
        fs.writeFile("developer.html", html, function (err) {
          if (err) {
            throw err;
          }
          console.log(`Saved developer.html`);
          // here's where we convert to PDF
          
        });




      });

    // Callback the generatePDF() here after after the html file is made.

  });








// function init() {
// };

// init();

