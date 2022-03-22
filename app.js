const inquirer = require('inquirer');

//const fs = require('fs');
//const generatePage = require("./src/page-template.js");
//const pageHtml = generatePage(name, github);

//fs.writeFile('./index.html', pageHtml, 
//                err => {
//                    if(err) throw err;
//                    console.log("Portfolio complete! Check out index.html");
//                } );

const promptUser = ()=> {
    return inquirer
    .prompt([{
        type : 'input',
        name: 'name',
        message: 'What is your name?'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter Your Github username'
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide info about yourself'
    }

])};




const promptProjects = portfolioData =>{
      console.log(
          `
          ==================================
                Project section start
          ==================================
          `
      )
      if(!portfolioData.projects)
      {
        portfolioData.projects =[];
      }
      
      return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)'
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you build this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project. (Required)'
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }
      ])
      .then(projectData => {
            portfolioData.projects.push(projectData);

            if(projectData.confirmAddProject){
                return promptProjects(portfolioData);
            }
            else
            {
                return portfolioData;
            }
        }
      );
};

promptUser()
    .then(promptProjects)
    .then (portfolioData => console.log(portfolioData));