const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerPrompt = () => {
    return inquirer.prompt ([
        {
            type:"input",
            name:"managerName",
            message:"what's your manager's name?"
        },
        {
            type:"input",
            name:"managerID",
            message:"what's your manager's ID?"
        },
        {
            type:"input",
            name:"managerEmail",
            message:"what's your manager's email address?"
        },
        {
            type:"input",
            name:"managerOffice",
            message:"what's your manager's office number?"
        }
       
      ])

}

const engineerPrompt = () => {
    return inquirer.prompt ([
        {
            type:"input",
            name:"engineerName",
            message:"what's this employee's name?"
        },
        {
            type:"input",
            name:"engineerID",
            message:"what's their ID?"
        },
        {
            type:"input",
            name:"engineerEmail",
            message:"what's your their email address?"
        },
        {
            type:"input",
            name:"github",
            message:"what's their github username?"
        }
       
      ])

}

const internPrompt = () => {
    return inquirer.prompt ([
        {
            type:"input",
            name:"internName",
            message:"what's this intern's name?"
        },
        {
            type:"input",
            name:"internID",
            message:"what's their ID?"
        },
        {
            type:"input",
            name:"internEmail",
            message:"what's your their email address?"
        },
        {
            type:"input",
            name:"school",
            message:"what's school did they go to?"
        }
       
      ])

}



//prompt user questions about the manager
//asked the user if they want to add more employees
//ask user which type of employee they want to add
//if they choose engineer init prompt with specific Qs about engineer employees
//if intern init prompt with speicfic Qs about Interns
// after each employee addition ask the user of they want to add more employees
//when user finally selects "no" to adding more employees 



const addMorePrompt = () => {
    return inquirer.prompt ([
        {
            type:"confirm",
            name: "addMore",
            message: "Do you want to add more employees?"
        }

    ])
}

const employeeType = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "employeeType",
            message: "what type of employee?",
            choices: ["Engineer", "Intern"]
        }
    ])
}



async function init() {
    try {
        
            const managerAnswers = await managerPrompt();
            const engAnswers = await engineerPrompt();
            const internAnswers = await internPrompt();
            const addMore = await addMorePrompt();
            
            
            console.log(addMore.addMore);
    
            const manager = await new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.managerOffice);
            const engineer = await new Engineer(engAnswers.engineerName, engAnswers.engineerID, engAnswers.engineerEmail, engAnswers.github);
            const intern = await new Intern(internAnswers.internName, internAnswers.internID, internAnswers.internEmail, internAnswers.school);
            console.log(manager);
            console.log(engineer);
            console.log(intern);
            const employees = [];
            employees.push(manager);
            employees.push(engineer);
            employees.push(intern);
            const htmlRendered = render(employees);
            await writeFileAsync(outputPath, htmlRendered);
        
    

    
    } catch (err) {
        console.log(err);
    }
}

init();








// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
