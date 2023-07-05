import dataStorage from "./dataStorage.js";
import domCreator from "./domCreator.js";

const coordinateInitialLoad = function () {
    //TODO --> Load allProjects and allTasks from Storage
    let allProjects = dataStorage.getAllProjects();
    let allTasks = dataStorage.getAllTasks();

    //TODO --> Later on use a coodinator function that updates the ProjectsSidebar
    for (let i in allProjects) {
        let project = domCreator.createProject(i, allProjects[i]);
        domCreator.drawToProjectSidebar(project);
    }

    for (let i in allTasks) {
        const taskElem = domCreator.createTaskElement(i, allTasks[i]);
        const divider = domCreator.createDividerElement();
        domCreator.drawToTasklist(taskElem);
        domCreator.drawToTasklist(divider);
    }

    const newTaskButton = domCreator.createNewTaskButtonTasklistElement();
    domCreator.drawToTasklist(newTaskButton);
};

export default {
    coordinateInitialLoad,
};
