/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/coordinator.js":
/*!*******************************!*\
  !*** ./src/js/coordinator.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dataStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataStorage.js */ "./src/js/dataStorage.js");
/* harmony import */ var _dataStructurer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataStructurer.js */ "./src/js/dataStructurer.js");
/* harmony import */ var _domCreator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domCreator.js */ "./src/js/domCreator.js");




const coordinateInitialLoad = function () {
    const viewsCollection = _dataStructurer_js__WEBPACK_IMPORTED_MODULE_1__["default"].createViewsCollection();
    _dataStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveSessionStorage("allViews", viewsCollection);
    _dataStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveSessionStorage("currentView", 1);

    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawAllProjectsToSidebar();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawVisibleTasksToTasklist();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawNewTaskButtonToTasklist();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawAllViewsToSidebar();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].indicateCurrentView();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    coordinateInitialLoad,
});


/***/ }),

/***/ "./src/js/dataStorage.js":
/*!*******************************!*\
  !*** ./src/js/dataStorage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dataStructurer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataStructurer */ "./src/js/dataStructurer.js");


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
});


/***/ }),

/***/ "./src/js/dataStructurer.js":
/*!**********************************!*\
  !*** ./src/js/dataStructurer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dataStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataStorage */ "./src/js/dataStorage.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./src/js/utility.js");



const createTaskObj = function (title, description, projectID, date, done) {
    return { title: title, description: description, projectID: projectID, date: date, done: done };
};

const getAllVisibleTasks = function () {
    return _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getAllTasks();
};

const createViewsCollection = function () {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const viewsCollection = {
        1: { viewName: "All", date: "1900-01-01", iconElem: `<i class="fas fa-lg fa-calendar-alt"></i>` },
        2: {
            viewName: "Due Today",
            date: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatDateString(today),
            iconElem: `<i class="fas fa-lg fa-stopwatch"></i>`,
        },
        3: {
            viewName: "Due Tomorrow",
            date: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatDateString(tomorrow),
            iconElem: `<i class="fas fa-lg fa-clock"></i>`,
        },
    };

    return viewsCollection;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    createTaskObj,
    getAllVisibleTasks,
    createViewsCollection,
});


/***/ }),

/***/ "./src/js/domCreator.js":
/*!******************************!*\
  !*** ./src/js/domCreator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dataStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataStorage */ "./src/js/dataStorage.js");
/* harmony import */ var _eventCoordinator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventCoordinator */ "./src/js/eventCoordinator.js");
/* harmony import */ var _dataStructurer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataStructurer */ "./src/js/dataStructurer.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utility */ "./src/js/utility.js");
/**
TODO:
drawNewTaskModal

*/






//Add domElement to the Tasklist
const drawToTasklist = function (domElement) {
    let tasksContainer = document.getElementById("tasks-container");
    tasksContainer.appendChild(domElement);
};

//add domElement to the Project Panel in the Sidebar
const drawToProjectlist = function (domElement) {
    let projectsSidebarContainer = document.getElementById("projects-sidebar-container");
    projectsSidebarContainer.appendChild(domElement);
};

const drawToViewlist = function (domElement) {
    let viewsSidebarContainer = document.getElementById("views-sidebar-container");
    viewsSidebarContainer.appendChild(domElement);
};

const clearTasklist = function () {
    let tasksContainer = document.getElementById("tasks-container");
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
};

const drawVisibleTasksToTasklist = function () {
    let tasks = _dataStructurer__WEBPACK_IMPORTED_MODULE_2__["default"].getAllVisibleTasks();
    for (let i in tasks) {
        const taskElem = createTaskElement(i, tasks[i]);
        const divider = createDividerElement();
        drawToTasklist(taskElem);
        drawToTasklist(divider);
    }
};

const drawNewTaskButtonToTasklist = function () {
    const newTaskButton = createNewTaskButtonTasklistElement();
    drawToTasklist(newTaskButton);
};

const drawAllProjectsToSidebar = function () {
    let allProjects = _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getAllProjects();
    for (let i in allProjects) {
        let project = createProjectElement(i, allProjects[i]);
        drawToProjectlist(project);
    }
};

const drawAllViewsToSidebar = function () {
    const allViews = _dataStructurer__WEBPACK_IMPORTED_MODULE_2__["default"].createViewsCollection();

    //TODO --> Save Views to sessionStorage, probably better do that in the coordinateInitialLoad()

    for (let i in allViews) {
        const viewELement = createViewElement(i, allViews[i].viewName, allViews[i].iconElem);
        drawToViewlist(viewELement);
    }
};

const createViewElement = function (viewID, viewName, iconElem) {
    const viewNameKebabCase = _utility__WEBPACK_IMPORTED_MODULE_3__["default"].makeKebabCase(viewName);

    const button = document.createElement("button");
    button.type = "button";
    button.id = `view-button-${viewNameKebabCase}`;
    button.value = viewID;
    button.classList.add("btn", "btn-light", "sidebar-btn");

    const row = document.createElement("div");
    row.classList.add("row");

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("col-2");

    const textContainer = document.createElement("div");
    textContainer.classList.add("col-10");
    textContainer.textContent = viewName;

    iconContainer.innerHTML = iconElem;
    row.appendChild(iconContainer);
    row.appendChild(textContainer);
    button.appendChild(row);

    return button;
};

const indicateCurrentView = function () {
    const currentViewID = _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].loadSessionStorage("currentView");

    if (currentViewID === null) {
        currentViewID = 1;
    }

    const allViews = _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].loadSessionStorage("allViews");
    const currentViewName = allViews[currentViewID].viewName;

    const viewButtons = document.getElementById("views-sidebar-container").children;
    for (let i = 0; i < viewButtons.length; i++) {
        if (viewButtons[i].value == currentViewID) {
            viewButtons[i].classList.add("active");
        } else {
            viewButtons[i].classList.remove("active");
        }
    }

    const currentViewTextElement = document.getElementById("current-view-text");
    currentViewTextElement.textContent = `${currentViewName} Tasks`;
};

//returns a domElement based on the project-name string given as parameter
const createProjectElement = function (id, projectName) {
    let button = document.createElement("button");
    button.type = "button";
    button.value = id;
    button.classList.add("btn", "btn-light", "sidebar-btn");

    //TODO --> add event listener

    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row");

    let iconContainer = document.createElement("div");
    iconContainer.classList.add("col-1");

    let icon = document.createElement("i");
    icon.classList.add("far", "fa-sm", "fa-circle");

    let textContainer = document.createElement("div");
    textContainer.classList.add("col-auto");
    textContainer.textContent = projectName;

    iconContainer.appendChild(icon);
    rowContainer.appendChild(iconContainer);
    rowContainer.appendChild(textContainer);
    button.appendChild(rowContainer);
    return button;
};

//returns a domElement based on the task object given as parameter
const createTaskElement = function (id, taskObj) {
    let mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media", "d-flex");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${id}`;
    checkbox.value = id;
    checkbox.checked = taskObj.done;
    checkbox.classList.add("form-check-input", "align-self-start", "mt-2");
    checkbox.addEventListener("click", (event) => {
        _eventCoordinator__WEBPACK_IMPORTED_MODULE_1__["default"].clickTaskCheckbox(event);
    });

    //TODO --> event listener when checkbox is checked or unchecked

    let mediaBody = document.createElement("div");
    mediaBody.classList.add("media-body", "ms-3", "d-flex", "w-100", "justify-content-between");

    let textBody = document.createElement("div");

    let title = document.createElement("h4");
    title.textContent = taskObj.title;

    let description = document.createElement("div");
    description.textContent = taskObj.description;

    let buttonContainer = document.createElement("div");

    let editButton = document.createElement("button");
    editButton.type = "button";
    editButton.id = `edit-button-${id}`;
    editButton.value = id;
    editButton.classList.add("btn", "btn-light");

    //TODO --> event listener when edit-button is clicked

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pen-to-square");

    //TODO --> Add delete button, with event listener including are-you-sure-modal

    editButton.appendChild(editIcon);
    buttonContainer.appendChild(editButton);
    textBody.appendChild(title);
    textBody.appendChild(description);
    mediaBody.appendChild(textBody);
    mediaBody.appendChild(buttonContainer);
    mediaContainer.appendChild(checkbox);
    mediaContainer.appendChild(mediaBody);

    return mediaContainer;
};

//create diviser domElement for between the different tasks
const createDividerElement = function () {
    let divider = document.createElement("div");
    divider.classList.add("border-top", "my-2");

    return divider;
};

//create domElement for the button to add a new tasks at the end of the tasklist
const createNewTaskButtonTasklistElement = function () {
    let container = document.createElement("div");
    container.classList.add("container-fluid");

    let row = document.createElement("div");
    row.classList.add("row");

    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add new task";
    button.classList.add("btn", "btn-block", "btn-light");

    button.addEventListener("click", (event) => {
        _eventCoordinator__WEBPACK_IMPORTED_MODULE_1__["default"].clickNewTaskButtonTasklistElement(event);
    });

    row.appendChild(button);
    container.appendChild(row);

    return container;
};

//create domElement that can be used to add or edit a new task in the tasklist or be displayed in a modal
const createTaskInputElement = function (
    taskObj = { title: "", description: "", projectID: "", date: "", done: false },
    id = null
) {
    const createInputGroup = function (label, inputElement) {
        let inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group", "mb-2");

        let spanLabel = document.createElement("span");
        spanLabel.classList.add("input-group-text");
        spanLabel.textContent = label;

        inputGroup.appendChild(spanLabel);
        inputGroup.appendChild(inputElement);

        return inputGroup;
    };

    let form = document.createElement("form");
    form.id = "task-input-form";
    form.classList.add("needs-validation");
    form.setAttribute("novalidate", "true");

    let taskInputContainer = document.createElement("div");
    taskInputContainer.id = "task-input-container";
    taskInputContainer.classList.add("container-fluid");

    let inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.value = taskObj.title;
    inputTitle.id = "inputTitle";
    inputTitle.classList.add("form-control");
    inputTitle.required = true;

    let inputDescription = document.createElement("textarea");
    inputDescription.rows = "4";
    inputDescription.value = taskObj.description;
    inputDescription.id = "inputDescription";
    inputDescription.classList.add("form-control");

    let inputProject = document.createElement("select");
    inputProject.classList.add("form-select");
    let allProjects = _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getAllProjects();
    for (let i in allProjects) {
        let option = document.createElement("option");
        option.textContent = allProjects[i];
        option.value = i;
        inputProject.appendChild(option);
    }
    inputProject.value = taskObj.projectID;
    inputProject.id = "inputProject";

    let inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.value = taskObj.date;
    inputDate.id = "inputDate";
    inputDate.classList.add("form-control");

    let saveButtonContainer = document.createElement("div");
    saveButtonContainer.classList.add("container-fluid");

    let saveButtonRow = document.createElement("div");
    saveButtonRow.classList.add("row");

    let saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.value = id;
    saveButton.classList.add("btn", "btn-primary", "btn-block");
    saveButton.addEventListener("click", () => {
        _eventCoordinator__WEBPACK_IMPORTED_MODULE_1__["default"].clickSaveButton(id, taskObj.done);
    });

    saveButtonRow.appendChild(saveButton);
    saveButtonContainer.appendChild(saveButtonRow);

    taskInputContainer.appendChild(createInputGroup("Title", inputTitle));
    taskInputContainer.appendChild(createInputGroup("Description", inputDescription));
    taskInputContainer.appendChild(createInputGroup("Project", inputProject));
    taskInputContainer.appendChild(createInputGroup("Due Date", inputDate));
    taskInputContainer.appendChild(saveButtonContainer);
    form.appendChild(taskInputContainer);

    return form;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    drawToTasklist,
    drawToProjectlist,
    drawNewTaskButtonToTasklist,
    drawAllProjectsToSidebar,
    drawVisibleTasksToTasklist,
    drawAllViewsToSidebar,
    createViewElement,
    clearTasklist,
    indicateCurrentView,
    createProjectElement,
    createTaskElement,
    createNewTaskButtonTasklistElement,
    createDividerElement,
    createTaskInputElement,
});


/***/ }),

/***/ "./src/js/eventCoordinator.js":
/*!************************************!*\
  !*** ./src/js/eventCoordinator.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreator */ "./src/js/domCreator.js");
/* harmony import */ var _dataStructurer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataStructurer */ "./src/js/dataStructurer.js");
/* harmony import */ var _dataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataStorage */ "./src/js/dataStorage.js");




const clickNewTaskButtonTasklistElement = function (event) {
    event.target.remove();
    const taskInputElement = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskInputElement();
    _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(taskInputElement);
};

const clickSaveButton = function (id, done) {
    const title = document.getElementById("inputTitle");
    const description = document.getElementById("inputDescription");
    const projectID = document.getElementById("inputProject");
    const date = document.getElementById("inputDate");

    if (!title.value || !description.value || !projectID.value || !date.value) {
        //input validation
        const inputArr = [title, description, projectID, date];
        for (let i in inputArr) {
            if (inputArr[i].value) {
                inputArr[i].classList.remove("is-invalid");
                inputArr[i].classList.add("is-valid");
            } else {
                inputArr[i].classList.remove("is-valid");
                inputArr[i].classList.add("is-invalid");
            }
        }
    } else {
        let taskObj = {};

        //if id is null this means that the createTaskInputElement() function has been called with default values and
        //thus aims to create a new tasks
        if (id === null) {
            taskObj = _dataStructurer__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskObj(title.value, description.value, projectID.value, date.value, false);
            _dataStorage__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(taskObj);
        } else {
            taskObj = _dataStructurer__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskObj(title.value, description.value, projectID.value, date.value, done);
            _dataStorage__WEBPACK_IMPORTED_MODULE_2__["default"].editTask(id, taskObj);
        }
        const allVisibleTasks = _dataStructurer__WEBPACK_IMPORTED_MODULE_1__["default"].getAllVisibleTasks();
        _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].clearTasklist();
        for (let i in allVisibleTasks) {
            const taskElem = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElement(i, allVisibleTasks[i]);
            const divider = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createDividerElement();
            _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(taskElem);
            _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(divider);
        }
        _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawNewTaskButtonToTasklist();
    }
};

const clickTaskCheckbox = function (event) {
    const taskID = event.target.value;
    const status = event.target.checked;
    _dataStorage__WEBPACK_IMPORTED_MODULE_2__["default"].setTaskStatus(taskID, status);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ clickNewTaskButtonTasklistElement, clickSaveButton, clickTaskCheckbox });


/***/ }),

/***/ "./src/js/utility.js":
/*!***************************!*\
  !*** ./src/js/utility.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const makeKebabCase = function (input) {
    const regIsNotLetterOrDigit = /[^0-9a-zA-Z]+/g;
    const regIsNotLetterOrDigitAtEnds = /(^[^0-9a-zA-Z]+)|([^0-9a-zA-Z]+$)/g;
    const regUppercaseFollowingLowercase = /([a-z])([A-Z])/g;

    return input
        .replace(regUppercaseFollowingLowercase, "$1-$2")
        .replace(regIsNotLetterOrDigitAtEnds, "")
        .replace(regIsNotLetterOrDigit, "-")
        .toLowerCase();
};

const formatDateString = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    makeKebabCase,
    formatDateString,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coordinator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinator */ "./src/js/coordinator.js");
/* harmony import */ var _dataStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataStorage */ "./src/js/dataStorage.js");
/* harmony import */ var _domCreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domCreator */ "./src/js/domCreator.js");
/**  
Modules:



coordinator
    Coordinator
        Handles things like the initial load of the page


domEvents
    Able to create Event Listeners and contains the specific Functions called by the Event Listeners


domCreator
    This takes an Object and a Place to display the Objects content


dataStorage:
    Data Saver
        This saves new Input to a JSON-file

    Data Loader
        This loads a JSON-file


dataStructurer:
    Data Structurer
        Things like associating the tasks with their projects
        Also things like removing the project from tasks where the project has been deleted.

    Data Selecter
        This takes a Object from the Data Loader and returns a filtered Object to the Creator
 */





//testing
const testDataSetup = function () {
    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("General");
    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("Private");
    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("Work");

    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addTask({
        title: "task one",
        description: "description of task one",
        project: 2,
        date: "2000-01-02",
        done: false,
    });
    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addTask({
        title: "task two",
        description: "description of task two",
        project: 3,
        date: "2003-04-05",
        done: false,
    });
};

// testDataSetup();
// dataStorage.addTask({
//     title: "task three",
//     description: "description of task three",
//     project: "Project 2",
//     date: "2000-03-03",
//     done: false,
// });
// dataStorage.addProject("Project 3");
// dataStorage.deleteTask(1);
// dataStorage.deleteProject(2);
// dataStorage.editProject(2, "Private");
// dataStorage.editTask(2, {
//     title: "task two",
//     description: "description of task two with some edit",
//     project: 3,
//     date: "2000-03-03",
//     done: false,
// });
//end testing

_coordinator__WEBPACK_IMPORTED_MODULE_0__["default"].coordinateInitialLoad();

//testing
// const taskInputElement = domCreator.createTaskInputElement();
// domCreator.drawToTasklist(taskInputElement);
//end testing

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEyQztBQUNNO0FBQ1I7QUFDekM7QUFDQTtBQUNBLDRCQUE0QiwwREFBYztBQUMxQyxJQUFJLHVEQUFXO0FBQ2YsSUFBSSx1REFBVztBQUNmO0FBQ0EsSUFBSSxzREFBVTtBQUNkLElBQUksc0RBQVU7QUFDZCxJQUFJLHNEQUFVO0FBQ2QsSUFBSSxzREFBVTtBQUNkLElBQUksc0RBQVU7QUFDZDtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCNEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xKc0M7QUFDUjtBQUNoQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0RBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsNEZBQTRGO0FBQ3pHO0FBQ0E7QUFDQSxrQkFBa0IsZ0RBQU87QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtCQUFrQixnREFBTztBQUN6QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dDO0FBQ1U7QUFDSjtBQUNkO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixvREFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixnREFBTztBQUNyQztBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9EQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsaUJBQWlCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsR0FBRztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseURBQWdCO0FBQ3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsR0FBRztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBZ0I7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrRUFBa0U7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0RBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBZ0I7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hWb0M7QUFDUTtBQUNOO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBVTtBQUN2QyxJQUFJLG1EQUFVO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdURBQWM7QUFDcEMsWUFBWSxvREFBVztBQUN2QixVQUFVO0FBQ1Ysc0JBQXNCLHVEQUFjO0FBQ3BDLFlBQVksb0RBQVc7QUFDdkI7QUFDQSxnQ0FBZ0MsdURBQWM7QUFDOUMsUUFBUSxtREFBVTtBQUNsQjtBQUNBLDZCQUE2QixtREFBVTtBQUN2Qyw0QkFBNEIsbURBQVU7QUFDdEMsWUFBWSxtREFBVTtBQUN0QixZQUFZLG1EQUFVO0FBQ3RCO0FBQ0EsUUFBUSxtREFBVTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9EQUFXO0FBQ2Y7QUFDQTtBQUNBLGlFQUFlLEVBQUUsdUVBQXVFLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFEekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFtQixHQUFHLG9CQUFvQixHQUFHLGVBQWU7QUFDMUU7QUFDQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ25CRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dDO0FBQ0E7QUFDRjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxJQUFJLG9EQUFXO0FBQ2YsSUFBSSxvREFBVztBQUNmLElBQUksb0RBQVc7QUFDZjtBQUNBLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0RBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvY29vcmRpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0cnVjdHVyZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9ldmVudENvb3JkaW5hdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2UuanNcIjtcclxuaW1wb3J0IGRhdGFTdHJ1Y3R1cmVyIGZyb20gXCIuL2RhdGFTdHJ1Y3R1cmVyLmpzXCI7XHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmNvbnN0IGNvb3JkaW5hdGVJbml0aWFsTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHZpZXdzQ29sbGVjdGlvbiA9IGRhdGFTdHJ1Y3R1cmVyLmNyZWF0ZVZpZXdzQ29sbGVjdGlvbigpO1xyXG4gICAgZGF0YVN0b3JhZ2Uuc2F2ZVNlc3Npb25TdG9yYWdlKFwiYWxsVmlld3NcIiwgdmlld3NDb2xsZWN0aW9uKTtcclxuICAgIGRhdGFTdG9yYWdlLnNhdmVTZXNzaW9uU3RvcmFnZShcImN1cnJlbnRWaWV3XCIsIDEpO1xyXG5cclxuICAgIGRvbUNyZWF0b3IuZHJhd0FsbFByb2plY3RzVG9TaWRlYmFyKCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdWaXNpYmxlVGFza3NUb1Rhc2tsaXN0KCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdOZXdUYXNrQnV0dG9uVG9UYXNrbGlzdCgpO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3QWxsVmlld3NUb1NpZGViYXIoKTtcclxuICAgIGRvbUNyZWF0b3IuaW5kaWNhdGVDdXJyZW50VmlldygpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29vcmRpbmF0ZUluaXRpYWxMb2FkLFxyXG59O1xyXG4iLCJpbXBvcnQgZGF0YVN0cnVjdHVyZXIgZnJvbSBcIi4vZGF0YVN0cnVjdHVyZXJcIjtcclxuXHJcbmNvbnN0IF9sb2FkTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBjb25zdCBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpZCk7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uob2JqKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IF9zYXZlTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKGlkLCBkYXRhT2JqKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpZCwgSlNPTi5zdHJpbmdpZnkoZGF0YU9iaikpO1xyXG59O1xyXG5cclxuY29uc3QgbG9hZFNlc3Npb25TdG9yYWdlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBjb25zdCBvYmogPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGlkKTtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKG9iaik7XHJcbn07XHJcblxyXG5jb25zdCBzYXZlU2Vzc2lvblN0b3JhZ2UgPSBmdW5jdGlvbiAoaWQsIGRhdGFPYmopIHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oaWQsIEpTT04uc3RyaW5naWZ5KGRhdGFPYmopKTtcclxufTtcclxuXHJcbmNvbnN0IF9hc3NpZ25VbmlxdWVJRCA9IGZ1bmN0aW9uICh0eXBlLCBvYmopIHtcclxuICAgIGxldCBhbGxQYXJhbWV0ZXJzID0gX2dldEFsbFBhcmFtZXRlcnMoKTtcclxuICAgIGlmICghYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEKSB7XHJcbiAgICAgICAgYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIWFsbFBhcmFtZXRlcnMubGFzdFVzZWRJRFt0eXBlXSkge1xyXG4gICAgICAgIGFsbFBhcmFtZXRlcnMubGFzdFVzZWRJRFt0eXBlXSA9IDA7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3SUQgPSBudWxsO1xyXG4gICAgY29uc3QgYWxsSURzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgIGxldCBsYXN0VXNlZElEID0gYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEW3R5cGVdO1xyXG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWxsSURzW2FsbElEcy5sZW5ndGggLSAxXSkpIHtcclxuICAgICAgICBsYXN0VXNlZElEID0gTWF0aC5tYXgocGFyc2VJbnQoYWxsSURzW2FsbElEcy5sZW5ndGggLSAxXSksIGFsbFBhcmFtZXRlcnMubGFzdFVzZWRJRFt0eXBlXSk7XHJcbiAgICB9XHJcbiAgICBuZXdJRCA9IGxhc3RVc2VkSUQgKyAxO1xyXG4gICAgYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEW3R5cGVdID0gbmV3SUQ7XHJcbiAgICBfc2V0QWxsUGFyYW1ldGVycyhhbGxQYXJhbWV0ZXJzKTtcclxuICAgIHJldHVybiBuZXdJRDtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFRhc2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIF9sb2FkTG9jYWxTdG9yYWdlKFwidGFza3NcIik7XHJcbn07XHJcblxyXG5jb25zdCBnZXRBbGxQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBfbG9hZExvY2FsU3RvcmFnZShcInByb2plY3RzXCIpO1xyXG59O1xyXG5cclxuY29uc3QgX2dldEFsbFBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gX2xvYWRMb2NhbFN0b3JhZ2UoXCJwYXJhbWV0ZXJzXCIpO1xyXG59O1xyXG5cclxuY29uc3QgX3NldEFsbFRhc2tzID0gZnVuY3Rpb24gKGFsbFRhc2tzKSB7XHJcbiAgICBfc2F2ZUxvY2FsU3RvcmFnZShcInRhc2tzXCIsIGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxQcm9qZWN0cyA9IGZ1bmN0aW9uIChhbGxQcm9qZWN0cykge1xyXG4gICAgX3NhdmVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiLCBhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChhbGxQYXJhbWV0ZXJzKSB7XHJcbiAgICBfc2F2ZUxvY2FsU3RvcmFnZShcInBhcmFtZXRlcnNcIiwgYWxsUGFyYW1ldGVycyk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVQcm9qZWN0RnJvbVRhc2tzID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgbGV0IGdlbmVyYWxQcm9qZWN0SUQgPSAxO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxUYXNrcykge1xyXG4gICAgICAgIGlmIChhbGxUYXNrc1tpXS5wcm9qZWN0ID09PSBpZCkge1xyXG4gICAgICAgICAgICBhbGxUYXNrc1tpXS5wcm9qZWN0ID0gZ2VuZXJhbFByb2plY3RJRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1RPRE8gLS0+IFByb210IHRoZSBVc2VyIGluIGRvbUNyZWF0b3IgdGhhdCB0aGUgdGFza3Mgd2lsbCBiZSByZXNldHRlZCB0byB0aGUgXCJHZW5lcmFsXCIgcHJvamVjdFxyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAodGFza09iaikge1xyXG4gICAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgY29uc3QgaWQgPSBfYXNzaWduVW5pcXVlSUQoXCJ0YXNrc1wiLCBhbGxUYXNrcyk7XHJcbiAgICBhbGxUYXNrc1tpZF0gPSB0YXNrT2JqO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IGFsbFByb2plY3RzID0gZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGNvbnN0IGlkID0gX2Fzc2lnblVuaXF1ZUlEKFwicHJvamVjdHNcIiwgYWxsUHJvamVjdHMpO1xyXG4gICAgaWYgKE9iamVjdC52YWx1ZXMoYWxsUHJvamVjdHMpLnNvbWUoKGVsZW0pID0+IGVsZW0gPT09IHByb2plY3ROYW1lKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxsUHJvamVjdHNbaWRdID0gcHJvamVjdE5hbWU7XHJcbiAgICAgICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBkZWxldGUgYWxsVGFza3NbaWRdO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGxldCBhbGxQcm9qZWN0cyA9IGdldEFsbFByb2plY3RzKCk7XHJcbiAgICByZW1vdmVQcm9qZWN0RnJvbVRhc2tzKGlkKTtcclxuICAgIGRlbGV0ZSBhbGxQcm9qZWN0c1tpZF07XHJcbiAgICBfc2V0QWxsUHJvamVjdHMoYWxsUHJvamVjdHMpO1xyXG59O1xyXG5cclxuY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbiAoaWQsIHRhc2tPYmopIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBhbGxUYXNrc1tpZF0gPSB0YXNrT2JqO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRQcm9qZWN0ID0gZnVuY3Rpb24gKGlkLCBwcm9qZWN0TmFtZSkge1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGFsbFByb2plY3RzW2lkXSA9IHByb2plY3ROYW1lO1xyXG4gICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmNvbnN0IHNldFRhc2tTdGF0dXMgPSBmdW5jdGlvbiAoaWQsIGRvbmUpIHtcclxuICAgIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGNvbnN0IHRhc2sgPSBhbGxUYXNrc1tpZF07XHJcbiAgICB0YXNrLmRvbmUgPSBkb25lO1xyXG4gICAgYWxsVGFza3NbaWRdID0gdGFzaztcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLyBfbG9hZExvY2FsU3RvcmFnZSxcclxuICAgIC8vIF9zYXZlTG9jYWxTdG9yYWdlLFxyXG4gICAgbG9hZFNlc3Npb25TdG9yYWdlLFxyXG4gICAgc2F2ZVNlc3Npb25TdG9yYWdlLFxyXG4gICAgZ2V0QWxsVGFza3MsXHJcbiAgICBnZXRBbGxQcm9qZWN0cyxcclxuICAgIGFkZFRhc2ssXHJcbiAgICBhZGRQcm9qZWN0LFxyXG4gICAgZGVsZXRlVGFzayxcclxuICAgIGRlbGV0ZVByb2plY3QsXHJcbiAgICBlZGl0VGFzayxcclxuICAgIGVkaXRQcm9qZWN0LFxyXG4gICAgc2V0VGFza1N0YXR1cyxcclxufTtcclxuIiwiaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gXCIuL3V0aWxpdHlcIjtcclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tPYmogPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBwcm9qZWN0SUQsIGRhdGUsIGRvbmUpIHtcclxuICAgIHJldHVybiB7IHRpdGxlOiB0aXRsZSwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLCBwcm9qZWN0SUQ6IHByb2plY3RJRCwgZGF0ZTogZGF0ZSwgZG9uZTogZG9uZSB9O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsVmlzaWJsZVRhc2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGRhdGFTdG9yYWdlLmdldEFsbFRhc2tzKCk7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVWaWV3c0NvbGxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XHJcblxyXG4gICAgY29uc3Qgdmlld3NDb2xsZWN0aW9uID0ge1xyXG4gICAgICAgIDE6IHsgdmlld05hbWU6IFwiQWxsXCIsIGRhdGU6IFwiMTkwMC0wMS0wMVwiLCBpY29uRWxlbTogYDxpIGNsYXNzPVwiZmFzIGZhLWxnIGZhLWNhbGVuZGFyLWFsdFwiPjwvaT5gIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICB2aWV3TmFtZTogXCJEdWUgVG9kYXlcIixcclxuICAgICAgICAgICAgZGF0ZTogdXRpbGl0eS5mb3JtYXREYXRlU3RyaW5nKHRvZGF5KSxcclxuICAgICAgICAgICAgaWNvbkVsZW06IGA8aSBjbGFzcz1cImZhcyBmYS1sZyBmYS1zdG9wd2F0Y2hcIj48L2k+YCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgdmlld05hbWU6IFwiRHVlIFRvbW9ycm93XCIsXHJcbiAgICAgICAgICAgIGRhdGU6IHV0aWxpdHkuZm9ybWF0RGF0ZVN0cmluZyh0b21vcnJvdyksXHJcbiAgICAgICAgICAgIGljb25FbGVtOiBgPGkgY2xhc3M9XCJmYXMgZmEtbGcgZmEtY2xvY2tcIj48L2k+YCxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdmlld3NDb2xsZWN0aW9uO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlVGFza09iaixcclxuICAgIGdldEFsbFZpc2libGVUYXNrcyxcclxuICAgIGNyZWF0ZVZpZXdzQ29sbGVjdGlvbixcclxufTtcclxuIiwiLyoqXHJcblRPRE86XHJcbmRyYXdOZXdUYXNrTW9kYWxcclxuXHJcbiovXHJcblxyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IGV2ZW50Q29vcmRpbmF0b3IgZnJvbSBcIi4vZXZlbnRDb29yZGluYXRvclwiO1xyXG5pbXBvcnQgZGF0YVN0cnVjdHVyZXIgZnJvbSBcIi4vZGF0YVN0cnVjdHVyZXJcIjtcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSBcIi4vdXRpbGl0eVwiO1xyXG5cclxuLy9BZGQgZG9tRWxlbWVudCB0byB0aGUgVGFza2xpc3RcclxuY29uc3QgZHJhd1RvVGFza2xpc3QgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbi8vYWRkIGRvbUVsZW1lbnQgdG8gdGhlIFByb2plY3QgUGFuZWwgaW4gdGhlIFNpZGViYXJcclxuY29uc3QgZHJhd1RvUHJvamVjdGxpc3QgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHByb2plY3RzU2lkZWJhckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtc2lkZWJhci1jb250YWluZXJcIik7XHJcbiAgICBwcm9qZWN0c1NpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBkcmF3VG9WaWV3bGlzdCA9IGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XHJcbiAgICBsZXQgdmlld3NTaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3cy1zaWRlYmFyLWNvbnRhaW5lclwiKTtcclxuICAgIHZpZXdzU2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGNsZWFyVGFza2xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWNvbnRhaW5lclwiKTtcclxuICAgIHdoaWxlICh0YXNrc0NvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgdGFza3NDb250YWluZXIucmVtb3ZlQ2hpbGQodGFza3NDb250YWluZXIubGFzdENoaWxkKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGRyYXdWaXNpYmxlVGFza3NUb1Rhc2tsaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhc2tzID0gZGF0YVN0cnVjdHVyZXIuZ2V0QWxsVmlzaWJsZVRhc2tzKCk7XHJcbiAgICBmb3IgKGxldCBpIGluIHRhc2tzKSB7XHJcbiAgICAgICAgY29uc3QgdGFza0VsZW0gPSBjcmVhdGVUYXNrRWxlbWVudChpLCB0YXNrc1tpXSk7XHJcbiAgICAgICAgY29uc3QgZGl2aWRlciA9IGNyZWF0ZURpdmlkZXJFbGVtZW50KCk7XHJcbiAgICAgICAgZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgICAgIGRyYXdUb1Rhc2tsaXN0KGRpdmlkZXIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZHJhd05ld1Rhc2tCdXR0b25Ub1Rhc2tsaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGNyZWF0ZU5ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQoKTtcclxuICAgIGRyYXdUb1Rhc2tsaXN0KG5ld1Rhc2tCdXR0b24pO1xyXG59O1xyXG5cclxuY29uc3QgZHJhd0FsbFByb2plY3RzVG9TaWRlYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IGNyZWF0ZVByb2plY3RFbGVtZW50KGksIGFsbFByb2plY3RzW2ldKTtcclxuICAgICAgICBkcmF3VG9Qcm9qZWN0bGlzdChwcm9qZWN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGRyYXdBbGxWaWV3c1RvU2lkZWJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFsbFZpZXdzID0gZGF0YVN0cnVjdHVyZXIuY3JlYXRlVmlld3NDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBTYXZlIFZpZXdzIHRvIHNlc3Npb25TdG9yYWdlLCBwcm9iYWJseSBiZXR0ZXIgZG8gdGhhdCBpbiB0aGUgY29vcmRpbmF0ZUluaXRpYWxMb2FkKClcclxuXHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFZpZXdzKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0VMZW1lbnQgPSBjcmVhdGVWaWV3RWxlbWVudChpLCBhbGxWaWV3c1tpXS52aWV3TmFtZSwgYWxsVmlld3NbaV0uaWNvbkVsZW0pO1xyXG4gICAgICAgIGRyYXdUb1ZpZXdsaXN0KHZpZXdFTGVtZW50KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVZpZXdFbGVtZW50ID0gZnVuY3Rpb24gKHZpZXdJRCwgdmlld05hbWUsIGljb25FbGVtKSB7XHJcbiAgICBjb25zdCB2aWV3TmFtZUtlYmFiQ2FzZSA9IHV0aWxpdHkubWFrZUtlYmFiQ2FzZSh2aWV3TmFtZSk7XHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi5pZCA9IGB2aWV3LWJ1dHRvbi0ke3ZpZXdOYW1lS2ViYWJDYXNlfWA7XHJcbiAgICBidXR0b24udmFsdWUgPSB2aWV3SUQ7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1saWdodFwiLCBcInNpZGViYXItYnRuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBjb25zdCBpY29uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGljb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC0yXCIpO1xyXG5cclxuICAgIGNvbnN0IHRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTEwXCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHZpZXdOYW1lO1xyXG5cclxuICAgIGljb25Db250YWluZXIuaW5uZXJIVE1MID0gaWNvbkVsZW07XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQodGV4dENvbnRhaW5lcik7XHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQocm93KTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59O1xyXG5cclxuY29uc3QgaW5kaWNhdGVDdXJyZW50VmlldyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3SUQgPSBkYXRhU3RvcmFnZS5sb2FkU2Vzc2lvblN0b3JhZ2UoXCJjdXJyZW50Vmlld1wiKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFZpZXdJRCA9PT0gbnVsbCkge1xyXG4gICAgICAgIGN1cnJlbnRWaWV3SUQgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFsbFZpZXdzID0gZGF0YVN0b3JhZ2UubG9hZFNlc3Npb25TdG9yYWdlKFwiYWxsVmlld3NcIik7XHJcbiAgICBjb25zdCBjdXJyZW50Vmlld05hbWUgPSBhbGxWaWV3c1tjdXJyZW50Vmlld0lEXS52aWV3TmFtZTtcclxuXHJcbiAgICBjb25zdCB2aWV3QnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld3Mtc2lkZWJhci1jb250YWluZXJcIikuY2hpbGRyZW47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdCdXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHZpZXdCdXR0b25zW2ldLnZhbHVlID09IGN1cnJlbnRWaWV3SUQpIHtcclxuICAgICAgICAgICAgdmlld0J1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3QnV0dG9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjdXJyZW50Vmlld1RleHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50LXZpZXctdGV4dFwiKTtcclxuICAgIGN1cnJlbnRWaWV3VGV4dEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50Vmlld05hbWV9IFRhc2tzYDtcclxufTtcclxuXHJcbi8vcmV0dXJucyBhIGRvbUVsZW1lbnQgYmFzZWQgb24gdGhlIHByb2plY3QtbmFtZSBzdHJpbmcgZ2l2ZW4gYXMgcGFyYW1ldGVyXHJcbmNvbnN0IGNyZWF0ZVByb2plY3RFbGVtZW50ID0gZnVuY3Rpb24gKGlkLCBwcm9qZWN0TmFtZSkge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udmFsdWUgPSBpZDtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIsIFwic2lkZWJhci1idG5cIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBhZGQgZXZlbnQgbGlzdGVuZXJcclxuXHJcbiAgICBsZXQgcm93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHJvd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBpY29uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGljb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC0xXCIpO1xyXG5cclxuICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYXJcIiwgXCJmYS1zbVwiLCBcImZhLWNpcmNsZVwiKTtcclxuXHJcbiAgICBsZXQgdGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtYXV0b1wiKTtcclxuICAgIHRleHRDb250YWluZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcclxuXHJcbiAgICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xyXG4gICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKHRleHRDb250YWluZXIpO1xyXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHJvd0NvbnRhaW5lcik7XHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59O1xyXG5cclxuLy9yZXR1cm5zIGEgZG9tRWxlbWVudCBiYXNlZCBvbiB0aGUgdGFzayBvYmplY3QgZ2l2ZW4gYXMgcGFyYW1ldGVyXHJcbmNvbnN0IGNyZWF0ZVRhc2tFbGVtZW50ID0gZnVuY3Rpb24gKGlkLCB0YXNrT2JqKSB7XHJcbiAgICBsZXQgbWVkaWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1lZGlhXCIsIFwiZC1mbGV4XCIpO1xyXG5cclxuICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke2lkfWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IGlkO1xyXG4gICAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2tPYmouZG9uZTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNoZWNrLWlucHV0XCIsIFwiYWxpZ24tc2VsZi1zdGFydFwiLCBcIm10LTJcIik7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnRDb29yZGluYXRvci5jbGlja1Rhc2tDaGVja2JveChldmVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGV2ZW50IGxpc3RlbmVyIHdoZW4gY2hlY2tib3ggaXMgY2hlY2tlZCBvciB1bmNoZWNrZWRcclxuXHJcbiAgICBsZXQgbWVkaWFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lZGlhQm9keS5jbGFzc0xpc3QuYWRkKFwibWVkaWEtYm9keVwiLCBcIm1zLTNcIiwgXCJkLWZsZXhcIiwgXCJ3LTEwMFwiLCBcImp1c3RpZnktY29udGVudC1iZXR3ZWVuXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Qm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrT2JqLnRpdGxlO1xyXG5cclxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2tPYmouZGVzY3JpcHRpb247XHJcblxyXG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZWRpdEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC1idXR0b24tJHtpZH1gO1xyXG4gICAgZWRpdEJ1dHRvbi52YWx1ZSA9IGlkO1xyXG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXIgd2hlbiBlZGl0LWJ1dHRvbiBpcyBjbGlja2VkXHJcblxyXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gQWRkIGRlbGV0ZSBidXR0b24sIHdpdGggZXZlbnQgbGlzdGVuZXIgaW5jbHVkaW5nIGFyZS15b3Utc3VyZS1tb2RhbFxyXG5cclxuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKHRleHRCb2R5KTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFCb2R5KTtcclxuXHJcbiAgICByZXR1cm4gbWVkaWFDb250YWluZXI7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBkaXZpc2VyIGRvbUVsZW1lbnQgZm9yIGJldHdlZW4gdGhlIGRpZmZlcmVudCB0YXNrc1xyXG5jb25zdCBjcmVhdGVEaXZpZGVyRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImJvcmRlci10b3BcIiwgXCJteS0yXCIpO1xyXG5cclxuICAgIHJldHVybiBkaXZpZGVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZG9tRWxlbWVudCBmb3IgdGhlIGJ1dHRvbiB0byBhZGQgYSBuZXcgdGFza3MgYXQgdGhlIGVuZCBvZiB0aGUgdGFza2xpc3RcclxuY29uc3QgY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIG5ldyB0YXNrXCI7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1ibG9ja1wiLCBcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50Q29vcmRpbmF0b3IuY2xpY2tOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50KGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdy5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbi8vY3JlYXRlIGRvbUVsZW1lbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgb3IgZWRpdCBhIG5ldyB0YXNrIGluIHRoZSB0YXNrbGlzdCBvciBiZSBkaXNwbGF5ZWQgaW4gYSBtb2RhbFxyXG5jb25zdCBjcmVhdGVUYXNrSW5wdXRFbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgdGFza09iaiA9IHsgdGl0bGU6IFwiXCIsIGRlc2NyaXB0aW9uOiBcIlwiLCBwcm9qZWN0SUQ6IFwiXCIsIGRhdGU6IFwiXCIsIGRvbmU6IGZhbHNlIH0sXHJcbiAgICBpZCA9IG51bGxcclxuKSB7XHJcbiAgICBjb25zdCBjcmVhdGVJbnB1dEdyb3VwID0gZnVuY3Rpb24gKGxhYmVsLCBpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgaW5wdXRHcm91cC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXBcIiwgXCJtYi0yXCIpO1xyXG5cclxuICAgICAgICBsZXQgc3BhbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cC10ZXh0XCIpO1xyXG4gICAgICAgIHNwYW5MYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsO1xyXG5cclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKHNwYW5MYWJlbCk7XHJcbiAgICAgICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXRHcm91cDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgIGZvcm0uaWQgPSBcInRhc2staW5wdXQtZm9ybVwiO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwibmVlZHMtdmFsaWRhdGlvblwiKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKFwibm92YWxpZGF0ZVwiLCBcInRydWVcIik7XHJcblxyXG4gICAgbGV0IHRhc2tJbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuaWQgPSBcInRhc2staW5wdXQtY29udGFpbmVyXCI7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0VGl0bGUudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgaW5wdXRUaXRsZS52YWx1ZSA9IHRhc2tPYmoudGl0bGU7XHJcbiAgICBpbnB1dFRpdGxlLmlkID0gXCJpbnB1dFRpdGxlXCI7XHJcbiAgICBpbnB1dFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcbiAgICBpbnB1dFRpdGxlLnJlcXVpcmVkID0gdHJ1ZTtcclxuXHJcbiAgICBsZXQgaW5wdXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGlucHV0RGVzY3JpcHRpb24ucm93cyA9IFwiNFwiO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tPYmouZGVzY3JpcHRpb247XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLmlkID0gXCJpbnB1dERlc2NyaXB0aW9uXCI7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBpbnB1dFByb2plY3QuY2xhc3NMaXN0LmFkZChcImZvcm0tc2VsZWN0XCIpO1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBhbGxQcm9qZWN0c1tpXTtcclxuICAgICAgICBvcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIGlucHV0UHJvamVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgfVxyXG4gICAgaW5wdXRQcm9qZWN0LnZhbHVlID0gdGFza09iai5wcm9qZWN0SUQ7XHJcbiAgICBpbnB1dFByb2plY3QuaWQgPSBcImlucHV0UHJvamVjdFwiO1xyXG5cclxuICAgIGxldCBpbnB1dERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dERhdGUudHlwZSA9IFwiZGF0ZVwiO1xyXG4gICAgaW5wdXREYXRlLnZhbHVlID0gdGFza09iai5kYXRlO1xyXG4gICAgaW5wdXREYXRlLmlkID0gXCJpbnB1dERhdGVcIjtcclxuICAgIGlucHV0RGF0ZS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sXCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNhdmVCdXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvblJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzYXZlQnV0dG9uUm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcclxuICAgIHNhdmVCdXR0b24udmFsdWUgPSBpZDtcclxuICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1wcmltYXJ5XCIsIFwiYnRuLWJsb2NrXCIpO1xyXG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGV2ZW50Q29vcmRpbmF0b3IuY2xpY2tTYXZlQnV0dG9uKGlkLCB0YXNrT2JqLmRvbmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2F2ZUJ1dHRvblJvdy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgIHNhdmVCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvblJvdyk7XHJcblxyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJUaXRsZVwiLCBpbnB1dFRpdGxlKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIkRlc2NyaXB0aW9uXCIsIGlucHV0RGVzY3JpcHRpb24pKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiUHJvamVjdFwiLCBpbnB1dFByb2plY3QpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRHVlIERhdGVcIiwgaW5wdXREYXRlKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRhc2tJbnB1dENvbnRhaW5lcik7XHJcblxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3VG9UYXNrbGlzdCxcclxuICAgIGRyYXdUb1Byb2plY3RsaXN0LFxyXG4gICAgZHJhd05ld1Rhc2tCdXR0b25Ub1Rhc2tsaXN0LFxyXG4gICAgZHJhd0FsbFByb2plY3RzVG9TaWRlYmFyLFxyXG4gICAgZHJhd1Zpc2libGVUYXNrc1RvVGFza2xpc3QsXHJcbiAgICBkcmF3QWxsVmlld3NUb1NpZGViYXIsXHJcbiAgICBjcmVhdGVWaWV3RWxlbWVudCxcclxuICAgIGNsZWFyVGFza2xpc3QsXHJcbiAgICBpbmRpY2F0ZUN1cnJlbnRWaWV3LFxyXG4gICAgY3JlYXRlUHJvamVjdEVsZW1lbnQsXHJcbiAgICBjcmVhdGVUYXNrRWxlbWVudCxcclxuICAgIGNyZWF0ZU5ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQsXHJcbiAgICBjcmVhdGVEaXZpZGVyRWxlbWVudCxcclxuICAgIGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQsXHJcbn07XHJcbiIsImltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3JcIjtcclxuaW1wb3J0IGRhdGFTdHJ1Y3R1cmVyIGZyb20gXCIuL2RhdGFTdHJ1Y3R1cmVyXCI7XHJcbmltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgY2xpY2tOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC50YXJnZXQucmVtb3ZlKCk7XHJcbiAgICBjb25zdCB0YXNrSW5wdXRFbGVtZW50ID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrSW5wdXRFbGVtZW50KCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tJbnB1dEVsZW1lbnQpO1xyXG59O1xyXG5cclxuY29uc3QgY2xpY2tTYXZlQnV0dG9uID0gZnVuY3Rpb24gKGlkLCBkb25lKSB7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRUaXRsZVwiKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dERlc2NyaXB0aW9uXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdElEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFByb2plY3RcIik7XHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dERhdGVcIik7XHJcblxyXG4gICAgaWYgKCF0aXRsZS52YWx1ZSB8fCAhZGVzY3JpcHRpb24udmFsdWUgfHwgIXByb2plY3RJRC52YWx1ZSB8fCAhZGF0ZS52YWx1ZSkge1xyXG4gICAgICAgIC8vaW5wdXQgdmFsaWRhdGlvblxyXG4gICAgICAgIGNvbnN0IGlucHV0QXJyID0gW3RpdGxlLCBkZXNjcmlwdGlvbiwgcHJvamVjdElELCBkYXRlXTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGlucHV0QXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEFycltpXS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImlzLWludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFycltpXS5jbGFzc0xpc3QuYWRkKFwiaXMtdmFsaWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtdmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFycltpXS5jbGFzc0xpc3QuYWRkKFwiaXMtaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHRhc2tPYmogPSB7fTtcclxuXHJcbiAgICAgICAgLy9pZiBpZCBpcyBudWxsIHRoaXMgbWVhbnMgdGhhdCB0aGUgY3JlYXRlVGFza0lucHV0RWxlbWVudCgpIGZ1bmN0aW9uIGhhcyBiZWVuIGNhbGxlZCB3aXRoIGRlZmF1bHQgdmFsdWVzIGFuZFxyXG4gICAgICAgIC8vdGh1cyBhaW1zIHRvIGNyZWF0ZSBhIG5ldyB0YXNrc1xyXG4gICAgICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0YXNrT2JqID0gZGF0YVN0cnVjdHVyZXIuY3JlYXRlVGFza09iaih0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIHByb2plY3RJRC52YWx1ZSwgZGF0ZS52YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkYXRhU3RvcmFnZS5hZGRUYXNrKHRhc2tPYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhc2tPYmogPSBkYXRhU3RydWN0dXJlci5jcmVhdGVUYXNrT2JqKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgcHJvamVjdElELnZhbHVlLCBkYXRlLnZhbHVlLCBkb25lKTtcclxuICAgICAgICAgICAgZGF0YVN0b3JhZ2UuZWRpdFRhc2soaWQsIHRhc2tPYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhbGxWaXNpYmxlVGFza3MgPSBkYXRhU3RydWN0dXJlci5nZXRBbGxWaXNpYmxlVGFza3MoKTtcclxuICAgICAgICBkb21DcmVhdG9yLmNsZWFyVGFza2xpc3QoKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGFsbFZpc2libGVUYXNrcykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRWxlbSA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0VsZW1lbnQoaSwgYWxsVmlzaWJsZVRhc2tzW2ldKTtcclxuICAgICAgICAgICAgY29uc3QgZGl2aWRlciA9IGRvbUNyZWF0b3IuY3JlYXRlRGl2aWRlckVsZW1lbnQoKTtcclxuICAgICAgICAgICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdCh0YXNrRWxlbSk7XHJcbiAgICAgICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QoZGl2aWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd05ld1Rhc2tCdXR0b25Ub1Rhc2tsaXN0KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBjbGlja1Rhc2tDaGVja2JveCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgY29uc3QgdGFza0lEID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgY29uc3Qgc3RhdHVzID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XHJcbiAgICBkYXRhU3RvcmFnZS5zZXRUYXNrU3RhdHVzKHRhc2tJRCwgc3RhdHVzKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY2xpY2tOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50LCBjbGlja1NhdmVCdXR0b24sIGNsaWNrVGFza0NoZWNrYm94IH07XHJcbiIsImNvbnN0IG1ha2VLZWJhYkNhc2UgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIGNvbnN0IHJlZ0lzTm90TGV0dGVyT3JEaWdpdCA9IC9bXjAtOWEtekEtWl0rL2c7XHJcbiAgICBjb25zdCByZWdJc05vdExldHRlck9yRGlnaXRBdEVuZHMgPSAvKF5bXjAtOWEtekEtWl0rKXwoW14wLTlhLXpBLVpdKyQpL2c7XHJcbiAgICBjb25zdCByZWdVcHBlcmNhc2VGb2xsb3dpbmdMb3dlcmNhc2UgPSAvKFthLXpdKShbQS1aXSkvZztcclxuXHJcbiAgICByZXR1cm4gaW5wdXRcclxuICAgICAgICAucmVwbGFjZShyZWdVcHBlcmNhc2VGb2xsb3dpbmdMb3dlcmNhc2UsIFwiJDEtJDJcIilcclxuICAgICAgICAucmVwbGFjZShyZWdJc05vdExldHRlck9yRGlnaXRBdEVuZHMsIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2UocmVnSXNOb3RMZXR0ZXJPckRpZ2l0LCBcIi1cIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdERhdGVTdHJpbmcgPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtkYXRlLmdldE1vbnRoKCkgKyAxfS0ke2RhdGUuZ2V0RGF0ZSgpfWA7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBtYWtlS2ViYWJDYXNlLFxyXG4gICAgZm9ybWF0RGF0ZVN0cmluZyxcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiogIFxyXG5Nb2R1bGVzOlxyXG5cclxuXHJcblxyXG5jb29yZGluYXRvclxyXG4gICAgQ29vcmRpbmF0b3JcclxuICAgICAgICBIYW5kbGVzIHRoaW5ncyBsaWtlIHRoZSBpbml0aWFsIGxvYWQgb2YgdGhlIHBhZ2VcclxuXHJcblxyXG5kb21FdmVudHNcclxuICAgIEFibGUgdG8gY3JlYXRlIEV2ZW50IExpc3RlbmVycyBhbmQgY29udGFpbnMgdGhlIHNwZWNpZmljIEZ1bmN0aW9ucyBjYWxsZWQgYnkgdGhlIEV2ZW50IExpc3RlbmVyc1xyXG5cclxuXHJcbmRvbUNyZWF0b3JcclxuICAgIFRoaXMgdGFrZXMgYW4gT2JqZWN0IGFuZCBhIFBsYWNlIHRvIGRpc3BsYXkgdGhlIE9iamVjdHMgY29udGVudFxyXG5cclxuXHJcbmRhdGFTdG9yYWdlOlxyXG4gICAgRGF0YSBTYXZlclxyXG4gICAgICAgIFRoaXMgc2F2ZXMgbmV3IElucHV0IHRvIGEgSlNPTi1maWxlXHJcblxyXG4gICAgRGF0YSBMb2FkZXJcclxuICAgICAgICBUaGlzIGxvYWRzIGEgSlNPTi1maWxlXHJcblxyXG5cclxuZGF0YVN0cnVjdHVyZXI6XHJcbiAgICBEYXRhIFN0cnVjdHVyZXJcclxuICAgICAgICBUaGluZ3MgbGlrZSBhc3NvY2lhdGluZyB0aGUgdGFza3Mgd2l0aCB0aGVpciBwcm9qZWN0c1xyXG4gICAgICAgIEFsc28gdGhpbmdzIGxpa2UgcmVtb3ZpbmcgdGhlIHByb2plY3QgZnJvbSB0YXNrcyB3aGVyZSB0aGUgcHJvamVjdCBoYXMgYmVlbiBkZWxldGVkLlxyXG5cclxuICAgIERhdGEgU2VsZWN0ZXJcclxuICAgICAgICBUaGlzIHRha2VzIGEgT2JqZWN0IGZyb20gdGhlIERhdGEgTG9hZGVyIGFuZCByZXR1cm5zIGEgZmlsdGVyZWQgT2JqZWN0IHRvIHRoZSBDcmVhdG9yXHJcbiAqL1xyXG5cclxuaW1wb3J0IGNvb3JkaW5hdG9yIGZyb20gXCIuL2Nvb3JkaW5hdG9yXCI7XHJcbmltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZVwiO1xyXG5pbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yXCI7XHJcblxyXG4vL3Rlc3RpbmdcclxuY29uc3QgdGVzdERhdGFTZXR1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJHZW5lcmFsXCIpO1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIlByaXZhdGVcIik7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiV29ya1wiKTtcclxuXHJcbiAgICBkYXRhU3RvcmFnZS5hZGRUYXNrKHtcclxuICAgICAgICB0aXRsZTogXCJ0YXNrIG9uZVwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgb25lXCIsXHJcbiAgICAgICAgcHJvamVjdDogMixcclxuICAgICAgICBkYXRlOiBcIjIwMDAtMDEtMDJcIixcclxuICAgICAgICBkb25lOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkVGFzayh7XHJcbiAgICAgICAgdGl0bGU6IFwidGFzayB0d29cIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIHR3b1wiLFxyXG4gICAgICAgIHByb2plY3Q6IDMsXHJcbiAgICAgICAgZGF0ZTogXCIyMDAzLTA0LTA1XCIsXHJcbiAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIHRlc3REYXRhU2V0dXAoKTtcclxuLy8gZGF0YVN0b3JhZ2UuYWRkVGFzayh7XHJcbi8vICAgICB0aXRsZTogXCJ0YXNrIHRocmVlXCIsXHJcbi8vICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIHRocmVlXCIsXHJcbi8vICAgICBwcm9qZWN0OiBcIlByb2plY3QgMlwiLFxyXG4vLyAgICAgZGF0ZTogXCIyMDAwLTAzLTAzXCIsXHJcbi8vICAgICBkb25lOiBmYWxzZSxcclxuLy8gfSk7XHJcbi8vIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJQcm9qZWN0IDNcIik7XHJcbi8vIGRhdGFTdG9yYWdlLmRlbGV0ZVRhc2soMSk7XHJcbi8vIGRhdGFTdG9yYWdlLmRlbGV0ZVByb2plY3QoMik7XHJcbi8vIGRhdGFTdG9yYWdlLmVkaXRQcm9qZWN0KDIsIFwiUHJpdmF0ZVwiKTtcclxuLy8gZGF0YVN0b3JhZ2UuZWRpdFRhc2soMiwge1xyXG4vLyAgICAgdGl0bGU6IFwidGFzayB0d29cIixcclxuLy8gICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgdHdvIHdpdGggc29tZSBlZGl0XCIsXHJcbi8vICAgICBwcm9qZWN0OiAzLFxyXG4vLyAgICAgZGF0ZTogXCIyMDAwLTAzLTAzXCIsXHJcbi8vICAgICBkb25lOiBmYWxzZSxcclxuLy8gfSk7XHJcbi8vZW5kIHRlc3RpbmdcclxuXHJcbmNvb3JkaW5hdG9yLmNvb3JkaW5hdGVJbml0aWFsTG9hZCgpO1xyXG5cclxuLy90ZXN0aW5nXHJcbi8vIGNvbnN0IHRhc2tJbnB1dEVsZW1lbnQgPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQoKTtcclxuLy8gZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdCh0YXNrSW5wdXRFbGVtZW50KTtcclxuLy9lbmQgdGVzdGluZ1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=