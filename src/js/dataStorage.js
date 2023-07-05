import dataStructurer from "./dataStructurer";

const _load = function (key) {
    const obj = localStorage.getItem(key);

    if (obj === null) {
        return {};
    } else {
        return JSON.parse(obj);
    }
};

const _save = function (key, dataObj) {
    localStorage.setItem(key, JSON.stringify(dataObj));
};

const _assignUniqueID = function (type, obj) {
    let allParameters = _getAllParameters();
    if (!allParameters.lastUsedKey) {
        allParameters.lastUsedKey = {};
    }
    if (!allParameters.lastUsedKey[type]) {
        allParameters.lastUsedKey[type] = 0;
    }
    let newKey = null;
    const allKeys = Object.keys(obj);
    let lastUsedKey = allParameters.lastUsedKey[type];
    if (Number.isInteger(allKeys[allKeys.length - 1])) {
        lastUsedKey = Math.max(parseInt(allKeys[allKeys.length - 1]), allParameters.lastUsedKey[type]);
    }
    newKey = lastUsedKey + 1;
    allParameters.lastUsedKey[type] = newKey;
    _setAllParameters(allParameters);
    return newKey;
};

const getAllTasks = function () {
    return _load("tasks");
};

const getAllProjects = function () {
    return _load("projects");
};

const _getAllParameters = function () {
    return _load("parameters");
};

const _setAllTasks = function (allTasks) {
    _save("tasks", allTasks);
};

const _setAllProjects = function (allProjects) {
    _save("projects", allProjects);
};

const _setAllParameters = function (allParameters) {
    _save("parameters", allParameters);
};

const removeProjectFromTasks = function (key) {
    let allTasks = getAllTasks();
    let generalProjectKey = 1;
    for (let i in allTasks) {
        if (allTasks[i].project === key) {
            allTasks[i].project = generalProjectKey;
        }
    }
    //TODO --> Promt the User in domCreator that the tasks will be resetted to the "General" project
    _setAllTasks(allTasks);
};

const addTask = function (taskObj) {
    const allTasks = getAllTasks();
    const id = _assignUniqueID("tasks", allTasks);
    allTasks[id] = taskObj;
    _setAllTasks(allTasks);
};

const addProject = function (name) {
    const allProjects = getAllProjects();
    const id = _assignUniqueID("projects", allProjects);
    if (Object.values(allProjects).some((elem) => elem === name)) {
        console.log("Project already exists");
    } else {
        allProjects[id] = name;
        _setAllProjects(allProjects);
    }
};

const deleteTask = function (key) {
    let allTasks = getAllTasks();
    delete allTasks[key];
    _setAllTasks(allTasks);
};

const deleteProject = function (key) {
    let allProjects = getAllProjects();
    removeProjectFromTasks(key);
    delete allProjects[key];
    _setAllProjects(allProjects);
};

const editTask = function (key, taskObj) {
    let allTasks = getAllTasks();
    allTasks[key] = taskObj;
    _setAllTasks(allTasks);
};

const editProject = function (key, projectName) {
    let allProjects = getAllProjects();
    allProjects[key] = projectName;
    _setAllProjects(allProjects);
};

export default {
    // _load,
    // _save,
    getAllTasks,
    getAllProjects,
    _setAllTasks,
    addTask,
    addProject,
    deleteTask,
    deleteProject,
    editTask,
    editProject,
};
