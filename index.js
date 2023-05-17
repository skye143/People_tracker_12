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
