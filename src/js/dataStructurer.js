import dataStorage from "./dataStorage";

const createTaskObj = function (title, description, projectID, date, done) {
    return { title: title, description: description, projectID: projectID, date: date, done: done };
};

const getAllVisibleTasks = function () {
    return dataStorage.getAllTasks();
};

export default {
    createTaskObj,
    getAllVisibleTasks,
};
