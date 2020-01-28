const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


// Here's the question to choose the color scheme.
inquirer.prompt(
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: [
            "GREEN",
            "BLUE",
            "PINK",
            "RED"
        ]
    }
).then(function (response) {

    if (response.color === "GREEN" || response.color === "BLUE" || 
    response.color === "PINK" || response.color === "RED") {
        console.log("Great Color!");
    }
    else {
        return;
    }
});

// Here's the question for the GitHub account
inquirer
    .prompt(
        {
            type: "input",
            name: "username",
            message: "Write the GitHub profile name you'd like to view."
        }
    )

    // Trying to make the API call here.
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        // queryUrl is captured correctly
        console.log(queryUrl);

        axios.get(queryUrl).then(function (res) {
            // I keep getting an error stating "res.data.map is not a function" here.
            //This is where I'm currently stuck on this file.
            // Trying to make this work to append it to the generateHTML.js file. 
            // Then I'll plug the correct info into the appropriate locations in the HTML. 
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });
            // Console.log won't show up since the error appears up on line 51.
            console.log(res);
            console.log(data);

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesSt, function (err) {
                if (err) {
                    throw err;
                }

                console.log(`Saved ${repoNames.length} repos`);
            });
        });
    });
