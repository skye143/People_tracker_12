const inquirer = require('inquirer');
const figlet = require('figlet');
const gradient = require('gradient-string'); 



const msg = () => {
    figlet(`Employee Manager`, function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(gradient.pastel.multiline(data));
        promptUser();
    });
};



const promptUser = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'startApplication',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        })
        .then((data) => {
            switch (data['startApplication']) {
                case 'View All Employees':
                    viewAllEmp();
                    break;
                case 'View All Employees By Department':
                    viewEmpByDep();
                    break;
                case 'View All Employees By Manager':
                    viewEmpByManager();
                    break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Update Employee Role':
                    updateEmp();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break; 
                case 'View All Departments':
                    viewDep();
                    break;
                case 'Add Department':
                    addDep();
                    break;
                case 'Quit':
                    break;
            }
        })
        .catch((error) => {
            console.log('error');
        })
};