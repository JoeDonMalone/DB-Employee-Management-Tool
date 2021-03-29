var inquirer = require('inquirer');
const fs = require('fs');
var repoName = 'README Builder';

function getLicense(license) {
  switch(license){
    case 'MIT':
      return('[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)')
    case 'Apache':
      return('[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)')
    case 'Boost':
      return('[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)')
    case 'BSD':
      return('[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)')
    case 'GNU':
      return('[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)')
    case 'ISC':
      return('[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)')
    case 'WTFPL':
      return('[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)')
  }
}

inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is your GitHub repository Name?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Simply describe the project?',
  },
  {
    type: 'input',
    name: 'motivation',
    message: 'What was your motivation for building this project?',
  },
  {
    type: 'input',
    name: 'lessonsLearned',
    message: 'What did you learn from this project?',
  },
  {
    type: 'input',
    name: 'installationSteps',
    message: "What are the Steps to Install this project on the User's current Runtime Environment? i.e. (Step 1. 'some Step' Step 2. 'Some Other Step')",
  },
  {
    type: 'input',
    name: 'usage',
    message: "Where/How can this application be used?",
  },
  {
    type: 'input',
    name: 'creditDue',
    message: "Are there any contributors to this project?",
  },
  {
    type: 'list',
    name: 'licensing',
    message: "How do you feel your work should be licensed? (probably 'MIT')",
    choices: [ "MIT", "Apache","Boost", "BSD", "GNU", "ISC", "WTFPL"]
  },
  {
    type: 'input',
    name: 'badges',
    message: "List your Badges",
  },
  {
    type: 'input',
    name: 'features',
    message: "Particular features you'd like to add?",
  },
  {
    type: 'input',
    name: 'tests',
    message: "Are there any testing methods you'd like to include?",
  },
])
.then((data) => {
  const filename = 'README.md';
  fs.writeFile(filename, readMeText(data), (err) =>
    err ? console.log(err) : console.log('Success!'))
})
.catch( error => {
  if(error) {
    console.log(error);
  }
});

const readMeText = (data) => 
`# ${data.title}| :exclamation:  These works are licensed! ${getLicense(data.licensing)}  |
## Description:
- ${data.description}
- ![Image of Yaktocat](./Assets/Images/CodeShot.JPG)
## Motivations:
- ${data.motivation}
## Table of Contents:
- [Description](#Description)
- [Motivations](#Motivations)
- [Lessons Learned](#Lessons-Learned)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributions](#Contributions)
- [License](#License)
- [Badges](#Badges)
- [Features](#Features)
- [Tests](#Tests)
- [Questions](#Questions)
## Lessons Learned:
- ${data.lessonsLearned}
## Installation:
- ${data.installationSteps}
## Usage:
 - ${data.usage}
## Contributions:
 - ${data.creditDue}
## License:
 - ${getLicense(data.licensing)}
## Badges:
 - ${data.badges}
## Features:
 - ${data.features}
## Tests:
 - ${data.tests}
## Questions?
- [GITHUB](https://github.com/JoeDonMalone)
- [CONTACT ME](Joe@framestix.com)
`