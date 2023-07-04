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
        return [];
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

const setAllTasks = function (allTasks) {
    _save("tasks", allTasks);
};

const addTask = function (taskObj) {
    const allTasks = getAllTasks();
    const _assignID = function () {
        const allTaskKeys = Object.keys(allTasks);
        let lastUsedKey = parseInt(allTaskKeys[allTaskKeys.length - 1]);
        return lastUsedKey + 1;
    };

    const id = _assignID();
    allTasks[id] = taskObj;
    setAllTasks(allTasks);
};

export default {
    // _load,
    _save,
    getAllTasks,
    getAllProjects,
    addTask,
};
