/**

addTask
    _assignID

addProject

deleteTask

deleteProject

editTask

editProject



 */

const _load = function (key) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return {};
    } else {
        return JSON.parse(data);
    }
};

const _save = function (key, dataObj) {
    localStorage.setItem(key, JSON.stringify(dataObj));
};

const getAllTasks = function () {
    return _load("tasks");
};
const getAllProjects = function () {
    return _load("projects");
};
const getAllParameters = function () {
    return _load("parameters");
};

export default {
    // _load,
    _save,
    getAllTasks,
    getAllProjects,
    getAllParameters,
};
