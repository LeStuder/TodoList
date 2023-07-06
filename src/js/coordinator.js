import dataStorage from "./dataStorage.js";
import dataStructurer from "./dataStructurer.js";
import domCreator from "./domCreator.js";

const coordinateInitialLoad = function () {
    //TODO --> Load allProjects and allTasks from Storage

    domCreator.drawAllProjectsToSidebar();
    domCreator.drawVisibleTasksToTasklist();
    domCreator.drawNewTaskButtonToTasklist();
};

export default {
    coordinateInitialLoad,
};
