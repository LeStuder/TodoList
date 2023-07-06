import dataStructurer from "./dataStructurer";

const _loadLocalStorage = function (id) {
    const obj = localStorage.getItem(id);

    if (obj === null) {
        return {};
    } else {
        return JSON.parse(obj);
    }
};

const _saveLocalStorage = function (id, dataObj) {
    localStorage.setItem(id, JSON.stringify(dataObj));
};

const loadSessionStorage = function (id) {
    const obj = sessionStorage.getItem(id);
    return JSON.parse(obj);
};

const saveSessionStorage = function (id, dataObj) {
    sessionStorage.setItem(id, JSON.stringify(dataObj));
};

const _assignUniqueID = function (type, obj) {
    let allParameters = _getAllParameters();
    if (!allParameters.lastUsedID) {
        allParameters.lastUsedID = {};
    }
    if (!allParameters.lastUsedID[type]) {
        allParameters.lastUsedID[type] = 0;
    }
    let newID = null;
    const allIDs = Object.keys(obj);
    let lastUsedID = allParameters.lastUsedID[type];
    if (Number.isInteger(allIDs[allIDs.length - 1])) {
        lastUsedID = Math.max(parseInt(allIDs[allIDs.length - 1]), allParameters.lastUsedID[type]);
    }
    newID = lastUsedID + 1;
    allParameters.lastUsedID[type] = newID;
    _setAllParameters(allParameters);
    return newID;
};

const getAllTasks = function () {
    return _loadLocalStorage("tasks");
};

const getAllProjects = function () {
    return _loadLocalStorage("projects");
};

const _getAllParameters = function () {
    return _loadLocalStorage("parameters");
};

const _setAllTasks = function (allTasks) {
    _saveLocalStorage("tasks", allTasks);
};

const _setAllProjects = function (allProjects) {
    _saveLocalStorage("projects", allProjects);
};

const _setAllParameters = function (allParameters) {
    _saveLocalStorage("parameters", allParameters);
};

const removeProjectFromTasks = function (id) {
    let allTasks = getAllTasks();
    let generalProjectID = 1;
    for (let i in allTasks) {
        if (allTasks[i].project === id) {
            allTasks[i].project = generalProjectID;
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

const addProject = function (projectName) {
    const allProjects = getAllProjects();
    const id = _assignUniqueID("projects", allProjects);
    if (Object.values(allProjects).some((elem) => elem === projectName)) {
        console.log("Project already exists");
    } else {
        allProjects[id] = projectName;
        _setAllProjects(allProjects);
    }
};

const deleteTask = function (id) {
    let allTasks = getAllTasks();
    delete allTasks[id];
    _setAllTasks(allTasks);
};

const deleteProject = function (id) {
    let allProjects = getAllProjects();
    removeProjectFromTasks(id);
    delete allProjects[id];
    _setAllProjects(allProjects);
};

const editTask = function (id, taskObj) {
    let allTasks = getAllTasks();
    allTasks[id] = taskObj;
    _setAllTasks(allTasks);
};

const editProject = function (id, projectName) {
    let allProjects = getAllProjects();
    allProjects[id] = projectName;
    _setAllProjects(allProjects);
};

const setTaskStatus = function (id, done) {
    const allTasks = getAllTasks();
    const task = allTasks[id];
    task.done = done;
    allTasks[id] = task;
    _setAllTasks(allTasks);
};

export default {
    // _loadLocalStorage,
    // _saveLocalStorage,
    loadSessionStorage,
    saveSessionStorage,
    getAllTasks,
    getAllProjects,
    addTask,
    addProject,
    deleteTask,
    deleteProject,
    editTask,
    editProject,
    setTaskStatus,
};
