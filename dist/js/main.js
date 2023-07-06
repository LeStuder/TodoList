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

const setTaskStatus = function (key, done) {
    const allTasks = getAllTasks();
    const task = allTasks[key];
    task.done = done;
    allTasks[key] = task;
    _setAllTasks(allTasks);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    // _load,
    // _save,
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
const createTaskElement = function (key, taskObj) {
    let mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media", "d-flex");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${key}`;
    checkbox.value = key;
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

const clickTaskCheckbox = function (event) {
    const taskID = event.target.value;
    const status = event.target.checked;
    _dataStorage__WEBPACK_IMPORTED_MODULE_2__["default"].setTaskStatus(taskID, status);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ clickNewTaskButtonTasklistElement, clickSaveButton, clickTaskCheckbox });


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDZjtBQUNBLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0RBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvY29vcmRpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0cnVjdHVyZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9ldmVudENvb3JkaW5hdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlLmpzXCI7XHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmNvbnN0IGNvb3JkaW5hdGVJbml0aWFsTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vVE9ETyAtLT4gTG9hZCBhbGxQcm9qZWN0cyBhbmQgYWxsVGFza3MgZnJvbSBTdG9yYWdlXHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsVGFza3MoKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IExhdGVyIG9uIHVzZSBhIGNvb2RpbmF0b3IgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBQcm9qZWN0c1NpZGViYXJcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IGRvbUNyZWF0b3IuY3JlYXRlUHJvamVjdChpLCBhbGxQcm9qZWN0c1tpXSk7XHJcbiAgICAgICAgZG9tQ3JlYXRvci5kcmF3VG9Qcm9qZWN0U2lkZWJhcihwcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICAgICAgY29uc3QgdGFza0VsZW0gPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tFbGVtZW50KGksIGFsbFRhc2tzW2ldKTtcclxuICAgICAgICBjb25zdCBkaXZpZGVyID0gZG9tQ3JlYXRvci5jcmVhdGVEaXZpZGVyRWxlbWVudCgpO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QoZGl2aWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvbUNyZWF0b3IuY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCgpO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChuZXdUYXNrQnV0dG9uKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvb3JkaW5hdGVJbml0aWFsTG9hZCxcclxufTtcclxuIiwiaW1wb3J0IGRhdGFTdHJ1Y3R1cmVyIGZyb20gXCIuL2RhdGFTdHJ1Y3R1cmVyXCI7XHJcblxyXG5jb25zdCBfbG9hZCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGNvbnN0IG9iaiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uob2JqKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IF9zYXZlID0gZnVuY3Rpb24gKGtleSwgZGF0YU9iaikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhT2JqKSk7XHJcbn07XHJcblxyXG5jb25zdCBfYXNzaWduVW5pcXVlSUQgPSBmdW5jdGlvbiAodHlwZSwgb2JqKSB7XHJcbiAgICBsZXQgYWxsUGFyYW1ldGVycyA9IF9nZXRBbGxQYXJhbWV0ZXJzKCk7XHJcbiAgICBpZiAoIWFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXkpIHtcclxuICAgICAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5ID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIWFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXlbdHlwZV0pIHtcclxuICAgICAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdID0gMDtcclxuICAgIH1cclxuICAgIGxldCBuZXdLZXkgPSBudWxsO1xyXG4gICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICBsZXQgbGFzdFVzZWRLZXkgPSBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdO1xyXG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWxsS2V5c1thbGxLZXlzLmxlbmd0aCAtIDFdKSkge1xyXG4gICAgICAgIGxhc3RVc2VkS2V5ID0gTWF0aC5tYXgocGFyc2VJbnQoYWxsS2V5c1thbGxLZXlzLmxlbmd0aCAtIDFdKSwgYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleVt0eXBlXSk7XHJcbiAgICB9XHJcbiAgICBuZXdLZXkgPSBsYXN0VXNlZEtleSArIDE7XHJcbiAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdID0gbmV3S2V5O1xyXG4gICAgX3NldEFsbFBhcmFtZXRlcnMoYWxsUGFyYW1ldGVycyk7XHJcbiAgICByZXR1cm4gbmV3S2V5O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsVGFza3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gX2xvYWQoXCJ0YXNrc1wiKTtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFByb2plY3RzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIF9sb2FkKFwicHJvamVjdHNcIik7XHJcbn07XHJcblxyXG5jb25zdCBfZ2V0QWxsUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBfbG9hZChcInBhcmFtZXRlcnNcIik7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsVGFza3MgPSBmdW5jdGlvbiAoYWxsVGFza3MpIHtcclxuICAgIF9zYXZlKFwidGFza3NcIiwgYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgX3NldEFsbFByb2plY3RzID0gZnVuY3Rpb24gKGFsbFByb2plY3RzKSB7XHJcbiAgICBfc2F2ZShcInByb2plY3RzXCIsIGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKGFsbFBhcmFtZXRlcnMpIHtcclxuICAgIF9zYXZlKFwicGFyYW1ldGVyc1wiLCBhbGxQYXJhbWV0ZXJzKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZVByb2plY3RGcm9tVGFza3MgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgbGV0IGdlbmVyYWxQcm9qZWN0S2V5ID0gMTtcclxuICAgIGZvciAobGV0IGkgaW4gYWxsVGFza3MpIHtcclxuICAgICAgICBpZiAoYWxsVGFza3NbaV0ucHJvamVjdCA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgIGFsbFRhc2tzW2ldLnByb2plY3QgPSBnZW5lcmFsUHJvamVjdEtleTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1RPRE8gLS0+IFByb210IHRoZSBVc2VyIGluIGRvbUNyZWF0b3IgdGhhdCB0aGUgdGFza3Mgd2lsbCBiZSByZXNldHRlZCB0byB0aGUgXCJHZW5lcmFsXCIgcHJvamVjdFxyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAodGFza09iaikge1xyXG4gICAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgY29uc3QgaWQgPSBfYXNzaWduVW5pcXVlSUQoXCJ0YXNrc1wiLCBhbGxUYXNrcyk7XHJcbiAgICBhbGxUYXNrc1tpZF0gPSB0YXNrT2JqO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IGFsbFByb2plY3RzID0gZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGNvbnN0IGlkID0gX2Fzc2lnblVuaXF1ZUlEKFwicHJvamVjdHNcIiwgYWxsUHJvamVjdHMpO1xyXG4gICAgaWYgKE9iamVjdC52YWx1ZXMoYWxsUHJvamVjdHMpLnNvbWUoKGVsZW0pID0+IGVsZW0gPT09IHByb2plY3ROYW1lKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxsUHJvamVjdHNbaWRdID0gcHJvamVjdE5hbWU7XHJcbiAgICAgICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgZGVsZXRlIGFsbFRhc2tzW2tleV07XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgZGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGxldCBhbGxQcm9qZWN0cyA9IGdldEFsbFByb2plY3RzKCk7XHJcbiAgICByZW1vdmVQcm9qZWN0RnJvbVRhc2tzKGtleSk7XHJcbiAgICBkZWxldGUgYWxsUHJvamVjdHNba2V5XTtcclxuICAgIF9zZXRBbGxQcm9qZWN0cyhhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uIChrZXksIHRhc2tPYmopIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBhbGxUYXNrc1trZXldID0gdGFza09iajtcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0UHJvamVjdCA9IGZ1bmN0aW9uIChrZXksIHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgYWxsUHJvamVjdHNba2V5XSA9IHByb2plY3ROYW1lO1xyXG4gICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmNvbnN0IHNldFRhc2tTdGF0dXMgPSBmdW5jdGlvbiAoa2V5LCBkb25lKSB7XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBjb25zdCB0YXNrID0gYWxsVGFza3Nba2V5XTtcclxuICAgIHRhc2suZG9uZSA9IGRvbmU7XHJcbiAgICBhbGxUYXNrc1trZXldID0gdGFzaztcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLyBfbG9hZCxcclxuICAgIC8vIF9zYXZlLFxyXG4gICAgZ2V0QWxsVGFza3MsXHJcbiAgICBnZXRBbGxQcm9qZWN0cyxcclxuICAgIGFkZFRhc2ssXHJcbiAgICBhZGRQcm9qZWN0LFxyXG4gICAgZGVsZXRlVGFzayxcclxuICAgIGRlbGV0ZVByb2plY3QsXHJcbiAgICBlZGl0VGFzayxcclxuICAgIGVkaXRQcm9qZWN0LFxyXG4gICAgc2V0VGFza1N0YXR1cyxcclxufTtcclxuIiwiaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlXCI7XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrT2JqID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJvamVjdEtleSwgZGF0ZSwgZG9uZSkge1xyXG4gICAgcmV0dXJuIHsgdGl0bGU6IHRpdGxlLCBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sIHByb2plY3RLZXk6IHByb2plY3RLZXksIGRhdGU6IGRhdGUsIGRvbmU6IGRvbmUgfTtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFZpc2libGVUYXNrcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBkYXRhU3RvcmFnZS5nZXRBbGxUYXNrcygpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlVGFza09iaixcclxuICAgIGdldEFsbFZpc2libGVUYXNrcyxcclxufTtcclxuIiwiLyoqXHJcblRPRE86XHJcbmRyYXdOZXdUYXNrTW9kYWxcclxuXHJcbiovXHJcblxyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IGV2ZW50Q29vcmRpbmF0b3IgZnJvbSBcIi4vZXZlbnRDb29yZGluYXRvclwiO1xyXG5cclxuLy9BZGQgZG9tRWxlbWVudCB0byB0aGUgVGFza2xpc3RcclxuY29uc3QgZHJhd1RvVGFza2xpc3QgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbi8vYWRkIGRvbUVsZW1lbnQgdG8gdGhlIFByb2plY3QgUGFuZWwgaW4gdGhlIFNpZGViYXJcclxuY29uc3QgZHJhd1RvUHJvamVjdFNpZGViYXIgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHByb2plY3RzU2lkZWJhckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtc2lkZWJhci1jb250YWluZXJcIik7XHJcbiAgICBwcm9qZWN0c1NpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhclRhc2tsaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICB3aGlsZSAodGFza3NDb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIHRhc2tzQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRhc2tzQ29udGFpbmVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL3JldHVybnMgYSBkb21FbGVtZW50IGJhc2VkIG9uIHRoZSBwcm9qZWN0LW5hbWUgc3RyaW5nIGdpdmVuIGFzIHBhcmFtZXRlclxyXG5jb25zdCBjcmVhdGVQcm9qZWN0ID0gZnVuY3Rpb24gKGtleSwgcHJvamVjdE5hbWUpIHtcclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgYnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIiwgXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGFkZCBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCByb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaWNvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTFcIik7XHJcblxyXG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhclwiLCBcImZhLXNtXCIsIFwiZmEtY2lyY2xlXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1hdXRvXCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xyXG5cclxuICAgIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XHJcbiAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dENvbnRhaW5lcik7XHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQocm93Q29udGFpbmVyKTtcclxuICAgIHJldHVybiBidXR0b247XHJcbn07XHJcblxyXG4vL3JldHVybnMgYSBkb21FbGVtZW50IGJhc2VkIG9uIHRoZSB0YXNrIG9iamVjdCBnaXZlbiBhcyBwYXJhbWV0ZXJcclxuY29uc3QgY3JlYXRlVGFza0VsZW1lbnQgPSBmdW5jdGlvbiAoa2V5LCB0YXNrT2JqKSB7XHJcbiAgICBsZXQgbWVkaWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1lZGlhXCIsIFwiZC1mbGV4XCIpO1xyXG5cclxuICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke2tleX1gO1xyXG4gICAgY2hlY2tib3gudmFsdWUgPSBrZXk7XHJcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFza09iai5kb25lO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImZvcm0tY2hlY2staW5wdXRcIiwgXCJhbGlnbi1zZWxmLXN0YXJ0XCIsIFwibXQtMlwiKTtcclxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudENvb3JkaW5hdG9yLmNsaWNrVGFza0NoZWNrYm94KGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXIgd2hlbiBjaGVja2JveCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZFxyXG5cclxuICAgIGxldCBtZWRpYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpYS1ib2R5XCIsIFwibXMtM1wiLCBcImQtZmxleFwiLCBcInctMTAwXCIsIFwianVzdGlmeS1jb250ZW50LWJldHdlZW5cIik7XHJcblxyXG4gICAgbGV0IHRleHRCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRhc2tPYmoudGl0bGU7XHJcblxyXG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFza09iai5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBlZGl0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2tleX1gO1xyXG4gICAgZWRpdEJ1dHRvbi52YWx1ZSA9IGtleTtcclxuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGV2ZW50IGxpc3RlbmVyIHdoZW4gZWRpdC1idXR0b24gaXMgY2xpY2tlZFxyXG5cclxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIsIFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IEFkZCBkZWxldGUgYnV0dG9uLCB3aXRoIGV2ZW50IGxpc3RlbmVyIGluY2x1ZGluZyBhcmUteW91LXN1cmUtbW9kYWxcclxuXHJcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcclxuICAgIHRleHRCb2R5LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIHRleHRCb2R5LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZCh0ZXh0Qm9keSk7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhQm9keSk7XHJcblxyXG4gICAgcmV0dXJuIG1lZGlhQ29udGFpbmVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZGl2aXNlciBkb21FbGVtZW50IGZvciBiZXR3ZWVuIHRoZSBkaWZmZXJlbnQgdGFza3NcclxuY29uc3QgY3JlYXRlRGl2aWRlckVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgZGl2aWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXZpZGVyLmNsYXNzTGlzdC5hZGQoXCJib3JkZXItdG9wXCIsIFwibXktMlwiKTtcclxuXHJcbiAgICByZXR1cm4gZGl2aWRlcjtcclxufTtcclxuXHJcbi8vY3JlYXRlIGRvbUVsZW1lbnQgZm9yIHRoZSBidXR0b24gdG8gYWRkIGEgbmV3IHRhc2tzIGF0IHRoZSBlbmQgb2YgdGhlIHRhc2tsaXN0XHJcbmNvbnN0IGNyZWF0ZU5ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBuZXcgdGFza1wiO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tYmxvY2tcIiwgXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudENvb3JkaW5hdG9yLmNsaWNrTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudChldmVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3cuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBkb21FbGVtZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIG9yIGVkaXQgYSBuZXcgdGFzayBpbiB0aGUgdGFza2xpc3Qgb3IgYmUgZGlzcGxheWVkIGluIGEgbW9kYWxcclxuY29uc3QgY3JlYXRlVGFza0lucHV0RWxlbWVudCA9IGZ1bmN0aW9uIChcclxuICAgIHRhc2tPYmogPSB7IHRpdGxlOiBcIlwiLCBkZXNjcmlwdGlvbjogXCJcIiwgcHJvamVjdEtleTogXCJcIiwgZGF0ZTogXCJcIiwgZG9uZTogZmFsc2UgfSxcclxuICAgIGtleSA9IG51bGxcclxuKSB7XHJcbiAgICBjb25zdCBjcmVhdGVJbnB1dEdyb3VwID0gZnVuY3Rpb24gKGxhYmVsLCBpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgaW5wdXRHcm91cC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXBcIiwgXCJtYi0yXCIpO1xyXG5cclxuICAgICAgICBsZXQgc3BhbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cC10ZXh0XCIpO1xyXG4gICAgICAgIHNwYW5MYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsO1xyXG5cclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKHNwYW5MYWJlbCk7XHJcbiAgICAgICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXRHcm91cDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgIGZvcm0uaWQgPSBcInRhc2staW5wdXQtZm9ybVwiO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwibmVlZHMtdmFsaWRhdGlvblwiKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKFwibm92YWxpZGF0ZVwiLCBcInRydWVcIik7XHJcblxyXG4gICAgbGV0IHRhc2tJbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuaWQgPSBcInRhc2staW5wdXQtY29udGFpbmVyXCI7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0VGl0bGUudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgaW5wdXRUaXRsZS52YWx1ZSA9IHRhc2tPYmoudGl0bGU7XHJcbiAgICBpbnB1dFRpdGxlLmlkID0gXCJpbnB1dFRpdGxlXCI7XHJcbiAgICBpbnB1dFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcbiAgICBpbnB1dFRpdGxlLnJlcXVpcmVkID0gdHJ1ZTtcclxuXHJcbiAgICBsZXQgaW5wdXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGlucHV0RGVzY3JpcHRpb24ucm93cyA9IFwiNFwiO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tPYmouZGVzY3JpcHRpb247XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLmlkID0gXCJpbnB1dERlc2NyaXB0aW9uXCI7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBpbnB1dFByb2plY3QuY2xhc3NMaXN0LmFkZChcImZvcm0tc2VsZWN0XCIpO1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBhbGxQcm9qZWN0c1tpXTtcclxuICAgICAgICBvcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIGlucHV0UHJvamVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgfVxyXG4gICAgaW5wdXRQcm9qZWN0LnZhbHVlID0gdGFza09iai5wcm9qZWN0S2V5O1xyXG4gICAgaW5wdXRQcm9qZWN0LmlkID0gXCJpbnB1dFByb2plY3RcIjtcclxuXHJcbiAgICBsZXQgaW5wdXREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXREYXRlLnR5cGUgPSBcImRhdGVcIjtcclxuICAgIGlucHV0RGF0ZS52YWx1ZSA9IHRhc2tPYmouZGF0ZTtcclxuICAgIGlucHV0RGF0ZS5pZCA9IFwiaW5wdXREYXRlXCI7XHJcbiAgICBpbnB1dERhdGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzYXZlQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Sb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvblJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICBzYXZlQnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLXByaW1hcnlcIiwgXCJidG4tYmxvY2tcIik7XHJcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnRDb29yZGluYXRvci5jbGlja1NhdmVCdXR0b24oa2V5LCB0YXNrT2JqLmRvbmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2F2ZUJ1dHRvblJvdy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgIHNhdmVCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvblJvdyk7XHJcblxyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJUaXRsZVwiLCBpbnB1dFRpdGxlKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIkRlc2NyaXB0aW9uXCIsIGlucHV0RGVzY3JpcHRpb24pKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiUHJvamVjdFwiLCBpbnB1dFByb2plY3QpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRHVlIERhdGVcIiwgaW5wdXREYXRlKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRhc2tJbnB1dENvbnRhaW5lcik7XHJcblxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3VG9UYXNrbGlzdCxcclxuICAgIGRyYXdUb1Byb2plY3RTaWRlYmFyLFxyXG4gICAgY2xlYXJUYXNrbGlzdCxcclxuICAgIGNyZWF0ZVByb2plY3QsXHJcbiAgICBjcmVhdGVUYXNrRWxlbWVudCxcclxuICAgIGNyZWF0ZU5ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQsXHJcbiAgICBjcmVhdGVEaXZpZGVyRWxlbWVudCxcclxuICAgIGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQsXHJcbn07XHJcbiIsImltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3JcIjtcclxuaW1wb3J0IGRhdGFTdHJ1Y3R1cmVyIGZyb20gXCIuL2RhdGFTdHJ1Y3R1cmVyXCI7XHJcbmltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgY2xpY2tOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC50YXJnZXQucmVtb3ZlKCk7XHJcbiAgICBjb25zdCB0YXNrSW5wdXRFbGVtZW50ID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrSW5wdXRFbGVtZW50KCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tJbnB1dEVsZW1lbnQpO1xyXG59O1xyXG5cclxuY29uc3QgY2xpY2tTYXZlQnV0dG9uID0gZnVuY3Rpb24gKGtleSwgZG9uZSkge1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0VGl0bGVcIik7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXREZXNjcmlwdGlvblwiKTtcclxuICAgIGNvbnN0IHByb2plY3RLZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0UHJvamVjdFwiKTtcclxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0RGF0ZVwiKTtcclxuXHJcbiAgICBpZiAoIXRpdGxlLnZhbHVlIHx8ICFkZXNjcmlwdGlvbi52YWx1ZSB8fCAhcHJvamVjdEtleS52YWx1ZSB8fCAhZGF0ZS52YWx1ZSkge1xyXG4gICAgICAgIC8vaW5wdXQgdmFsaWRhdGlvblxyXG4gICAgICAgIGNvbnN0IGlucHV0QXJyID0gW3RpdGxlLCBkZXNjcmlwdGlvbiwgcHJvamVjdEtleSwgZGF0ZV07XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBpbnB1dEFycikge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRBcnJbaV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0QXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1pbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LmFkZChcImlzLXZhbGlkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImlzLXZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LmFkZChcImlzLWludmFsaWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCB0YXNrT2JqID0ge307XHJcblxyXG4gICAgICAgIC8vaWYga2V5IGlzIG51bGwgdGhpcyBtZWFucyB0aGF0IHRoZSBjcmVhdGVUYXNrSW5wdXRFbGVtZW50KCkgZnVuY3Rpb24gaGFzIGJlZW4gY2FsbGVkIHdpdGggZGVmYXVsdCB2YWx1ZXMgYW5kXHJcbiAgICAgICAgLy90aHVzIGFpbXMgdG8gY3JlYXRlIGEgbmV3IHRhc2tzXHJcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0YXNrT2JqID0gZGF0YVN0cnVjdHVyZXIuY3JlYXRlVGFza09iaih0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIHByb2plY3RLZXkudmFsdWUsIGRhdGUudmFsdWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgZGF0YVN0b3JhZ2UuYWRkVGFzayh0YXNrT2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXNrT2JqID0gZGF0YVN0cnVjdHVyZXIuY3JlYXRlVGFza09iaih0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIHByb2plY3RLZXkudmFsdWUsIGRhdGUudmFsdWUsIGRvbmUpO1xyXG4gICAgICAgICAgICBkYXRhU3RvcmFnZS5lZGl0VGFzayhrZXksIHRhc2tPYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhbGxWaXNpYmxlVGFza3MgPSBkYXRhU3RydWN0dXJlci5nZXRBbGxWaXNpYmxlVGFza3MoKTtcclxuICAgICAgICBkb21DcmVhdG9yLmNsZWFyVGFza2xpc3QoKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGFsbFZpc2libGVUYXNrcykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRWxlbSA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0VsZW1lbnQoaSwgYWxsVmlzaWJsZVRhc2tzW2ldKTtcclxuICAgICAgICAgICAgY29uc3QgZGl2aWRlciA9IGRvbUNyZWF0b3IuY3JlYXRlRGl2aWRlckVsZW1lbnQoKTtcclxuICAgICAgICAgICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdCh0YXNrRWxlbSk7XHJcbiAgICAgICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QoZGl2aWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb21DcmVhdG9yLmNyZWF0ZU5ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQoKTtcclxuICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KG5ld1Rhc2tCdXR0b24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY2xpY2tUYXNrQ2hlY2tib3ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHRhc2tJRCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIGNvbnN0IHN0YXR1cyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xyXG4gICAgZGF0YVN0b3JhZ2Uuc2V0VGFza1N0YXR1cyh0YXNrSUQsIHN0YXR1cyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNsaWNrTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCwgY2xpY2tTYXZlQnV0dG9uLCBjbGlja1Rhc2tDaGVja2JveCB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKiAgXHJcbk1vZHVsZXM6XHJcblxyXG5cclxuXHJcbmNvb3JkaW5hdG9yXHJcbiAgICBDb29yZGluYXRvclxyXG4gICAgICAgIEhhbmRsZXMgdGhpbmdzIGxpa2UgdGhlIGluaXRpYWwgbG9hZCBvZiB0aGUgcGFnZVxyXG5cclxuXHJcbmRvbUV2ZW50c1xyXG4gICAgQWJsZSB0byBjcmVhdGUgRXZlbnQgTGlzdGVuZXJzIGFuZCBjb250YWlucyB0aGUgc3BlY2lmaWMgRnVuY3Rpb25zIGNhbGxlZCBieSB0aGUgRXZlbnQgTGlzdGVuZXJzXHJcblxyXG5cclxuZG9tQ3JlYXRvclxyXG4gICAgVGhpcyB0YWtlcyBhbiBPYmplY3QgYW5kIGEgUGxhY2UgdG8gZGlzcGxheSB0aGUgT2JqZWN0cyBjb250ZW50XHJcblxyXG5cclxuZGF0YVN0b3JhZ2U6XHJcbiAgICBEYXRhIFNhdmVyXHJcbiAgICAgICAgVGhpcyBzYXZlcyBuZXcgSW5wdXQgdG8gYSBKU09OLWZpbGVcclxuXHJcbiAgICBEYXRhIExvYWRlclxyXG4gICAgICAgIFRoaXMgbG9hZHMgYSBKU09OLWZpbGVcclxuXHJcblxyXG5kYXRhU3RydWN0dXJlcjpcclxuICAgIERhdGEgU3RydWN0dXJlclxyXG4gICAgICAgIFRoaW5ncyBsaWtlIGFzc29jaWF0aW5nIHRoZSB0YXNrcyB3aXRoIHRoZWlyIHByb2plY3RzXHJcbiAgICAgICAgQWxzbyB0aGluZ3MgbGlrZSByZW1vdmluZyB0aGUgcHJvamVjdCBmcm9tIHRhc2tzIHdoZXJlIHRoZSBwcm9qZWN0IGhhcyBiZWVuIGRlbGV0ZWQuXHJcblxyXG4gICAgRGF0YSBTZWxlY3RlclxyXG4gICAgICAgIFRoaXMgdGFrZXMgYSBPYmplY3QgZnJvbSB0aGUgRGF0YSBMb2FkZXIgYW5kIHJldHVybnMgYSBmaWx0ZXJlZCBPYmplY3QgdG8gdGhlIENyZWF0b3JcclxuICovXHJcblxyXG5pbXBvcnQgY29vcmRpbmF0b3IgZnJvbSBcIi4vY29vcmRpbmF0b3JcIjtcclxuaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3JcIjtcclxuXHJcbi8vdGVzdGluZ1xyXG5jb25zdCB0ZXN0RGF0YVNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIkdlbmVyYWxcIik7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiUHJpdmF0ZVwiKTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJXb3JrXCIpO1xyXG5cclxuICAgIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4gICAgICAgIHRpdGxlOiBcInRhc2sgb25lXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayBvbmVcIixcclxuICAgICAgICBwcm9qZWN0OiAyLFxyXG4gICAgICAgIGRhdGU6IFwiMjAwMC0wMS0wMVwiLFxyXG4gICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRUYXNrKHtcclxuICAgICAgICB0aXRsZTogXCJ0YXNrIHR3b1wiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgdHdvXCIsXHJcbiAgICAgICAgcHJvamVjdDogMyxcclxuICAgICAgICBkYXRlOiBcIjIwMDAtMDMtMDNcIixcclxuICAgICAgICBkb25lOiBmYWxzZSxcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gdGVzdERhdGFTZXR1cCgpO1xyXG4vLyBkYXRhU3RvcmFnZS5hZGRUYXNrKHtcclxuLy8gICAgIHRpdGxlOiBcInRhc2sgdGhyZWVcIixcclxuLy8gICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgdGhyZWVcIixcclxuLy8gICAgIHByb2plY3Q6IFwiUHJvamVjdCAyXCIsXHJcbi8vICAgICBkYXRlOiBcIjIwMDAtMDMtMDNcIixcclxuLy8gICAgIGRvbmU6IGZhbHNlLFxyXG4vLyB9KTtcclxuLy8gZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIlByb2plY3QgM1wiKTtcclxuLy8gZGF0YVN0b3JhZ2UuZGVsZXRlVGFzaygxKTtcclxuLy8gZGF0YVN0b3JhZ2UuZGVsZXRlUHJvamVjdCgyKTtcclxuLy8gZGF0YVN0b3JhZ2UuZWRpdFByb2plY3QoMiwgXCJQcml2YXRlXCIpO1xyXG4vLyBkYXRhU3RvcmFnZS5lZGl0VGFzaygyLCB7XHJcbi8vICAgICB0aXRsZTogXCJ0YXNrIHR3b1wiLFxyXG4vLyAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0d28gd2l0aCBzb21lIGVkaXRcIixcclxuLy8gICAgIHByb2plY3Q6IDMsXHJcbi8vICAgICBkYXRlOiBcIjIwMDAtMDMtMDNcIixcclxuLy8gICAgIGRvbmU6IGZhbHNlLFxyXG4vLyB9KTtcclxuLy9lbmQgdGVzdGluZ1xyXG5cclxuY29vcmRpbmF0b3IuY29vcmRpbmF0ZUluaXRpYWxMb2FkKCk7XHJcblxyXG4vL3Rlc3RpbmdcclxuLy8gY29uc3QgdGFza0lucHV0RWxlbWVudCA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0lucHV0RWxlbWVudCgpO1xyXG4vLyBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tJbnB1dEVsZW1lbnQpO1xyXG4vL2VuZCB0ZXN0aW5nXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==