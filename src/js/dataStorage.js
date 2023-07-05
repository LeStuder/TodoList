/**

deleteTask

deleteProject

editTask

editProject



 */

const _load = function (key) {
    return localStorage.getItem(key);
};

const _save = function (key, dataObj) {
    localStorage.setItem(key, JSON.stringify(dataObj));
};

const getAllTasks = function () {
    const allTasks = _load("tasks");

    if (allTasks === null) {
        return {};
    } else {
        return JSON.parse(allTasks);
    }
};
const getAllProjects = function () {
    const allProjects = _load("projects");

    if (allProjects === null) {
        return [];
    } else {
        return JSON.parse(allProjects);
    }
};

const _setAllTasks = function (allTasks) {
    _save("tasks", allTasks);
};

const _setAllProjects = function (allProjects) {
    _save("projects", allProjects);
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
    _setAllTasks(allTasks);
};

const addProject = function (name) {
    const allProjects = getAllProjects();
    if (allProjects.some((elem) => elem === name)) {
        console.error("Project already exists");
    } else {
        allProjects.push(name);
        _setAllProjects(allProjects);
    }
};

export default {
    // _load,
    _save,
    getAllTasks,
    getAllProjects,
    addTask,
    addProject,
};
