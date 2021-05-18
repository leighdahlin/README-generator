// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const fs = require("fs");
let responsesToQs  = {};

// TODO: Create an array of questions for user input
const basicQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: "What's your Github userame?",
            validate (input) {
                if(input==="") {
                    return 'Please enter a username';
                } else {
                    return true;
                }
            },
        },
        {
            type: 'input',
            name: 'title',
            message:'What is the title of your project?',
            validate (input) {
                if(input==="") {
                    return 'Please enter a title';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provde a description of the project.',
            validate (input) {
                if(input==="") {
                    return 'Please enter a description of the project';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirm_contents',
            message: 'Do you want to include a table of contents?'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What steps are required to install your project? If left blank, section will be exlcuded.'
        },
        {
            type: 'input',
            name: 'usage',
            message:'Provide instructions and examples for use, if left blank, section will be exlcuded.',
        },
        {
            type: 'input',
            name: 'features',
            message:"What are the features of the project? If left blank, section will be exlcuded."
        },
        {
            type: 'input',
            name: 'credits',
            message: "List any collaborators of the project. If left blank, section will be exlcuded."
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose your license',
            choices: ['MIT','GNU GPLv3','Apache']
        }
    ])

    .then((data) =>{
        JSON.stringify(data, null, '\t')
        tableOfContents(data)
        fs.writeFile("README.md",generateREADME(data), (err) =>
        err ? console.log(data) : console.log('Success!')
        );
    });
        
};

generateREADME = (answers) =>
`
# ${answers.title}

## Description
${answers.description}

## Table of Contents

 - [Installatio] (#installation)
 - [Usage] (#usage)
 - [Features] (#features)
 - [Credits] (#credits)
 - [License] (#license)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Features
${answers.features}

# Credits
${answers.credits}

# License
`

function tableOfContents(answers) {
    for (const answer in answers) {
        console.log(`${answer}: ${answers[answer]}`)
        if(answers[answer] == "") {
            console.log("Don't include")
        }
    }

}

function installation(answers) {
    if(answers) {
        console.log("Include installation!")
        return `Table of Contents`
    } else {
        console.log("Don't include installation!")
    }
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);
}

// TODO: Create a function to initialize app
function init() {
    basicQuestions();
        
}

// Function call to initialize app
init();



