/**

_load()

_save()

getAllTasks

getAllProjects

getAllParameters

addTask
    _assignID

addProject

deleteTask

deleteProject

editTask

editProject



 */

const _load = function (key) {
    const test = localStorage.getItem(key);
    return test;
};

const _save = function (key, dataObj) {
    localStorage.setItem(key, dataObj);
};

export default {
    // _load,
    // _save,
};
