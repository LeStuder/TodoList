import dataStorage from "./dataStorage";

const createTaskObj = function (title, description, projectKey, date, done) {
    return { title: title, description: description, projectKey: projectKey, date: date, done: done };
};

const getAllVisibleTasks = function () {
    return dataStorage.getAllTasks();
};

export default {
    createTaskObj,
    getAllVisibleTasks,
};
