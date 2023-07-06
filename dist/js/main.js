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
    //TODO --> Load allProjects and allTasks from Storage

    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawAllProjectsToSidebar();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawVisibleTasksToTasklist();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"].drawNewTaskButtonToTasklist();
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


const _load = function (id) {
    const obj = localStorage.getItem(id);

    if (obj === null) {
        return {};
    } else {
        return JSON.parse(obj);
    }
};

const _save = function (id, dataObj) {
    localStorage.setItem(id, JSON.stringify(dataObj));
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


const createTaskObj = function (title, description, projectID, date, done) {
    return { title: title, description: description, projectID: projectID, date: date, done: done };
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
/* harmony import */ var _dataStructurer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataStructurer */ "./src/js/dataStructurer.js");
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

const drawNewTaskButtonToTasklist = function () {
    const newTaskButton = createNewTaskButtonTasklistElement();
    drawToTasklist(newTaskButton);
};

const drawAllProjectsToSidebar = function () {
    let allProjects = _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getAllProjects();
    for (let i in allProjects) {
        let project = createProject(i, allProjects[i]);
        drawToProjectSidebar(project);
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

//returns a domElement based on the project-name string given as parameter
const createProject = function (id, projectName) {
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
    drawToProjectSidebar,
    drawNewTaskButtonToTasklist,
    drawAllProjectsToSidebar,
    drawVisibleTasksToTasklist,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0RBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvY29vcmRpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0cnVjdHVyZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9ldmVudENvb3JkaW5hdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlLmpzXCI7XHJcbmltcG9ydCBkYXRhU3RydWN0dXJlciBmcm9tIFwiLi9kYXRhU3RydWN0dXJlci5qc1wiO1xyXG5pbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yLmpzXCI7XHJcblxyXG5jb25zdCBjb29yZGluYXRlSW5pdGlhbExvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL1RPRE8gLS0+IExvYWQgYWxsUHJvamVjdHMgYW5kIGFsbFRhc2tzIGZyb20gU3RvcmFnZVxyXG5cclxuICAgIGRvbUNyZWF0b3IuZHJhd0FsbFByb2plY3RzVG9TaWRlYmFyKCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdWaXNpYmxlVGFza3NUb1Rhc2tsaXN0KCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdOZXdUYXNrQnV0dG9uVG9UYXNrbGlzdCgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29vcmRpbmF0ZUluaXRpYWxMb2FkLFxyXG59O1xyXG4iLCJpbXBvcnQgZGF0YVN0cnVjdHVyZXIgZnJvbSBcIi4vZGF0YVN0cnVjdHVyZXJcIjtcclxuXHJcbmNvbnN0IF9sb2FkID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBjb25zdCBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpZCk7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uob2JqKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IF9zYXZlID0gZnVuY3Rpb24gKGlkLCBkYXRhT2JqKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpZCwgSlNPTi5zdHJpbmdpZnkoZGF0YU9iaikpO1xyXG59O1xyXG5cclxuY29uc3QgX2Fzc2lnblVuaXF1ZUlEID0gZnVuY3Rpb24gKHR5cGUsIG9iaikge1xyXG4gICAgbGV0IGFsbFBhcmFtZXRlcnMgPSBfZ2V0QWxsUGFyYW1ldGVycygpO1xyXG4gICAgaWYgKCFhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkSUQpIHtcclxuICAgICAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkSUQgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICghYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEW3R5cGVdKSB7XHJcbiAgICAgICAgYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEW3R5cGVdID0gMDtcclxuICAgIH1cclxuICAgIGxldCBuZXdJRCA9IG51bGw7XHJcbiAgICBjb25zdCBhbGxJRHMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgbGV0IGxhc3RVc2VkSUQgPSBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkSURbdHlwZV07XHJcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhbGxJRHNbYWxsSURzLmxlbmd0aCAtIDFdKSkge1xyXG4gICAgICAgIGxhc3RVc2VkSUQgPSBNYXRoLm1heChwYXJzZUludChhbGxJRHNbYWxsSURzLmxlbmd0aCAtIDFdKSwgYWxsUGFyYW1ldGVycy5sYXN0VXNlZElEW3R5cGVdKTtcclxuICAgIH1cclxuICAgIG5ld0lEID0gbGFzdFVzZWRJRCArIDE7XHJcbiAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkSURbdHlwZV0gPSBuZXdJRDtcclxuICAgIF9zZXRBbGxQYXJhbWV0ZXJzKGFsbFBhcmFtZXRlcnMpO1xyXG4gICAgcmV0dXJuIG5ld0lEO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsVGFza3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gX2xvYWQoXCJ0YXNrc1wiKTtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFByb2plY3RzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIF9sb2FkKFwicHJvamVjdHNcIik7XHJcbn07XHJcblxyXG5jb25zdCBfZ2V0QWxsUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBfbG9hZChcInBhcmFtZXRlcnNcIik7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsVGFza3MgPSBmdW5jdGlvbiAoYWxsVGFza3MpIHtcclxuICAgIF9zYXZlKFwidGFza3NcIiwgYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgX3NldEFsbFByb2plY3RzID0gZnVuY3Rpb24gKGFsbFByb2plY3RzKSB7XHJcbiAgICBfc2F2ZShcInByb2plY3RzXCIsIGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKGFsbFBhcmFtZXRlcnMpIHtcclxuICAgIF9zYXZlKFwicGFyYW1ldGVyc1wiLCBhbGxQYXJhbWV0ZXJzKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZVByb2plY3RGcm9tVGFza3MgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBsZXQgZ2VuZXJhbFByb2plY3RJRCA9IDE7XHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICAgICAgaWYgKGFsbFRhc2tzW2ldLnByb2plY3QgPT09IGlkKSB7XHJcbiAgICAgICAgICAgIGFsbFRhc2tzW2ldLnByb2plY3QgPSBnZW5lcmFsUHJvamVjdElEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vVE9ETyAtLT4gUHJvbXQgdGhlIFVzZXIgaW4gZG9tQ3JlYXRvciB0aGF0IHRoZSB0YXNrcyB3aWxsIGJlIHJlc2V0dGVkIHRvIHRoZSBcIkdlbmVyYWxcIiBwcm9qZWN0XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uICh0YXNrT2JqKSB7XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBjb25zdCBpZCA9IF9hc3NpZ25VbmlxdWVJRChcInRhc2tzXCIsIGFsbFRhc2tzKTtcclxuICAgIGFsbFRhc2tzW2lkXSA9IHRhc2tPYmo7XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgYWRkUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgY29uc3QgaWQgPSBfYXNzaWduVW5pcXVlSUQoXCJwcm9qZWN0c1wiLCBhbGxQcm9qZWN0cyk7XHJcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhhbGxQcm9qZWN0cykuc29tZSgoZWxlbSkgPT4gZWxlbSA9PT0gcHJvamVjdE5hbWUpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IGFscmVhZHkgZXhpc3RzXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhbGxQcm9qZWN0c1tpZF0gPSBwcm9qZWN0TmFtZTtcclxuICAgICAgICBfc2V0QWxsUHJvamVjdHMoYWxsUHJvamVjdHMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGRlbGV0ZSBhbGxUYXNrc1tpZF07XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgZGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIHJlbW92ZVByb2plY3RGcm9tVGFza3MoaWQpO1xyXG4gICAgZGVsZXRlIGFsbFByb2plY3RzW2lkXTtcclxuICAgIF9zZXRBbGxQcm9qZWN0cyhhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uIChpZCwgdGFza09iaikge1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGFsbFRhc2tzW2lkXSA9IHRhc2tPYmo7XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgZWRpdFByb2plY3QgPSBmdW5jdGlvbiAoaWQsIHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgYWxsUHJvamVjdHNbaWRdID0gcHJvamVjdE5hbWU7XHJcbiAgICBfc2V0QWxsUHJvamVjdHMoYWxsUHJvamVjdHMpO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0VGFza1N0YXR1cyA9IGZ1bmN0aW9uIChpZCwgZG9uZSkge1xyXG4gICAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgY29uc3QgdGFzayA9IGFsbFRhc2tzW2lkXTtcclxuICAgIHRhc2suZG9uZSA9IGRvbmU7XHJcbiAgICBhbGxUYXNrc1tpZF0gPSB0YXNrO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8vIF9sb2FkLFxyXG4gICAgLy8gX3NhdmUsXHJcbiAgICBnZXRBbGxUYXNrcyxcclxuICAgIGdldEFsbFByb2plY3RzLFxyXG4gICAgYWRkVGFzayxcclxuICAgIGFkZFByb2plY3QsXHJcbiAgICBkZWxldGVUYXNrLFxyXG4gICAgZGVsZXRlUHJvamVjdCxcclxuICAgIGVkaXRUYXNrLFxyXG4gICAgZWRpdFByb2plY3QsXHJcbiAgICBzZXRUYXNrU3RhdHVzLFxyXG59O1xyXG4iLCJpbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tPYmogPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBwcm9qZWN0SUQsIGRhdGUsIGRvbmUpIHtcclxuICAgIHJldHVybiB7IHRpdGxlOiB0aXRsZSwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLCBwcm9qZWN0SUQ6IHByb2plY3RJRCwgZGF0ZTogZGF0ZSwgZG9uZTogZG9uZSB9O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsVmlzaWJsZVRhc2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGRhdGFTdG9yYWdlLmdldEFsbFRhc2tzKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjcmVhdGVUYXNrT2JqLFxyXG4gICAgZ2V0QWxsVmlzaWJsZVRhc2tzLFxyXG59O1xyXG4iLCIvKipcclxuVE9ETzpcclxuZHJhd05ld1Rhc2tNb2RhbFxyXG5cclxuKi9cclxuXHJcbmltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZVwiO1xyXG5pbXBvcnQgZXZlbnRDb29yZGluYXRvciBmcm9tIFwiLi9ldmVudENvb3JkaW5hdG9yXCI7XHJcbmltcG9ydCBkYXRhU3RydWN0dXJlciBmcm9tIFwiLi9kYXRhU3RydWN0dXJlclwiO1xyXG5cclxuLy9BZGQgZG9tRWxlbWVudCB0byB0aGUgVGFza2xpc3RcclxuY29uc3QgZHJhd1RvVGFza2xpc3QgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbi8vYWRkIGRvbUVsZW1lbnQgdG8gdGhlIFByb2plY3QgUGFuZWwgaW4gdGhlIFNpZGViYXJcclxuY29uc3QgZHJhd1RvUHJvamVjdFNpZGViYXIgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHByb2plY3RzU2lkZWJhckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtc2lkZWJhci1jb250YWluZXJcIik7XHJcbiAgICBwcm9qZWN0c1NpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhclRhc2tsaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICB3aGlsZSAodGFza3NDb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIHRhc2tzQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRhc2tzQ29udGFpbmVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBkcmF3TmV3VGFza0J1dHRvblRvVGFza2xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCgpO1xyXG4gICAgZHJhd1RvVGFza2xpc3QobmV3VGFza0J1dHRvbik7XHJcbn07XHJcblxyXG5jb25zdCBkcmF3QWxsUHJvamVjdHNUb1NpZGViYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxQcm9qZWN0cykge1xyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdChpLCBhbGxQcm9qZWN0c1tpXSk7XHJcbiAgICAgICAgZHJhd1RvUHJvamVjdFNpZGViYXIocHJvamVjdCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBkcmF3VmlzaWJsZVRhc2tzVG9UYXNrbGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXNrcyA9IGRhdGFTdHJ1Y3R1cmVyLmdldEFsbFZpc2libGVUYXNrcygpO1xyXG4gICAgZm9yIChsZXQgaSBpbiB0YXNrcykge1xyXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtID0gY3JlYXRlVGFza0VsZW1lbnQoaSwgdGFza3NbaV0pO1xyXG4gICAgICAgIGNvbnN0IGRpdmlkZXIgPSBjcmVhdGVEaXZpZGVyRWxlbWVudCgpO1xyXG4gICAgICAgIGRyYXdUb1Rhc2tsaXN0KHRhc2tFbGVtKTtcclxuICAgICAgICBkcmF3VG9UYXNrbGlzdChkaXZpZGVyKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vcmV0dXJucyBhIGRvbUVsZW1lbnQgYmFzZWQgb24gdGhlIHByb2plY3QtbmFtZSBzdHJpbmcgZ2l2ZW4gYXMgcGFyYW1ldGVyXHJcbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAoaWQsIHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi52YWx1ZSA9IGlkO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIiwgXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGFkZCBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCByb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaWNvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTFcIik7XHJcblxyXG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhclwiLCBcImZhLXNtXCIsIFwiZmEtY2lyY2xlXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1hdXRvXCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xyXG5cclxuICAgIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XHJcbiAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dENvbnRhaW5lcik7XHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQocm93Q29udGFpbmVyKTtcclxuICAgIHJldHVybiBidXR0b247XHJcbn07XHJcblxyXG4vL3JldHVybnMgYSBkb21FbGVtZW50IGJhc2VkIG9uIHRoZSB0YXNrIG9iamVjdCBnaXZlbiBhcyBwYXJhbWV0ZXJcclxuY29uc3QgY3JlYXRlVGFza0VsZW1lbnQgPSBmdW5jdGlvbiAoaWQsIHRhc2tPYmopIHtcclxuICAgIGxldCBtZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWVkaWFcIiwgXCJkLWZsZXhcIik7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7aWR9YDtcclxuICAgIGNoZWNrYm94LnZhbHVlID0gaWQ7XHJcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFza09iai5kb25lO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImZvcm0tY2hlY2staW5wdXRcIiwgXCJhbGlnbi1zZWxmLXN0YXJ0XCIsIFwibXQtMlwiKTtcclxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudENvb3JkaW5hdG9yLmNsaWNrVGFza0NoZWNrYm94KGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXIgd2hlbiBjaGVja2JveCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZFxyXG5cclxuICAgIGxldCBtZWRpYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpYS1ib2R5XCIsIFwibXMtM1wiLCBcImQtZmxleFwiLCBcInctMTAwXCIsIFwianVzdGlmeS1jb250ZW50LWJldHdlZW5cIik7XHJcblxyXG4gICAgbGV0IHRleHRCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRhc2tPYmoudGl0bGU7XHJcblxyXG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFza09iai5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBlZGl0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2lkfWA7XHJcbiAgICBlZGl0QnV0dG9uLnZhbHVlID0gaWQ7XHJcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lciB3aGVuIGVkaXQtYnV0dG9uIGlzIGNsaWNrZWRcclxuXHJcbiAgICBsZXQgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBBZGQgZGVsZXRlIGJ1dHRvbiwgd2l0aCBldmVudCBsaXN0ZW5lciBpbmNsdWRpbmcgYXJlLXlvdS1zdXJlLW1vZGFsXHJcblxyXG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQodGV4dEJvZHkpO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUJvZHkpO1xyXG5cclxuICAgIHJldHVybiBtZWRpYUNvbnRhaW5lcjtcclxufTtcclxuXHJcbi8vY3JlYXRlIGRpdmlzZXIgZG9tRWxlbWVudCBmb3IgYmV0d2VlbiB0aGUgZGlmZmVyZW50IHRhc2tzXHJcbmNvbnN0IGNyZWF0ZURpdmlkZXJFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGRpdmlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKFwiYm9yZGVyLXRvcFwiLCBcIm15LTJcIik7XHJcblxyXG4gICAgcmV0dXJuIGRpdmlkZXI7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBkb21FbGVtZW50IGZvciB0aGUgYnV0dG9uIHRvIGFkZCBhIG5ldyB0YXNrcyBhdCB0aGUgZW5kIG9mIHRoZSB0YXNrbGlzdFxyXG5jb25zdCBjcmVhdGVOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJBZGQgbmV3IHRhc2tcIjtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWJsb2NrXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnRDb29yZGluYXRvci5jbGlja05ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQoZXZlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcm93LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZG9tRWxlbWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBvciBlZGl0IGEgbmV3IHRhc2sgaW4gdGhlIHRhc2tsaXN0IG9yIGJlIGRpc3BsYXllZCBpbiBhIG1vZGFsXHJcbmNvbnN0IGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQgPSBmdW5jdGlvbiAoXHJcbiAgICB0YXNrT2JqID0geyB0aXRsZTogXCJcIiwgZGVzY3JpcHRpb246IFwiXCIsIHByb2plY3RJRDogXCJcIiwgZGF0ZTogXCJcIiwgZG9uZTogZmFsc2UgfSxcclxuICAgIGlkID0gbnVsbFxyXG4pIHtcclxuICAgIGNvbnN0IGNyZWF0ZUlucHV0R3JvdXAgPSBmdW5jdGlvbiAobGFiZWwsIGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cFwiLCBcIm1iLTJcIik7XHJcblxyXG4gICAgICAgIGxldCBzcGFuTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBzcGFuTGFiZWwuY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwLXRleHRcIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XHJcblxyXG4gICAgICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoc3BhbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEdyb3VwO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgZm9ybS5pZCA9IFwidGFzay1pbnB1dC1mb3JtXCI7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJuZWVkcy12YWxpZGF0aW9uXCIpO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJub3ZhbGlkYXRlXCIsIFwidHJ1ZVwiKTtcclxuXHJcbiAgICBsZXQgdGFza0lucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5pZCA9IFwidGFzay1pbnB1dC1jb250YWluZXJcIjtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXRUaXRsZS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBpbnB1dFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZTtcclxuICAgIGlucHV0VGl0bGUuaWQgPSBcImlucHV0VGl0bGVcIjtcclxuICAgIGlucHV0VGl0bGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuICAgIGlucHV0VGl0bGUucmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgIGxldCBpbnB1dERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi5yb3dzID0gXCI0XCI7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLnZhbHVlID0gdGFza09iai5kZXNjcmlwdGlvbjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24uaWQgPSBcImlucHV0RGVzY3JpcHRpb25cIjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIGlucHV0UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1zZWxlY3RcIik7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxQcm9qZWN0cykge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGFsbFByb2plY3RzW2ldO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBpbnB1dFByb2plY3QudmFsdWUgPSB0YXNrT2JqLnByb2plY3RJRDtcclxuICAgIGlucHV0UHJvamVjdC5pZCA9IFwiaW5wdXRQcm9qZWN0XCI7XHJcblxyXG4gICAgbGV0IGlucHV0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0RGF0ZS50eXBlID0gXCJkYXRlXCI7XHJcbiAgICBpbnB1dERhdGUudmFsdWUgPSB0YXNrT2JqLmRhdGU7XHJcbiAgICBpbnB1dERhdGUuaWQgPSBcImlucHV0RGF0ZVwiO1xyXG4gICAgaW5wdXREYXRlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNhdmVCdXR0b25Sb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgc2F2ZUJ1dHRvbi52YWx1ZSA9IGlkO1xyXG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLXByaW1hcnlcIiwgXCJidG4tYmxvY2tcIik7XHJcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnRDb29yZGluYXRvci5jbGlja1NhdmVCdXR0b24oaWQsIHRhc2tPYmouZG9uZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzYXZlQnV0dG9uUm93LmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uUm93KTtcclxuXHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIlRpdGxlXCIsIGlucHV0VGl0bGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRGVzY3JpcHRpb25cIiwgaW5wdXREZXNjcmlwdGlvbikpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJQcm9qZWN0XCIsIGlucHV0UHJvamVjdCkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJEdWUgRGF0ZVwiLCBpbnB1dERhdGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uQ29udGFpbmVyKTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGFza0lucHV0Q29udGFpbmVyKTtcclxuXHJcbiAgICByZXR1cm4gZm9ybTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRyYXdUb1Rhc2tsaXN0LFxyXG4gICAgZHJhd1RvUHJvamVjdFNpZGViYXIsXHJcbiAgICBkcmF3TmV3VGFza0J1dHRvblRvVGFza2xpc3QsXHJcbiAgICBkcmF3QWxsUHJvamVjdHNUb1NpZGViYXIsXHJcbiAgICBkcmF3VmlzaWJsZVRhc2tzVG9UYXNrbGlzdCxcclxuICAgIGNsZWFyVGFza2xpc3QsXHJcbiAgICBjcmVhdGVQcm9qZWN0LFxyXG4gICAgY3JlYXRlVGFza0VsZW1lbnQsXHJcbiAgICBjcmVhdGVOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50LFxyXG4gICAgY3JlYXRlRGl2aWRlckVsZW1lbnQsXHJcbiAgICBjcmVhdGVUYXNrSW5wdXRFbGVtZW50LFxyXG59O1xyXG4iLCJpbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yXCI7XHJcbmltcG9ydCBkYXRhU3RydWN0dXJlciBmcm9tIFwiLi9kYXRhU3RydWN0dXJlclwiO1xyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IGNsaWNrTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQudGFyZ2V0LnJlbW92ZSgpO1xyXG4gICAgY29uc3QgdGFza0lucHV0RWxlbWVudCA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0lucHV0RWxlbWVudCgpO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdCh0YXNrSW5wdXRFbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGNsaWNrU2F2ZUJ1dHRvbiA9IGZ1bmN0aW9uIChpZCwgZG9uZSkge1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0VGl0bGVcIik7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXREZXNjcmlwdGlvblwiKTtcclxuICAgIGNvbnN0IHByb2plY3RJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRQcm9qZWN0XCIpO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXREYXRlXCIpO1xyXG5cclxuICAgIGlmICghdGl0bGUudmFsdWUgfHwgIWRlc2NyaXB0aW9uLnZhbHVlIHx8ICFwcm9qZWN0SUQudmFsdWUgfHwgIWRhdGUudmFsdWUpIHtcclxuICAgICAgICAvL2lucHV0IHZhbGlkYXRpb25cclxuICAgICAgICBjb25zdCBpbnB1dEFyciA9IFt0aXRsZSwgZGVzY3JpcHRpb24sIHByb2plY3RJRCwgZGF0ZV07XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBpbnB1dEFycikge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRBcnJbaV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0QXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1pbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LmFkZChcImlzLXZhbGlkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImlzLXZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcnJbaV0uY2xhc3NMaXN0LmFkZChcImlzLWludmFsaWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCB0YXNrT2JqID0ge307XHJcblxyXG4gICAgICAgIC8vaWYgaWQgaXMgbnVsbCB0aGlzIG1lYW5zIHRoYXQgdGhlIGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQoKSBmdW5jdGlvbiBoYXMgYmVlbiBjYWxsZWQgd2l0aCBkZWZhdWx0IHZhbHVlcyBhbmRcclxuICAgICAgICAvL3RodXMgYWltcyB0byBjcmVhdGUgYSBuZXcgdGFza3NcclxuICAgICAgICBpZiAoaWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGFza09iaiA9IGRhdGFTdHJ1Y3R1cmVyLmNyZWF0ZVRhc2tPYmoodGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBwcm9qZWN0SUQudmFsdWUsIGRhdGUudmFsdWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgZGF0YVN0b3JhZ2UuYWRkVGFzayh0YXNrT2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXNrT2JqID0gZGF0YVN0cnVjdHVyZXIuY3JlYXRlVGFza09iaih0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIHByb2plY3RJRC52YWx1ZSwgZGF0ZS52YWx1ZSwgZG9uZSk7XHJcbiAgICAgICAgICAgIGRhdGFTdG9yYWdlLmVkaXRUYXNrKGlkLCB0YXNrT2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWxsVmlzaWJsZVRhc2tzID0gZGF0YVN0cnVjdHVyZXIuZ2V0QWxsVmlzaWJsZVRhc2tzKCk7XHJcbiAgICAgICAgZG9tQ3JlYXRvci5jbGVhclRhc2tsaXN0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBhbGxWaXNpYmxlVGFza3MpIHtcclxuICAgICAgICAgICAgY29uc3QgdGFza0VsZW0gPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tFbGVtZW50KGksIGFsbFZpc2libGVUYXNrc1tpXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdmlkZXIgPSBkb21DcmVhdG9yLmNyZWF0ZURpdmlkZXJFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KGRpdmlkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb21DcmVhdG9yLmRyYXdOZXdUYXNrQnV0dG9uVG9UYXNrbGlzdCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY2xpY2tUYXNrQ2hlY2tib3ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHRhc2tJRCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIGNvbnN0IHN0YXR1cyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xyXG4gICAgZGF0YVN0b3JhZ2Uuc2V0VGFza1N0YXR1cyh0YXNrSUQsIHN0YXR1cyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNsaWNrTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCwgY2xpY2tTYXZlQnV0dG9uLCBjbGlja1Rhc2tDaGVja2JveCB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKiAgXHJcbk1vZHVsZXM6XHJcblxyXG5cclxuXHJcbmNvb3JkaW5hdG9yXHJcbiAgICBDb29yZGluYXRvclxyXG4gICAgICAgIEhhbmRsZXMgdGhpbmdzIGxpa2UgdGhlIGluaXRpYWwgbG9hZCBvZiB0aGUgcGFnZVxyXG5cclxuXHJcbmRvbUV2ZW50c1xyXG4gICAgQWJsZSB0byBjcmVhdGUgRXZlbnQgTGlzdGVuZXJzIGFuZCBjb250YWlucyB0aGUgc3BlY2lmaWMgRnVuY3Rpb25zIGNhbGxlZCBieSB0aGUgRXZlbnQgTGlzdGVuZXJzXHJcblxyXG5cclxuZG9tQ3JlYXRvclxyXG4gICAgVGhpcyB0YWtlcyBhbiBPYmplY3QgYW5kIGEgUGxhY2UgdG8gZGlzcGxheSB0aGUgT2JqZWN0cyBjb250ZW50XHJcblxyXG5cclxuZGF0YVN0b3JhZ2U6XHJcbiAgICBEYXRhIFNhdmVyXHJcbiAgICAgICAgVGhpcyBzYXZlcyBuZXcgSW5wdXQgdG8gYSBKU09OLWZpbGVcclxuXHJcbiAgICBEYXRhIExvYWRlclxyXG4gICAgICAgIFRoaXMgbG9hZHMgYSBKU09OLWZpbGVcclxuXHJcblxyXG5kYXRhU3RydWN0dXJlcjpcclxuICAgIERhdGEgU3RydWN0dXJlclxyXG4gICAgICAgIFRoaW5ncyBsaWtlIGFzc29jaWF0aW5nIHRoZSB0YXNrcyB3aXRoIHRoZWlyIHByb2plY3RzXHJcbiAgICAgICAgQWxzbyB0aGluZ3MgbGlrZSByZW1vdmluZyB0aGUgcHJvamVjdCBmcm9tIHRhc2tzIHdoZXJlIHRoZSBwcm9qZWN0IGhhcyBiZWVuIGRlbGV0ZWQuXHJcblxyXG4gICAgRGF0YSBTZWxlY3RlclxyXG4gICAgICAgIFRoaXMgdGFrZXMgYSBPYmplY3QgZnJvbSB0aGUgRGF0YSBMb2FkZXIgYW5kIHJldHVybnMgYSBmaWx0ZXJlZCBPYmplY3QgdG8gdGhlIENyZWF0b3JcclxuICovXHJcblxyXG5pbXBvcnQgY29vcmRpbmF0b3IgZnJvbSBcIi4vY29vcmRpbmF0b3JcIjtcclxuaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3JcIjtcclxuXHJcbi8vdGVzdGluZ1xyXG5jb25zdCB0ZXN0RGF0YVNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIkdlbmVyYWxcIik7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiUHJpdmF0ZVwiKTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJXb3JrXCIpO1xyXG5cclxuICAgIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4gICAgICAgIHRpdGxlOiBcInRhc2sgb25lXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayBvbmVcIixcclxuICAgICAgICBwcm9qZWN0OiAyLFxyXG4gICAgICAgIGRhdGU6IFwiMjAwMC0wMS0wMVwiLFxyXG4gICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRUYXNrKHtcclxuICAgICAgICB0aXRsZTogXCJ0YXNrIHR3b1wiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgdHdvXCIsXHJcbiAgICAgICAgcHJvamVjdDogMyxcclxuICAgICAgICBkYXRlOiBcIjIwMDAtMDMtMDNcIixcclxuICAgICAgICBkb25lOiBmYWxzZSxcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gdGVzdERhdGFTZXR1cCgpO1xyXG4vLyBkYXRhU3RvcmFnZS5hZGRUYXNrKHtcclxuLy8gICAgIHRpdGxlOiBcInRhc2sgdGhyZWVcIixcclxuLy8gICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgdGhyZWVcIixcclxuLy8gICAgIHByb2plY3Q6IFwiUHJvamVjdCAyXCIsXHJcbi8vICAgICBkYXRlOiBcIjIwMDAtMDMtMDNcIixcclxuLy8gICAgIGRvbmU6IGZhbHNlLFxyXG4vLyB9KTtcclxuLy8gZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIlByb2plY3QgM1wiKTtcclxuLy8gZGF0YVN0b3JhZ2UuZGVsZXRlVGFzaygxKTtcclxuLy8gZGF0YVN0b3JhZ2UuZGVsZXRlUHJvamVjdCgyKTtcclxuLy8gZGF0YVN0b3JhZ2UuZWRpdFByb2plY3QoMiwgXCJQcml2YXRlXCIpO1xyXG4vLyBkYXRhU3RvcmFnZS5lZGl0VGFzaygyLCB7XHJcbi8vICAgICB0aXRsZTogXCJ0YXNrIHR3b1wiLFxyXG4vLyAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0d28gd2l0aCBzb21lIGVkaXRcIixcclxuLy8gICAgIHByb2plY3Q6IDMsXHJcbi8vICAgICBkYXRlOiBcIjIwMDAtMDMtMDNcIixcclxuLy8gICAgIGRvbmU6IGZhbHNlLFxyXG4vLyB9KTtcclxuLy9lbmQgdGVzdGluZ1xyXG5cclxuY29vcmRpbmF0b3IuY29vcmRpbmF0ZUluaXRpYWxMb2FkKCk7XHJcblxyXG4vL3Rlc3RpbmdcclxuLy8gY29uc3QgdGFza0lucHV0RWxlbWVudCA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0lucHV0RWxlbWVudCgpO1xyXG4vLyBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tJbnB1dEVsZW1lbnQpO1xyXG4vL2VuZCB0ZXN0aW5nXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==