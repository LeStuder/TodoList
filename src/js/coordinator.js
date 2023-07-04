import domCreator from "./domCreator.js";

//initial draw

const coordinateInitialLoad = function () {
    //TODO --> Load allProjects and allTasks from Storage
    let allProjects = [{ name: "Private" }, { name: "Work" }];
    let allTasks = [
        { id: 1, title: "Create the first Task", description: "This task is meant to be shown as the first test-task" },
        {
            id: 2,
            title: "Create the second Task",
            description: "This task is meant to be shown as the second test-task",
        },
    ];

    //TODO --> Later on use a coodinator function that updates the ProjectsSidebar
    for (let i in allProjects) {
        let project = domCreator.createProject(allProjects[i]);
        domCreator.drawToProjectSidebar(project);
    }

    for (let i in allTasks) {
        const taskElem = domCreator.createTaskElement(allTasks[i]);
        const divider = domCreator.createDividerElement();
        domCreator.drawToTasklist(taskElem);
        domCreator.drawToTasklist(divider);
    }

    const newTaskButton = domCreator.createNewTaskButtonElement();
    domCreator.drawToTasklist(newTaskButton);
};

export default {
    coordinateInitialLoad,
};
