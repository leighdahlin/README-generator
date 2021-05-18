// Using the inquirer npm package
// fs is a Node standard library package for reading and writing files

const inquirer = require("inquirer");
const fs = require("fs");

//user input user to generate README
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
        {
            type: 'list',
            name: 'license',
            message: 'Choose your license',
            choices: ['MIT','GNU GPLv3','Apache']
        },
    ])

    .then((data) =>{
        
        //uses the title the user input to create a file name that's lowercase and joins any words togther without a space
        const filename = `${data.title.toLowerCase().split(' ').join('')}.md`;

        //converts the data to a string
        JSON.stringify(data, null, '\t')

        //the filename generated above is used to name the file
        //the data is use in the generateREADME function which takes in the arguments data(from prompts), licenseBadge function and licenseText function
        fs.writeFile(filename,generateREADME(data,licenseBadge(data),licenseText(data)), (err) =>
        err ? console.log(data) : console.log('Success!')
        );
    });
        
};

//template for README text, the license badge and text are pulled from the licenseBadge function and licenseText function
generateREADME = (answers, badge, license) =>
`
${badge}

# ${answers.title}

## Description
${answers.description}

## Table of Contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [Features](#features)
 - [Credits](#credits)
 - [Contributing](#contributing)
 - [Tests](#tests)
 - [License](#license)
 - [Questions](#questions)


## Installation
${answers.installation}

## Usage
${answers.usage}

## Features
${answers.features}

## Credits
${answers.credits}

## Contributing
${answers.contributing}

## Tests
${answers.testing}

## License
${license}

## Questions
If you have any questions, please use the contact information below:
https://github.com/${answers.username}  
${answers.email}
`

//based on the license selected by the user, returns the badge for the selected license
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

//based on the license selected by the user, returns the license text for the selected license
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

// Initialize function
function init() {
    basicQuestions();
        
}

// Function call to initialize app
init();



