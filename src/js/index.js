/**  
Modules:



coordinator
    Coordinator
        Handles things like the initial load of the page


domEvents
    Able to create Event Listeners and contains the specific Functions called by the Event Listeners


domCreator
    This takes an Object and a Place to display the Objects content


dataStorage:
    Data Saver
        This saves new Input to a JSON-file

    Data Loader
        This loads a JSON-file


dataStructurer:
    Data Structurer
        Things like associating the tasks with their projects
        Also things like removing the project from tasks where the project has been deleted.

    Data Selecter
        This takes a Object from the Data Loader and returns a filtered Object to the Creator
 */

import domCreator from "./domCreator.js";

domCreator.drawProjects([{ name: "Private" }, { name: "Work" }]);
let allTasks = [
    { id: 1, title: "Create the first Task", description: "This task is meant to be shown as the first test-task" },
    { id: 2, title: "Create the second Task", description: "This task is meant to be shown as the second test-task" },
];

//initial draw
for (let i in allTasks) {
    domCreator.drawTask(allTasks[i]);
}