const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?"
    },
    {
        type: "input",
        name: "id",
        message: "Please assign the employee an ID #:"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role in your team?",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        when: (answers) => answers.role === "Manager"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
        when: (answers) => answers.role === "Engineer"
    },
    {
        type: "input",
        name: "school",
        message: "What school does the Intern attend?",
        when: (answers) => answers.role === "Intern"
    },
    {
        type: "confirm",
        name: "addMoreEmployees",
        message: "Would you like to add more employees to your team?",
    }
]

function initialize() {
    console.log("Lets build your team!");
    console.log("We will start with your first employee's general information, followed by their role, and then obtain role specific information.")
    stepOne();
};

const teamDirectory = [];

function stepOne() {
    inquirer.prompt(questions).then(data => {
        if (data.addMoreEmployees) {
            stepTwo(data);
            return stepOne();
        } else if (data.addMoreEmployees === false) {
            stepTwo(data);
            stepThree();
            console.log("team complete!");
        };
    });

    function stepTwo(data) {
        if (data.role === 'Manager') {
            var manager = new Manager(data.name, data.email, data.id, data.officeNumber);
            teamDirectory.push(manager);
            console.log(teamDirectory);
        } else if (data.role === 'Engineer') {
            var engineer = new Engineer(data.name, data.email, data.id, data.github);
            teamDirectory.push(engineer);
            console.log(teamDirectory);
        } else {
            var intern = new Intern(data.name, data.email, data.id, data.school);
            teamDirectory.push(intern);
            console.log(teamDirectory);
        };
    };

    function writeToFile(fileName, data) {
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                return console.log(err);
            } else {
                console.log("Success!")
            }
        })
    }

    function stepThree() {
        writeToFile(outputPath, render(teamDirectory));
    }
}

initialize();