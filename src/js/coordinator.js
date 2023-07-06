import dataStorage from "./dataStorage.js";
import dataStructurer from "./dataStructurer.js";
import domCreator from "./domCreator.js";

const coordinateInitialLoad = function () {
    const viewsCollection = dataStructurer.createViewsCollection();
    dataStorage.saveSessionStorage("allViews", viewsCollection);
    dataStorage.saveSessionStorage("currentView", 1);

    domCreator.drawAllProjectsToSidebar();
    domCreator.drawVisibleTasksToTasklist();
    domCreator.drawNewTaskButtonToTasklist();
    domCreator.drawAllViewsToSidebar();
    domCreator.indicateCurrentView();
};

export default {
    coordinateInitialLoad,
};
