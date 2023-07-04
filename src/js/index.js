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

import coordinator from "./coordinator";
import dataStorage from "./dataStorage";

//testing
const testDataSetup = function () {
    dataStorage._save("tasks", {
        1: {
            title: "task one",
            description: "description of task one",
            project: "Project 1",
            date: "2000-01-01",
            done: false,
        },
        2: {
            title: "task two",
            description: "description of task two",
            project: "Project 2",
            date: "2000-03-03",
            done: false,
        },
    });

    dataStorage._save("projects", ["Private", "Work"]);
};

testDataSetup();
dataStorage.addTask({
    title: "task three",
    description: "description of task three",
    project: "Project 2",
    date: "2000-03-03",
    done: false,
});
dataStorage.addProject("Project 3");
// const test = dataStorage.getAllTasks();
//end testing

coordinator.coordinateInitialLoad();

//testing
// const taskInputElement = domCreator.createTaskInputElement();
// domCreator.drawToTasklist(taskInputElement);
//end testing
