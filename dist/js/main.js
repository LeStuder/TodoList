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
/* harmony import */ var _domCreator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domCreator.js */ "./src/js/domCreator.js");



const coordinateInitialLoad = function () {
    //TODO --> Load allProjects and allTasks from Storage
    let allProjects = _dataStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getAllProjects();
    let allTasks = _dataStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getAllTasks();

    //TODO --> Later on use a coodinator function that updates the ProjectsSidebar
    for (let i in allProjects) {
        let project = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createProject(i, allProjects[i]);
        _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToProjectSidebar(project);
    }

    for (let i in allTasks) {
        const taskElem = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskElement(i, allTasks[i]);
        const divider = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createDividerElement();
        _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToTasklist(taskElem);
        _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToTasklist(divider);
    }

    const newTaskButton = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createNewTaskButtonTasklistElement();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToTasklist(newTaskButton);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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


const createTaskObj = function (title, description, projectKey, date, done) {
    return { title: title, description: description, projectKey: projectKey, date: date, done: done };
};

const getAllVisibleTasks = function () {
    return _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getAllTasks();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    createTaskObj,
    getAllVisibleTasks,
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
const drawToProjectSidebar = function (domElement) {
    let projectsSidebarContainer = document.getElementById("projects-sidebar-container");
    projectsSidebarContainer.appendChild(domElement);
};

const clearTasklist = function () {
    let tasksContainer = document.getElementById("tasks-container");
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
};

//returns a domElement based on the project-name string given as parameter
const createProject = function (key, projectName) {
    let button = document.createElement("button");
    button.type = "button";
    button.value = key;
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
const createTaskElement = function (key, task) {
    let mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media", "d-flex");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${key}`;
    checkbox.value = key;
    checkbox.classList.add("form-check-input", "align-self-start", "mt-2");

    //TODO --> event listener when checkbox is checked or unchecked

    let mediaBody = document.createElement("div");
    mediaBody.classList.add("media-body", "ms-3", "d-flex", "w-100", "justify-content-between");

    let textBody = document.createElement("div");

    let title = document.createElement("h4");
    title.textContent = task.title;

    let description = document.createElement("div");
    description.textContent = task.description;

    let buttonContainer = document.createElement("div");

    let editButton = document.createElement("button");
    editButton.type = "button";
    editButton.id = `edit-button-${key}`;
    editButton.value = key;
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
    taskObj = { title: "", description: "", projectKey: "", date: "", done: false },
    key = null
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
    inputProject.value = taskObj.projectKey;
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
    saveButton.value = key;
    saveButton.classList.add("btn", "btn-primary", "btn-block");
    saveButton.addEventListener("click", () => {
        _eventCoordinator__WEBPACK_IMPORTED_MODULE_1__["default"].clickSaveButton(key, taskObj.done);
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
    drawToProjectSidebar,
    clearTasklist,
    createProject,
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

const clickSaveButton = function (key, done) {
    const title = document.getElementById("inputTitle");
    const description = document.getElementById("inputDescription");
    const projectKey = document.getElementById("inputProject");
    const date = document.getElementById("inputDate");

    if (!title.value || !description.value || !projectKey.value || !date.value) {
        //input validation
        const inputArr = [title, description, projectKey, date];
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

        //if key is null this means that the createTaskInputElement() function has been called with default values and
        //thus aims to create a new tasks
        if (key === null) {
            taskObj = _dataStructurer__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskObj(title.value, description.value, projectKey.value, date.value, false);
            _dataStorage__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(taskObj);
        } else {
            taskObj = _dataStructurer__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskObj(title.value, description.value, projectKey.value, date.value, done);
            _dataStorage__WEBPACK_IMPORTED_MODULE_2__["default"].editTask(key, taskObj);
        }
        const allVisibleTasks = _dataStructurer__WEBPACK_IMPORTED_MODULE_1__["default"].getAllVisibleTasks();
        _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].clearTasklist();
        for (let i in allVisibleTasks) {
            const taskElem = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElement(i, allVisibleTasks[i]);
            const divider = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createDividerElement();
            _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(taskElem);
            _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(divider);
        }
        const newTaskButton = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createNewTaskButtonTasklistElement();
        _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(newTaskButton);
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ clickNewTaskButtonTasklistElement, clickSaveButton });


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
        date: "2000-01-01",
        done: false,
    });
    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addTask({
        title: "task two",
        description: "description of task two",
        project: 3,
        date: "2000-03-03",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLG9EQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2Nvb3JkaW5hdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2RhdGFTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2RhdGFTdHJ1Y3R1cmVyLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2RvbUNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZXZlbnRDb29yZGluYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZS5qc1wiO1xyXG5pbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yLmpzXCI7XHJcblxyXG5jb25zdCBjb29yZGluYXRlSW5pdGlhbExvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL1RPRE8gLS0+IExvYWQgYWxsUHJvamVjdHMgYW5kIGFsbFRhc2tzIGZyb20gU3RvcmFnZVxyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGxldCBhbGxUYXNrcyA9IGRhdGFTdG9yYWdlLmdldEFsbFRhc2tzKCk7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBMYXRlciBvbiB1c2UgYSBjb29kaW5hdG9yIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgUHJvamVjdHNTaWRlYmFyXHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFByb2plY3RzKSB7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBkb21DcmVhdG9yLmNyZWF0ZVByb2plY3QoaSwgYWxsUHJvamVjdHNbaV0pO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvUHJvamVjdFNpZGViYXIocHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxUYXNrcykge1xyXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrRWxlbWVudChpLCBhbGxUYXNrc1tpXSk7XHJcbiAgICAgICAgY29uc3QgZGl2aWRlciA9IGRvbUNyZWF0b3IuY3JlYXRlRGl2aWRlckVsZW1lbnQoKTtcclxuICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tFbGVtKTtcclxuICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KGRpdmlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb21DcmVhdG9yLmNyZWF0ZU5ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQoKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QobmV3VGFza0J1dHRvbik7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb29yZGluYXRlSW5pdGlhbExvYWQsXHJcbn07XHJcbiIsImltcG9ydCBkYXRhU3RydWN0dXJlciBmcm9tIFwiLi9kYXRhU3RydWN0dXJlclwiO1xyXG5cclxuY29uc3QgX2xvYWQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBjb25zdCBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG5cclxuICAgIGlmIChvYmogPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKG9iaik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBfc2F2ZSA9IGZ1bmN0aW9uIChrZXksIGRhdGFPYmopIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YU9iaikpO1xyXG59O1xyXG5cclxuY29uc3QgX2Fzc2lnblVuaXF1ZUlEID0gZnVuY3Rpb24gKHR5cGUsIG9iaikge1xyXG4gICAgbGV0IGFsbFBhcmFtZXRlcnMgPSBfZ2V0QWxsUGFyYW1ldGVycygpO1xyXG4gICAgaWYgKCFhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5KSB7XHJcbiAgICAgICAgYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleSA9IHt9O1xyXG4gICAgfVxyXG4gICAgaWYgKCFhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdKSB7XHJcbiAgICAgICAgYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleVt0eXBlXSA9IDA7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3S2V5ID0gbnVsbDtcclxuICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgbGV0IGxhc3RVc2VkS2V5ID0gYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleVt0eXBlXTtcclxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFsbEtleXNbYWxsS2V5cy5sZW5ndGggLSAxXSkpIHtcclxuICAgICAgICBsYXN0VXNlZEtleSA9IE1hdGgubWF4KHBhcnNlSW50KGFsbEtleXNbYWxsS2V5cy5sZW5ndGggLSAxXSksIGFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXlbdHlwZV0pO1xyXG4gICAgfVxyXG4gICAgbmV3S2V5ID0gbGFzdFVzZWRLZXkgKyAxO1xyXG4gICAgYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleVt0eXBlXSA9IG5ld0tleTtcclxuICAgIF9zZXRBbGxQYXJhbWV0ZXJzKGFsbFBhcmFtZXRlcnMpO1xyXG4gICAgcmV0dXJuIG5ld0tleTtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFRhc2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIF9sb2FkKFwidGFza3NcIik7XHJcbn07XHJcblxyXG5jb25zdCBnZXRBbGxQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBfbG9hZChcInByb2plY3RzXCIpO1xyXG59O1xyXG5cclxuY29uc3QgX2dldEFsbFBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gX2xvYWQoXCJwYXJhbWV0ZXJzXCIpO1xyXG59O1xyXG5cclxuY29uc3QgX3NldEFsbFRhc2tzID0gZnVuY3Rpb24gKGFsbFRhc2tzKSB7XHJcbiAgICBfc2F2ZShcInRhc2tzXCIsIGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxQcm9qZWN0cyA9IGZ1bmN0aW9uIChhbGxQcm9qZWN0cykge1xyXG4gICAgX3NhdmUoXCJwcm9qZWN0c1wiLCBhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChhbGxQYXJhbWV0ZXJzKSB7XHJcbiAgICBfc2F2ZShcInBhcmFtZXRlcnNcIiwgYWxsUGFyYW1ldGVycyk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVQcm9qZWN0RnJvbVRhc2tzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGxldCBnZW5lcmFsUHJvamVjdEtleSA9IDE7XHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICAgICAgaWYgKGFsbFRhc2tzW2ldLnByb2plY3QgPT09IGtleSkge1xyXG4gICAgICAgICAgICBhbGxUYXNrc1tpXS5wcm9qZWN0ID0gZ2VuZXJhbFByb2plY3RLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9UT0RPIC0tPiBQcm9tdCB0aGUgVXNlciBpbiBkb21DcmVhdG9yIHRoYXQgdGhlIHRhc2tzIHdpbGwgYmUgcmVzZXR0ZWQgdG8gdGhlIFwiR2VuZXJhbFwiIHByb2plY3RcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBhZGRUYXNrID0gZnVuY3Rpb24gKHRhc2tPYmopIHtcclxuICAgIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGNvbnN0IGlkID0gX2Fzc2lnblVuaXF1ZUlEKFwidGFza3NcIiwgYWxsVGFza3MpO1xyXG4gICAgYWxsVGFza3NbaWRdID0gdGFza09iajtcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IGdldEFsbFByb2plY3RzKCk7XHJcbiAgICBjb25zdCBpZCA9IF9hc3NpZ25VbmlxdWVJRChcInByb2plY3RzXCIsIGFsbFByb2plY3RzKTtcclxuICAgIGlmIChPYmplY3QudmFsdWVzKGFsbFByb2plY3RzKS5zb21lKChlbGVtKSA9PiBlbGVtID09PSBwcm9qZWN0TmFtZSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgYWxyZWFkeSBleGlzdHNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsbFByb2plY3RzW2lkXSA9IHByb2plY3ROYW1lO1xyXG4gICAgICAgIF9zZXRBbGxQcm9qZWN0cyhhbGxQcm9qZWN0cyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBkZWxldGVUYXNrID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGRlbGV0ZSBhbGxUYXNrc1trZXldO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgcmVtb3ZlUHJvamVjdEZyb21UYXNrcyhrZXkpO1xyXG4gICAgZGVsZXRlIGFsbFByb2plY3RzW2tleV07XHJcbiAgICBfc2V0QWxsUHJvamVjdHMoYWxsUHJvamVjdHMpO1xyXG59O1xyXG5cclxuY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbiAoa2V5LCB0YXNrT2JqKSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgYWxsVGFza3Nba2V5XSA9IHRhc2tPYmo7XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgZWRpdFByb2plY3QgPSBmdW5jdGlvbiAoa2V5LCBwcm9qZWN0TmFtZSkge1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGFsbFByb2plY3RzW2tleV0gPSBwcm9qZWN0TmFtZTtcclxuICAgIF9zZXRBbGxQcm9qZWN0cyhhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLyBfbG9hZCxcclxuICAgIC8vIF9zYXZlLFxyXG4gICAgZ2V0QWxsVGFza3MsXHJcbiAgICBnZXRBbGxQcm9qZWN0cyxcclxuICAgIF9zZXRBbGxUYXNrcyxcclxuICAgIGFkZFRhc2ssXHJcbiAgICBhZGRQcm9qZWN0LFxyXG4gICAgZGVsZXRlVGFzayxcclxuICAgIGRlbGV0ZVByb2plY3QsXHJcbiAgICBlZGl0VGFzayxcclxuICAgIGVkaXRQcm9qZWN0LFxyXG59O1xyXG4iLCJpbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tPYmogPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBwcm9qZWN0S2V5LCBkYXRlLCBkb25lKSB7XHJcbiAgICByZXR1cm4geyB0aXRsZTogdGl0bGUsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwgcHJvamVjdEtleTogcHJvamVjdEtleSwgZGF0ZTogZGF0ZSwgZG9uZTogZG9uZSB9O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsVmlzaWJsZVRhc2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGRhdGFTdG9yYWdlLmdldEFsbFRhc2tzKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjcmVhdGVUYXNrT2JqLFxyXG4gICAgZ2V0QWxsVmlzaWJsZVRhc2tzLFxyXG59O1xyXG4iLCIvKipcclxuVE9ETzpcclxuZHJhd05ld1Rhc2tNb2RhbFxyXG5cclxuKi9cclxuXHJcbmltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZVwiO1xyXG5pbXBvcnQgZXZlbnRDb29yZGluYXRvciBmcm9tIFwiLi9ldmVudENvb3JkaW5hdG9yXCI7XHJcblxyXG4vL0FkZCBkb21FbGVtZW50IHRvIHRoZSBUYXNrbGlzdFxyXG5jb25zdCBkcmF3VG9UYXNrbGlzdCA9IGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XHJcbiAgICBsZXQgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWNvbnRhaW5lclwiKTtcclxuICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59O1xyXG5cclxuLy9hZGQgZG9tRWxlbWVudCB0byB0aGUgUHJvamVjdCBQYW5lbCBpbiB0aGUgU2lkZWJhclxyXG5jb25zdCBkcmF3VG9Qcm9qZWN0U2lkZWJhciA9IGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XHJcbiAgICBsZXQgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1zaWRlYmFyLWNvbnRhaW5lclwiKTtcclxuICAgIHByb2plY3RzU2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGNsZWFyVGFza2xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWNvbnRhaW5lclwiKTtcclxuICAgIHdoaWxlICh0YXNrc0NvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgdGFza3NDb250YWluZXIucmVtb3ZlQ2hpbGQodGFza3NDb250YWluZXIubGFzdENoaWxkKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vcmV0dXJucyBhIGRvbUVsZW1lbnQgYmFzZWQgb24gdGhlIHByb2plY3QtbmFtZSBzdHJpbmcgZ2l2ZW4gYXMgcGFyYW1ldGVyXHJcbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAoa2V5LCBwcm9qZWN0TmFtZSkge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udmFsdWUgPSBrZXk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1saWdodFwiLCBcInNpZGViYXItYnRuXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gYWRkIGV2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IHJvd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpY29uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtMVwiKTtcclxuXHJcbiAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFyXCIsIFwiZmEtc21cIiwgXCJmYS1jaXJjbGVcIik7XHJcblxyXG4gICAgbGV0IHRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLWF1dG9cIik7XHJcbiAgICB0ZXh0Q29udGFpbmVyLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XHJcblxyXG4gICAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Q29udGFpbmVyKTtcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChyb3dDb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxufTtcclxuXHJcbi8vcmV0dXJucyBhIGRvbUVsZW1lbnQgYmFzZWQgb24gdGhlIHRhc2sgb2JqZWN0IGdpdmVuIGFzIHBhcmFtZXRlclxyXG5jb25zdCBjcmVhdGVUYXNrRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHRhc2spIHtcclxuICAgIGxldCBtZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWVkaWFcIiwgXCJkLWZsZXhcIik7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7a2V5fWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IGtleTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNoZWNrLWlucHV0XCIsIFwiYWxpZ24tc2VsZi1zdGFydFwiLCBcIm10LTJcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lciB3aGVuIGNoZWNrYm94IGlzIGNoZWNrZWQgb3IgdW5jaGVja2VkXHJcblxyXG4gICAgbGV0IG1lZGlhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcIm1lZGlhLWJvZHlcIiwgXCJtcy0zXCIsIFwiZC1mbGV4XCIsIFwidy0xMDBcIiwgXCJqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiKTtcclxuXHJcbiAgICBsZXQgdGV4dEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuXHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7a2V5fWA7XHJcbiAgICBlZGl0QnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXIgd2hlbiBlZGl0LWJ1dHRvbiBpcyBjbGlja2VkXHJcblxyXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gQWRkIGRlbGV0ZSBidXR0b24sIHdpdGggZXZlbnQgbGlzdGVuZXIgaW5jbHVkaW5nIGFyZS15b3Utc3VyZS1tb2RhbFxyXG5cclxuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKHRleHRCb2R5KTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFCb2R5KTtcclxuXHJcbiAgICByZXR1cm4gbWVkaWFDb250YWluZXI7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBkaXZpc2VyIGRvbUVsZW1lbnQgZm9yIGJldHdlZW4gdGhlIGRpZmZlcmVudCB0YXNrc1xyXG5jb25zdCBjcmVhdGVEaXZpZGVyRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImJvcmRlci10b3BcIiwgXCJteS0yXCIpO1xyXG5cclxuICAgIHJldHVybiBkaXZpZGVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZG9tRWxlbWVudCBmb3IgdGhlIGJ1dHRvbiB0byBhZGQgYSBuZXcgdGFza3MgYXQgdGhlIGVuZCBvZiB0aGUgdGFza2xpc3RcclxuY29uc3QgY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIG5ldyB0YXNrXCI7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1ibG9ja1wiLCBcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50Q29vcmRpbmF0b3IuY2xpY2tOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50KGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdy5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbi8vY3JlYXRlIGRvbUVsZW1lbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgb3IgZWRpdCBhIG5ldyB0YXNrIGluIHRoZSB0YXNrbGlzdCBvciBiZSBkaXNwbGF5ZWQgaW4gYSBtb2RhbFxyXG5jb25zdCBjcmVhdGVUYXNrSW5wdXRFbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgdGFza09iaiA9IHsgdGl0bGU6IFwiXCIsIGRlc2NyaXB0aW9uOiBcIlwiLCBwcm9qZWN0S2V5OiBcIlwiLCBkYXRlOiBcIlwiLCBkb25lOiBmYWxzZSB9LFxyXG4gICAga2V5ID0gbnVsbFxyXG4pIHtcclxuICAgIGNvbnN0IGNyZWF0ZUlucHV0R3JvdXAgPSBmdW5jdGlvbiAobGFiZWwsIGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cFwiLCBcIm1iLTJcIik7XHJcblxyXG4gICAgICAgIGxldCBzcGFuTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBzcGFuTGFiZWwuY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwLXRleHRcIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XHJcblxyXG4gICAgICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoc3BhbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEdyb3VwO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgZm9ybS5pZCA9IFwidGFzay1pbnB1dC1mb3JtXCI7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJuZWVkcy12YWxpZGF0aW9uXCIpO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJub3ZhbGlkYXRlXCIsIFwidHJ1ZVwiKTtcclxuXHJcbiAgICBsZXQgdGFza0lucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5pZCA9IFwidGFzay1pbnB1dC1jb250YWluZXJcIjtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXRUaXRsZS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBpbnB1dFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZTtcclxuICAgIGlucHV0VGl0bGUuaWQgPSBcImlucHV0VGl0bGVcIjtcclxuICAgIGlucHV0VGl0bGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuICAgIGlucHV0VGl0bGUucmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgIGxldCBpbnB1dERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi5yb3dzID0gXCI0XCI7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLnZhbHVlID0gdGFza09iai5kZXNjcmlwdGlvbjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24uaWQgPSBcImlucHV0RGVzY3JpcHRpb25cIjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIGlucHV0UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1zZWxlY3RcIik7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxQcm9qZWN0cykge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGFsbFByb2plY3RzW2ldO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBpbnB1dFByb2plY3QudmFsdWUgPSB0YXNrT2JqLnByb2plY3RLZXk7XHJcbiAgICBpbnB1dFByb2plY3QuaWQgPSBcImlucHV0UHJvamVjdFwiO1xyXG5cclxuICAgIGxldCBpbnB1dERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dERhdGUudHlwZSA9IFwiZGF0ZVwiO1xyXG4gICAgaW5wdXREYXRlLnZhbHVlID0gdGFza09iai5kYXRlO1xyXG4gICAgaW5wdXREYXRlLmlkID0gXCJpbnB1dERhdGVcIjtcclxuICAgIGlucHV0RGF0ZS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sXCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNhdmVCdXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvblJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzYXZlQnV0dG9uUm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcclxuICAgIHNhdmVCdXR0b24udmFsdWUgPSBrZXk7XHJcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tcHJpbWFyeVwiLCBcImJ0bi1ibG9ja1wiKTtcclxuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBldmVudENvb3JkaW5hdG9yLmNsaWNrU2F2ZUJ1dHRvbihrZXksIHRhc2tPYmouZG9uZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzYXZlQnV0dG9uUm93LmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uUm93KTtcclxuXHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIlRpdGxlXCIsIGlucHV0VGl0bGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRGVzY3JpcHRpb25cIiwgaW5wdXREZXNjcmlwdGlvbikpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJQcm9qZWN0XCIsIGlucHV0UHJvamVjdCkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJEdWUgRGF0ZVwiLCBpbnB1dERhdGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uQ29udGFpbmVyKTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGFza0lucHV0Q29udGFpbmVyKTtcclxuXHJcbiAgICByZXR1cm4gZm9ybTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRyYXdUb1Rhc2tsaXN0LFxyXG4gICAgZHJhd1RvUHJvamVjdFNpZGViYXIsXHJcbiAgICBjbGVhclRhc2tsaXN0LFxyXG4gICAgY3JlYXRlUHJvamVjdCxcclxuICAgIGNyZWF0ZVRhc2tFbGVtZW50LFxyXG4gICAgY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCxcclxuICAgIGNyZWF0ZURpdmlkZXJFbGVtZW50LFxyXG4gICAgY3JlYXRlVGFza0lucHV0RWxlbWVudCxcclxufTtcclxuIiwiaW1wb3J0IGRvbUNyZWF0b3IgZnJvbSBcIi4vZG9tQ3JlYXRvclwiO1xyXG5pbXBvcnQgZGF0YVN0cnVjdHVyZXIgZnJvbSBcIi4vZGF0YVN0cnVjdHVyZXJcIjtcclxuaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlXCI7XHJcblxyXG5jb25zdCBjbGlja05ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5yZW1vdmUoKTtcclxuICAgIGNvbnN0IHRhc2tJbnB1dEVsZW1lbnQgPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQoKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0lucHV0RWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBjbGlja1NhdmVCdXR0b24gPSBmdW5jdGlvbiAoa2V5LCBkb25lKSB7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRUaXRsZVwiKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dERlc2NyaXB0aW9uXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdEtleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRQcm9qZWN0XCIpO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXREYXRlXCIpO1xyXG5cclxuICAgIGlmICghdGl0bGUudmFsdWUgfHwgIWRlc2NyaXB0aW9uLnZhbHVlIHx8ICFwcm9qZWN0S2V5LnZhbHVlIHx8ICFkYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgLy9pbnB1dCB2YWxpZGF0aW9uXHJcbiAgICAgICAgY29uc3QgaW5wdXRBcnIgPSBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwcm9qZWN0S2V5LCBkYXRlXTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGlucHV0QXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEFycltpXS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImlzLWludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFycltpXS5jbGFzc0xpc3QuYWRkKFwiaXMtdmFsaWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtdmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFycltpXS5jbGFzc0xpc3QuYWRkKFwiaXMtaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHRhc2tPYmogPSB7fTtcclxuXHJcbiAgICAgICAgLy9pZiBrZXkgaXMgbnVsbCB0aGlzIG1lYW5zIHRoYXQgdGhlIGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQoKSBmdW5jdGlvbiBoYXMgYmVlbiBjYWxsZWQgd2l0aCBkZWZhdWx0IHZhbHVlcyBhbmRcclxuICAgICAgICAvL3RodXMgYWltcyB0byBjcmVhdGUgYSBuZXcgdGFza3NcclxuICAgICAgICBpZiAoa2V5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRhc2tPYmogPSBkYXRhU3RydWN0dXJlci5jcmVhdGVUYXNrT2JqKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgcHJvamVjdEtleS52YWx1ZSwgZGF0ZS52YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkYXRhU3RvcmFnZS5hZGRUYXNrKHRhc2tPYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhc2tPYmogPSBkYXRhU3RydWN0dXJlci5jcmVhdGVUYXNrT2JqKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgcHJvamVjdEtleS52YWx1ZSwgZGF0ZS52YWx1ZSwgZG9uZSk7XHJcbiAgICAgICAgICAgIGRhdGFTdG9yYWdlLmVkaXRUYXNrKGtleSwgdGFza09iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFsbFZpc2libGVUYXNrcyA9IGRhdGFTdHJ1Y3R1cmVyLmdldEFsbFZpc2libGVUYXNrcygpO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuY2xlYXJUYXNrbGlzdCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gYWxsVmlzaWJsZVRhc2tzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tFbGVtID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrRWxlbWVudChpLCBhbGxWaXNpYmxlVGFza3NbaV0pO1xyXG4gICAgICAgICAgICBjb25zdCBkaXZpZGVyID0gZG9tQ3JlYXRvci5jcmVhdGVEaXZpZGVyRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tFbGVtKTtcclxuICAgICAgICAgICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChkaXZpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvbUNyZWF0b3IuY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCgpO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QobmV3VGFza0J1dHRvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNsaWNrTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCwgY2xpY2tTYXZlQnV0dG9uIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBjb29yZGluYXRvciBmcm9tIFwiLi9jb29yZGluYXRvclwiO1xyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IGRvbUNyZWF0b3IgZnJvbSBcIi4vZG9tQ3JlYXRvclwiO1xyXG5cclxuLy90ZXN0aW5nXHJcbmNvbnN0IHRlc3REYXRhU2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiR2VuZXJhbFwiKTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJQcml2YXRlXCIpO1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIldvcmtcIik7XHJcblxyXG4gICAgZGF0YVN0b3JhZ2UuYWRkVGFzayh7XHJcbiAgICAgICAgdGl0bGU6IFwidGFzayBvbmVcIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIG9uZVwiLFxyXG4gICAgICAgIHByb2plY3Q6IDIsXHJcbiAgICAgICAgZGF0ZTogXCIyMDAwLTAxLTAxXCIsXHJcbiAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4gICAgICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0d29cIixcclxuICAgICAgICBwcm9qZWN0OiAzLFxyXG4gICAgICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4gICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyB0ZXN0RGF0YVNldHVwKCk7XHJcbi8vIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4vLyAgICAgdGl0bGU6IFwidGFzayB0aHJlZVwiLFxyXG4vLyAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0aHJlZVwiLFxyXG4vLyAgICAgcHJvamVjdDogXCJQcm9qZWN0IDJcIixcclxuLy8gICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4vLyAgICAgZG9uZTogZmFsc2UsXHJcbi8vIH0pO1xyXG4vLyBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiUHJvamVjdCAzXCIpO1xyXG4vLyBkYXRhU3RvcmFnZS5kZWxldGVUYXNrKDEpO1xyXG4vLyBkYXRhU3RvcmFnZS5kZWxldGVQcm9qZWN0KDIpO1xyXG4vLyBkYXRhU3RvcmFnZS5lZGl0UHJvamVjdCgyLCBcIlByaXZhdGVcIik7XHJcbi8vIGRhdGFTdG9yYWdlLmVkaXRUYXNrKDIsIHtcclxuLy8gICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbi8vICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIHR3byB3aXRoIHNvbWUgZWRpdFwiLFxyXG4vLyAgICAgcHJvamVjdDogMyxcclxuLy8gICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4vLyAgICAgZG9uZTogZmFsc2UsXHJcbi8vIH0pO1xyXG4vL2VuZCB0ZXN0aW5nXHJcblxyXG5jb29yZGluYXRvci5jb29yZGluYXRlSW5pdGlhbExvYWQoKTtcclxuXHJcbi8vdGVzdGluZ1xyXG4vLyBjb25zdCB0YXNrSW5wdXRFbGVtZW50ID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrSW5wdXRFbGVtZW50KCk7XHJcbi8vIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0lucHV0RWxlbWVudCk7XHJcbi8vZW5kIHRlc3RpbmdcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9