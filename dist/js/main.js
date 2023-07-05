/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/coordinator.js":
/*!*******************************!*\
  !*** ./src/js/coordinator.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dataStructurer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataStructurer */ "./src/js/dataStructurer.js");
/* harmony import */ var _dataStructurer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dataStructurer__WEBPACK_IMPORTED_MODULE_0__);


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
/***/ (() => {



/***/ }),

/***/ "./src/js/domCreator.js":
/*!******************************!*\
  !*** ./src/js/domCreator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

//returns a domElement based on the project-name string given as parameter
const createProject = function (key, project) {
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
    textContainer.textContent = project;

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
    taskObj = { title: "", description: "", project: "", date: "", done: false },
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

    let taskInputContainer = document.createElement("div");
    taskInputContainer.id = "task-input-container";
    taskInputContainer.classList.add("container-fluid");

    let inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.value = taskObj.title;
    inputTitle.classList.add("form-control");

    let inputDescription = document.createElement("textarea");
    inputDescription.rows = "4";
    inputDescription.value = taskObj.description;
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
    inputProject.value = taskObj.project;

    let inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.value = taskObj.date;
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
    saveButtonRow.appendChild(saveButton);
    saveButtonContainer.appendChild(saveButtonRow);

    taskInputContainer.appendChild(createInputGroup("Title", inputTitle));
    taskInputContainer.appendChild(createInputGroup("Description", inputDescription));
    taskInputContainer.appendChild(createInputGroup("Project", inputProject));
    taskInputContainer.appendChild(createInputGroup("Due Date", inputDate));
    taskInputContainer.appendChild(saveButtonContainer);

    return taskInputContainer;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    drawToTasklist,
    drawToProjectSidebar,
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreator */ "./src/js/domCreator.js");


const clickNewTaskButtonTasklistElement = function (event) {
    event.target.remove();
    const taskInputElement = _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskInputElement();
    _domCreator__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(taskInputElement);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ clickNewTaskButtonTasklistElement });


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dDO0FBQ0E7QUFDRjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxJQUFJLG9EQUFXO0FBQ2YsSUFBSSxvREFBVztBQUNmLElBQUksb0RBQVc7QUFDZjtBQUNBLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0RBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvY29vcmRpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9ldmVudENvb3JkaW5hdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlLmpzXCI7XHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmNvbnN0IGNvb3JkaW5hdGVJbml0aWFsTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vVE9ETyAtLT4gTG9hZCBhbGxQcm9qZWN0cyBhbmQgYWxsVGFza3MgZnJvbSBTdG9yYWdlXHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsVGFza3MoKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IExhdGVyIG9uIHVzZSBhIGNvb2RpbmF0b3IgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBQcm9qZWN0c1NpZGViYXJcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IGRvbUNyZWF0b3IuY3JlYXRlUHJvamVjdChpLCBhbGxQcm9qZWN0c1tpXSk7XHJcbiAgICAgICAgZG9tQ3JlYXRvci5kcmF3VG9Qcm9qZWN0U2lkZWJhcihwcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICAgICAgY29uc3QgdGFza0VsZW0gPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tFbGVtZW50KGksIGFsbFRhc2tzW2ldKTtcclxuICAgICAgICBjb25zdCBkaXZpZGVyID0gZG9tQ3JlYXRvci5jcmVhdGVEaXZpZGVyRWxlbWVudCgpO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QoZGl2aWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvbUNyZWF0b3IuY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCgpO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChuZXdUYXNrQnV0dG9uKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvb3JkaW5hdGVJbml0aWFsTG9hZCxcclxufTtcclxuIiwiaW1wb3J0IGRhdGFTdHJ1Y3R1cmVyIGZyb20gXCIuL2RhdGFTdHJ1Y3R1cmVyXCI7XHJcblxyXG5jb25zdCBfbG9hZCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGNvbnN0IG9iaiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uob2JqKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IF9zYXZlID0gZnVuY3Rpb24gKGtleSwgZGF0YU9iaikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhT2JqKSk7XHJcbn07XHJcblxyXG5jb25zdCBfYXNzaWduVW5pcXVlSUQgPSBmdW5jdGlvbiAodHlwZSwgb2JqKSB7XHJcbiAgICBsZXQgYWxsUGFyYW1ldGVycyA9IF9nZXRBbGxQYXJhbWV0ZXJzKCk7XHJcbiAgICBpZiAoIWFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXkpIHtcclxuICAgICAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5ID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIWFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXlbdHlwZV0pIHtcclxuICAgICAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdID0gMDtcclxuICAgIH1cclxuICAgIGxldCBuZXdLZXkgPSBudWxsO1xyXG4gICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICBsZXQgbGFzdFVzZWRLZXkgPSBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdO1xyXG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWxsS2V5c1thbGxLZXlzLmxlbmd0aCAtIDFdKSkge1xyXG4gICAgICAgIGxhc3RVc2VkS2V5ID0gTWF0aC5tYXgocGFyc2VJbnQoYWxsS2V5c1thbGxLZXlzLmxlbmd0aCAtIDFdKSwgYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleVt0eXBlXSk7XHJcbiAgICB9XHJcbiAgICBuZXdLZXkgPSBsYXN0VXNlZEtleSArIDE7XHJcbiAgICBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdID0gbmV3S2V5O1xyXG4gICAgX3NldEFsbFBhcmFtZXRlcnMoYWxsUGFyYW1ldGVycyk7XHJcbiAgICByZXR1cm4gbmV3S2V5O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsVGFza3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gX2xvYWQoXCJ0YXNrc1wiKTtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFByb2plY3RzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIF9sb2FkKFwicHJvamVjdHNcIik7XHJcbn07XHJcblxyXG5jb25zdCBfZ2V0QWxsUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBfbG9hZChcInBhcmFtZXRlcnNcIik7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsVGFza3MgPSBmdW5jdGlvbiAoYWxsVGFza3MpIHtcclxuICAgIF9zYXZlKFwidGFza3NcIiwgYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgX3NldEFsbFByb2plY3RzID0gZnVuY3Rpb24gKGFsbFByb2plY3RzKSB7XHJcbiAgICBfc2F2ZShcInByb2plY3RzXCIsIGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKGFsbFBhcmFtZXRlcnMpIHtcclxuICAgIF9zYXZlKFwicGFyYW1ldGVyc1wiLCBhbGxQYXJhbWV0ZXJzKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZVByb2plY3RGcm9tVGFza3MgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgbGV0IGdlbmVyYWxQcm9qZWN0S2V5ID0gMTtcclxuICAgIGZvciAobGV0IGkgaW4gYWxsVGFza3MpIHtcclxuICAgICAgICBpZiAoYWxsVGFza3NbaV0ucHJvamVjdCA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgIGFsbFRhc2tzW2ldLnByb2plY3QgPSBnZW5lcmFsUHJvamVjdEtleTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1RPRE8gLS0+IFByb210IHRoZSBVc2VyIGluIGRvbUNyZWF0b3IgdGhhdCB0aGUgdGFza3Mgd2lsbCBiZSByZXNldHRlZCB0byB0aGUgXCJHZW5lcmFsXCIgcHJvamVjdFxyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAodGFza09iaikge1xyXG4gICAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgY29uc3QgaWQgPSBfYXNzaWduVW5pcXVlSUQoXCJ0YXNrc1wiLCBhbGxUYXNrcyk7XHJcbiAgICBhbGxUYXNrc1tpZF0gPSB0YXNrT2JqO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgY29uc3QgaWQgPSBfYXNzaWduVW5pcXVlSUQoXCJwcm9qZWN0c1wiLCBhbGxQcm9qZWN0cyk7XHJcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhhbGxQcm9qZWN0cykuc29tZSgoZWxlbSkgPT4gZWxlbSA9PT0gbmFtZSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgYWxyZWFkeSBleGlzdHNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsbFByb2plY3RzW2lkXSA9IG5hbWU7XHJcbiAgICAgICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gICAgZGVsZXRlIGFsbFRhc2tzW2tleV07XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgZGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGxldCBhbGxQcm9qZWN0cyA9IGdldEFsbFByb2plY3RzKCk7XHJcbiAgICByZW1vdmVQcm9qZWN0RnJvbVRhc2tzKGtleSk7XHJcbiAgICBkZWxldGUgYWxsUHJvamVjdHNba2V5XTtcclxuICAgIF9zZXRBbGxQcm9qZWN0cyhhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uIChrZXksIHRhc2tPYmopIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBhbGxUYXNrc1trZXldID0gdGFza09iajtcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0UHJvamVjdCA9IGZ1bmN0aW9uIChrZXksIHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgYWxsUHJvamVjdHNba2V5XSA9IHByb2plY3ROYW1lO1xyXG4gICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8vIF9sb2FkLFxyXG4gICAgLy8gX3NhdmUsXHJcbiAgICBnZXRBbGxUYXNrcyxcclxuICAgIGdldEFsbFByb2plY3RzLFxyXG4gICAgX3NldEFsbFRhc2tzLFxyXG4gICAgYWRkVGFzayxcclxuICAgIGFkZFByb2plY3QsXHJcbiAgICBkZWxldGVUYXNrLFxyXG4gICAgZGVsZXRlUHJvamVjdCxcclxuICAgIGVkaXRUYXNrLFxyXG4gICAgZWRpdFByb2plY3QsXHJcbn07XHJcbiIsIi8qKlxyXG5UT0RPOlxyXG5kcmF3TmV3VGFza01vZGFsXHJcblxyXG4qL1xyXG5cclxuaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCBldmVudENvb3JkaW5hdG9yIGZyb20gXCIuL2V2ZW50Q29vcmRpbmF0b3JcIjtcclxuXHJcbi8vQWRkIGRvbUVsZW1lbnQgdG8gdGhlIFRhc2tsaXN0XHJcbmNvbnN0IGRyYXdUb1Rhc2tsaXN0ID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG4vL2FkZCBkb21FbGVtZW50IHRvIHRoZSBQcm9qZWN0IFBhbmVsIGluIHRoZSBTaWRlYmFyXHJcbmNvbnN0IGRyYXdUb1Byb2plY3RTaWRlYmFyID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCBwcm9qZWN0c1NpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXNpZGViYXItY29udGFpbmVyXCIpO1xyXG4gICAgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59O1xyXG5cclxuLy9yZXR1cm5zIGEgZG9tRWxlbWVudCBiYXNlZCBvbiB0aGUgcHJvamVjdC1uYW1lIHN0cmluZyBnaXZlbiBhcyBwYXJhbWV0ZXJcclxuY29uc3QgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uIChrZXksIHByb2plY3QpIHtcclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgYnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIiwgXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGFkZCBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCByb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaWNvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTFcIik7XHJcblxyXG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhclwiLCBcImZhLXNtXCIsIFwiZmEtY2lyY2xlXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1hdXRvXCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3Q7XHJcblxyXG4gICAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Q29udGFpbmVyKTtcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChyb3dDb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxufTtcclxuXHJcbi8vcmV0dXJucyBhIGRvbUVsZW1lbnQgYmFzZWQgb24gdGhlIHRhc2sgb2JqZWN0IGdpdmVuIGFzIHBhcmFtZXRlclxyXG5jb25zdCBjcmVhdGVUYXNrRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHRhc2spIHtcclxuICAgIGxldCBtZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWVkaWFcIiwgXCJkLWZsZXhcIik7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7a2V5fWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IGtleTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNoZWNrLWlucHV0XCIsIFwiYWxpZ24tc2VsZi1zdGFydFwiLCBcIm10LTJcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lciB3aGVuIGNoZWNrYm94IGlzIGNoZWNrZWQgb3IgdW5jaGVja2VkXHJcblxyXG4gICAgbGV0IG1lZGlhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcIm1lZGlhLWJvZHlcIiwgXCJtcy0zXCIsIFwiZC1mbGV4XCIsIFwidy0xMDBcIiwgXCJqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiKTtcclxuXHJcbiAgICBsZXQgdGV4dEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuXHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7a2V5fWA7XHJcbiAgICBlZGl0QnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXIgd2hlbiBlZGl0LWJ1dHRvbiBpcyBjbGlja2VkXHJcblxyXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gQWRkIGRlbGV0ZSBidXR0b24sIHdpdGggZXZlbnQgbGlzdGVuZXIgaW5jbHVkaW5nIGFyZS15b3Utc3VyZS1tb2RhbFxyXG5cclxuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKHRleHRCb2R5KTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFCb2R5KTtcclxuXHJcbiAgICByZXR1cm4gbWVkaWFDb250YWluZXI7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBkaXZpc2VyIGRvbUVsZW1lbnQgZm9yIGJldHdlZW4gdGhlIGRpZmZlcmVudCB0YXNrc1xyXG5jb25zdCBjcmVhdGVEaXZpZGVyRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImJvcmRlci10b3BcIiwgXCJteS0yXCIpO1xyXG5cclxuICAgIHJldHVybiBkaXZpZGVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZG9tRWxlbWVudCBmb3IgdGhlIGJ1dHRvbiB0byBhZGQgYSBuZXcgdGFza3MgYXQgdGhlIGVuZCBvZiB0aGUgdGFza2xpc3RcclxuY29uc3QgY3JlYXRlTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIG5ldyB0YXNrXCI7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1ibG9ja1wiLCBcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50Q29vcmRpbmF0b3IuY2xpY2tOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50KGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdy5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbi8vY3JlYXRlIGRvbUVsZW1lbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgb3IgZWRpdCBhIG5ldyB0YXNrIGluIHRoZSB0YXNrbGlzdCBvciBiZSBkaXNwbGF5ZWQgaW4gYSBtb2RhbFxyXG5jb25zdCBjcmVhdGVUYXNrSW5wdXRFbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgdGFza09iaiA9IHsgdGl0bGU6IFwiXCIsIGRlc2NyaXB0aW9uOiBcIlwiLCBwcm9qZWN0OiBcIlwiLCBkYXRlOiBcIlwiLCBkb25lOiBmYWxzZSB9LFxyXG4gICAga2V5ID0gbnVsbFxyXG4pIHtcclxuICAgIGNvbnN0IGNyZWF0ZUlucHV0R3JvdXAgPSBmdW5jdGlvbiAobGFiZWwsIGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cFwiLCBcIm1iLTJcIik7XHJcblxyXG4gICAgICAgIGxldCBzcGFuTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBzcGFuTGFiZWwuY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwLXRleHRcIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XHJcblxyXG4gICAgICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoc3BhbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEdyb3VwO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGFza0lucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5pZCA9IFwidGFzay1pbnB1dC1jb250YWluZXJcIjtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXRUaXRsZS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBpbnB1dFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZTtcclxuICAgIGlucHV0VGl0bGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGlucHV0RGVzY3JpcHRpb24ucm93cyA9IFwiNFwiO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tPYmouZGVzY3JpcHRpb247XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBpbnB1dFByb2plY3QuY2xhc3NMaXN0LmFkZChcImZvcm0tc2VsZWN0XCIpO1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBhbGxQcm9qZWN0c1tpXTtcclxuICAgICAgICBvcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIGlucHV0UHJvamVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgfVxyXG4gICAgaW5wdXRQcm9qZWN0LnZhbHVlID0gdGFza09iai5wcm9qZWN0O1xyXG5cclxuICAgIGxldCBpbnB1dERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dERhdGUudHlwZSA9IFwiZGF0ZVwiO1xyXG4gICAgaW5wdXREYXRlLnZhbHVlID0gdGFza09iai5kYXRlO1xyXG4gICAgaW5wdXREYXRlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNhdmVCdXR0b25Sb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgc2F2ZUJ1dHRvbi52YWx1ZSA9IGtleTtcclxuICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1wcmltYXJ5XCIsIFwiYnRuLWJsb2NrXCIpO1xyXG4gICAgc2F2ZUJ1dHRvblJvdy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgIHNhdmVCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvblJvdyk7XHJcblxyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJUaXRsZVwiLCBpbnB1dFRpdGxlKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIkRlc2NyaXB0aW9uXCIsIGlucHV0RGVzY3JpcHRpb24pKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiUHJvamVjdFwiLCBpbnB1dFByb2plY3QpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRHVlIERhdGVcIiwgaW5wdXREYXRlKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbkNvbnRhaW5lcik7XHJcblxyXG4gICAgcmV0dXJuIHRhc2tJbnB1dENvbnRhaW5lcjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRyYXdUb1Rhc2tsaXN0LFxyXG4gICAgZHJhd1RvUHJvamVjdFNpZGViYXIsXHJcbiAgICBjcmVhdGVQcm9qZWN0LFxyXG4gICAgY3JlYXRlVGFza0VsZW1lbnQsXHJcbiAgICBjcmVhdGVOZXdUYXNrQnV0dG9uVGFza2xpc3RFbGVtZW50LFxyXG4gICAgY3JlYXRlRGl2aWRlckVsZW1lbnQsXHJcbiAgICBjcmVhdGVUYXNrSW5wdXRFbGVtZW50LFxyXG59O1xyXG4iLCJpbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yXCI7XHJcblxyXG5jb25zdCBjbGlja05ld1Rhc2tCdXR0b25UYXNrbGlzdEVsZW1lbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5yZW1vdmUoKTtcclxuICAgIGNvbnN0IHRhc2tJbnB1dEVsZW1lbnQgPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQoKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0lucHV0RWxlbWVudCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNsaWNrTmV3VGFza0J1dHRvblRhc2tsaXN0RWxlbWVudCB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBjb29yZGluYXRvciBmcm9tIFwiLi9jb29yZGluYXRvclwiO1xyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IGRvbUNyZWF0b3IgZnJvbSBcIi4vZG9tQ3JlYXRvclwiO1xyXG5cclxuLy90ZXN0aW5nXHJcbmNvbnN0IHRlc3REYXRhU2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiR2VuZXJhbFwiKTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJQcml2YXRlXCIpO1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIldvcmtcIik7XHJcblxyXG4gICAgZGF0YVN0b3JhZ2UuYWRkVGFzayh7XHJcbiAgICAgICAgdGl0bGU6IFwidGFzayBvbmVcIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIG9uZVwiLFxyXG4gICAgICAgIHByb2plY3Q6IDIsXHJcbiAgICAgICAgZGF0ZTogXCIyMDAwLTAxLTAxXCIsXHJcbiAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4gICAgICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0d29cIixcclxuICAgICAgICBwcm9qZWN0OiAzLFxyXG4gICAgICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4gICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyB0ZXN0RGF0YVNldHVwKCk7XHJcbi8vIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4vLyAgICAgdGl0bGU6IFwidGFzayB0aHJlZVwiLFxyXG4vLyAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0aHJlZVwiLFxyXG4vLyAgICAgcHJvamVjdDogXCJQcm9qZWN0IDJcIixcclxuLy8gICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4vLyAgICAgZG9uZTogZmFsc2UsXHJcbi8vIH0pO1xyXG4vLyBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiUHJvamVjdCAzXCIpO1xyXG4vLyBkYXRhU3RvcmFnZS5kZWxldGVUYXNrKDEpO1xyXG4vLyBkYXRhU3RvcmFnZS5kZWxldGVQcm9qZWN0KDIpO1xyXG4vLyBkYXRhU3RvcmFnZS5lZGl0UHJvamVjdCgyLCBcIlByaXZhdGVcIik7XHJcbi8vIGRhdGFTdG9yYWdlLmVkaXRUYXNrKDIsIHtcclxuLy8gICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbi8vICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIHR3byB3aXRoIHNvbWUgZWRpdFwiLFxyXG4vLyAgICAgcHJvamVjdDogMyxcclxuLy8gICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4vLyAgICAgZG9uZTogZmFsc2UsXHJcbi8vIH0pO1xyXG4vL2VuZCB0ZXN0aW5nXHJcblxyXG5jb29yZGluYXRvci5jb29yZGluYXRlSW5pdGlhbExvYWQoKTtcclxuXHJcbi8vdGVzdGluZ1xyXG4vLyBjb25zdCB0YXNrSW5wdXRFbGVtZW50ID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrSW5wdXRFbGVtZW50KCk7XHJcbi8vIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0lucHV0RWxlbWVudCk7XHJcbi8vZW5kIHRlc3RpbmdcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9