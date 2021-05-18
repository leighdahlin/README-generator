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
            name: 'email',
            message: "What's your email address?",
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
            type: 'input',
            name: 'installation',
            message: 'What steps are required to install your project?'
        },
        {
            type: 'input',
            name: 'usage',
            message:'Provide instructions and examples for use.',
        },
        {
            type: 'input',
            name: 'features',
            message:"What are the features of the project?"
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose your license',
            choices: ['MIT','GNU GPLv3','Apache']
        },
        {
            type: 'input',
            name: 'credits',
            message: "List any collaborators of the project."
        },
        {
            type: 'input',
            name: 'contributing',
            message: "What are the guidelines for contribution?"
        },
        {
            type: 'input',
            name: 'testing',
            message: "What are instructions for testing your project?"
        },
    ])

    .then((data) =>{
    
        const filename = `${data.title.toLowerCase().split(' ').join('')}.md`;
        JSON.stringify(data, null, '\t')

        // license(data);

        fs.writeFile(filename,generateREADME(data,licenseBadge(data),licenseText(data)), (err) =>
        err ? console.log(data) : console.log('Success!')
        );
    });
        
};

generateREADME = (answers, badge, license) =>

`
${badge}

# ${answers.title}

## Description
${answers.description}

## Table of Contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Features](#features)
 - [Credits](#credits)
 - [Contributing](#contributing)
 - [Tests](#tests)
 - [Questions](#questions)


## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${license}

## Features
${answers.features}

## Credits
${answers.credits}

## Contributing
${answers.contributing}

## Tests
${answers.testing}

## Questions
https://github.com/${answers.username}  
${answers.email}
`
function licenseBadge(answers) {

    switch(answers.license) {
        case 'MIT':
            let badgeMIT = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
            return badgeMIT;
            break;
        case 'GNU GPLv3':
            let badgeGNU = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
            return badgeGNU;
            break;
        case 'Apache':
            let badgeApache =  "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
            return badgeApache;
            break;
    }
}

function licenseText(answers) {

    switch(answers.license) {
        case 'MIT':
            let licenseMIT = "MIT license"
            return licenseMIT;
            break;
        case 'GNU GPLv3':
            let licenseGNU = "GNU GPLv3 license"
            return licenseGNU;
            break;
        case 'Apache':
            let licenseApache =  "Apache license"
            return licenseApache;
            break;
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



