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
        message: 'What is your name?',
        validate: nameInput => {
            if (nameInput)
            {
                return true;
            }
            else{
                console.log('Please enter name');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({confirmAbout}) =>{
            if(confirmAbout){
                return true;
            }else{
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter Your Github username',
        validate: githubUserName => {
            if (githubUserName){
                return true;
            }
            else{
                console.log("Enter github user name");
                return false;
            }
        }
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
          message: 'What is the name of your project?',
          validate: projectName => {
              if(projectName)
              {
                  return true;
              }
              else{
                  console.log("Please enter project name");
                  return false;
              }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: projectDesc => {
              if(projectDesc)
              {
                  return true;
              }
              else{
                  console.log("Please enter project description");
                  return false;
              }
          }
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
          message: 'Enter the GitHub link to your project. (Required)',
          validate: githubLink => {
              if(githubLink)
              {
                  return true;
              }
              else{
                  console.log("Please enter github link");
                  return false;
              }
          }
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