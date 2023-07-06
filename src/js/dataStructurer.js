import dataStorage from "./dataStorage";
import utility from "./utility";

const createTaskObj = function (title, description, projectID, date, done) {
    return { title: title, description: description, projectID: projectID, date: date, done: done };
};

const getAllVisibleTasks = function () {
    return dataStorage.getAllTasks();
};

const createViewsCollection = function () {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const viewsCollection = {
        1: { viewName: "All", date: "1900-01-01", iconElem: `<i class="fas fa-lg fa-calendar-alt"></i>` },
        2: {
            viewName: "Due Today",
            date: utility.formatDateString(today),
            iconElem: `<i class="fas fa-lg fa-stopwatch"></i>`,
        },
        3: {
            viewName: "Due Tomorrow",
            date: utility.formatDateString(tomorrow),
            iconElem: `<i class="fas fa-lg fa-clock"></i>`,
        },
    };

    return viewsCollection;
};

export default {
    createTaskObj,
    getAllVisibleTasks,
    createViewsCollection,
};
