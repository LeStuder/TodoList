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
        let project = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createProject(allProjects[i]);
        _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToProjectSidebar(project);
    }

    for (let i in allTasks) {
        const taskElem = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskElement(allTasks[i]);
        const divider = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createDividerElement();
        _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToTasklist(taskElem);
        _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawToTasklist(divider);
    }

    const newTaskButton = _domCreator_js__WEBPACK_IMPORTED_MODULE_1__["default"].createNewTaskButtonElement();
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
    allProjects.push(name);
    _setAllProjects(allProjects);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    // _load,
    _save,
    getAllTasks,
    getAllProjects,
    addTask,
    addProject,
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
/**

drawNewTaskModal

*/



const drawToTasklist = function (domElement) {
    let tasksContainer = document.getElementById("tasks-container");
    tasksContainer.appendChild(domElement);
};

const drawToProjectSidebar = function (domElement) {
    let projectsSidebarContainer = document.getElementById("projects-sidebar-container");
    projectsSidebarContainer.appendChild(domElement);
};

const createProject = function (project) {
    let button = document.createElement("button");
    button.type = "button";
    button.value = project;
    button.classList.add("btn", "btn-light", "sidebar-btn");

    //TODO --> event listener

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

const createTaskElement = function (task) {
    let mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media", "d-flex");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${task.id}`;
    checkbox.value = task.id; //TODO --> make sure to use something else than task.id
    checkbox.classList.add("form-check-input", "align-self-start", "mt-2");

    //TODO --> event listener

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
    editButton.id = `edit-button-${task.id}`;
    editButton.value = task.id;
    editButton.classList.add("btn", "btn-light");

    //TODO --> event listener

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

const createDividerElement = function () {
    let divider = document.createElement("div");
    divider.classList.add("border-top", "my-2");

    return divider;
};

const createNewTaskButtonElement = function () {
    let tasksContainer = document.getElementById("tasks-container");

    let container = document.createElement("div");
    container.classList.add("container-fluid");

    let row = document.createElement("div");
    row.classList.add("row");

    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add new task";
    button.classList.add("btn", "btn-block", "btn-light");

    row.appendChild(button);
    container.appendChild(row);

    return container;
};

const createTaskInputElement = function (
    taskObj = { title: "", description: "", project: "", date: "", id: Math.random(), done: false }
    //TODO --> replace Math.random with incrementer-function
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
    let projectsArr = _dataStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getAllProjects(); //TODO --> Use a getter for the projects arr
    for (let i in projectsArr) {
        let option = document.createElement("option");
        option.textContent = projectsArr[i];
        option.value = projectsArr[i];
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
    createNewTaskButtonElement,
    createDividerElement,
    createTaskInputElement,
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
    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"]._save("tasks", {
        1: {
            title: "task one",
            description: "description of task one",
            project: "Project 1",
            date: "2000-01-01",
            done: false,
        },
        2: {
            title: "task two",
            description: "description of task two",
            project: "Project 2",
            date: "2000-03-03",
            done: false,
        },
    });

    _dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"]._save("projects", ["Private", "Work"]);
};

testDataSetup();
_dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addTask({
    title: "task three",
    description: "description of task three",
    project: "Project 2",
    date: "2000-03-03",
    done: false,
});
_dataStorage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("Project 3");
// const test = dataStorage.getAllTasks();
//end testing

_coordinator__WEBPACK_IMPORTED_MODULE_0__["default"].coordinateInitialLoad();

//testing
// const taskInputElement = domCreator.createTaskInputElement();
// domCreator.drawToTasklist(taskInputElement);
//end testing

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0Y7QUFDekM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVEQUFXO0FBQ2pDLG1CQUFtQix1REFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0RBQVU7QUFDaEMsUUFBUSxzREFBVTtBQUNsQjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQVU7QUFDbkMsd0JBQXdCLHNEQUFVO0FBQ2xDLFFBQVEsc0RBQVU7QUFDbEIsUUFBUSxzREFBVTtBQUNsQjtBQUNBO0FBQ0EsMEJBQTBCLHNEQUFVO0FBQ3BDLElBQUksc0RBQVU7QUFDZDtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0Qyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0RBQVcsbUJBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7O1VDek1GO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QztBQUNBO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQSxvREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsb0RBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxvREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9jb29yZGluYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9kYXRhU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9kb21DcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRhdGFTdG9yYWdlIGZyb20gXCIuL2RhdGFTdG9yYWdlLmpzXCI7XHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmNvbnN0IGNvb3JkaW5hdGVJbml0aWFsTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vVE9ETyAtLT4gTG9hZCBhbGxQcm9qZWN0cyBhbmQgYWxsVGFza3MgZnJvbSBTdG9yYWdlXHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsVGFza3MoKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IExhdGVyIG9uIHVzZSBhIGNvb2RpbmF0b3IgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBQcm9qZWN0c1NpZGViYXJcclxuICAgIGZvciAobGV0IGkgaW4gYWxsUHJvamVjdHMpIHtcclxuICAgICAgICBsZXQgcHJvamVjdCA9IGRvbUNyZWF0b3IuY3JlYXRlUHJvamVjdChhbGxQcm9qZWN0c1tpXSk7XHJcbiAgICAgICAgZG9tQ3JlYXRvci5kcmF3VG9Qcm9qZWN0U2lkZWJhcihwcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICAgICAgY29uc3QgdGFza0VsZW0gPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tFbGVtZW50KGFsbFRhc2tzW2ldKTtcclxuICAgICAgICBjb25zdCBkaXZpZGVyID0gZG9tQ3JlYXRvci5jcmVhdGVEaXZpZGVyRWxlbWVudCgpO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QoZGl2aWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvbUNyZWF0b3IuY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQoKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QobmV3VGFza0J1dHRvbik7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb29yZGluYXRlSW5pdGlhbExvYWQsXHJcbn07XHJcbiIsIi8qKlxyXG5cclxuYWRkVGFza1xyXG4gICAgX2Fzc2lnbklEXHJcblxyXG5hZGRQcm9qZWN0XHJcblxyXG5kZWxldGVUYXNrXHJcblxyXG5kZWxldGVQcm9qZWN0XHJcblxyXG5lZGl0VGFza1xyXG5cclxuZWRpdFByb2plY3RcclxuXHJcblxyXG5cclxuICovXHJcblxyXG5jb25zdCBfbG9hZCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG59O1xyXG5cclxuY29uc3QgX3NhdmUgPSBmdW5jdGlvbiAoa2V5LCBkYXRhT2JqKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGFPYmopKTtcclxufTtcclxuXHJcbmNvbnN0IGdldEFsbFRhc2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYWxsVGFza3MgPSBfbG9hZChcInRhc2tzXCIpO1xyXG5cclxuICAgIGlmIChhbGxUYXNrcyA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYWxsVGFza3MpO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBnZXRBbGxQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFsbFByb2plY3RzID0gX2xvYWQoXCJwcm9qZWN0c1wiKTtcclxuXHJcbiAgICBpZiAoYWxsUHJvamVjdHMgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGFsbFByb2plY3RzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxUYXNrcyA9IGZ1bmN0aW9uIChhbGxUYXNrcykge1xyXG4gICAgX3NhdmUoXCJ0YXNrc1wiLCBhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsUHJvamVjdHMgPSBmdW5jdGlvbiAoYWxsUHJvamVjdHMpIHtcclxuICAgIF9zYXZlKFwicHJvamVjdHNcIiwgYWxsUHJvamVjdHMpO1xyXG59O1xyXG5cclxuY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uICh0YXNrT2JqKSB7XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBjb25zdCBfYXNzaWduSUQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgYWxsVGFza0tleXMgPSBPYmplY3Qua2V5cyhhbGxUYXNrcyk7XHJcbiAgICAgICAgbGV0IGxhc3RVc2VkS2V5ID0gcGFyc2VJbnQoYWxsVGFza0tleXNbYWxsVGFza0tleXMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIHJldHVybiBsYXN0VXNlZEtleSArIDE7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGlkID0gX2Fzc2lnbklEKCk7XHJcbiAgICBhbGxUYXNrc1tpZF0gPSB0YXNrT2JqO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBnZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgYWxsUHJvamVjdHMucHVzaChuYW1lKTtcclxuICAgIF9zZXRBbGxQcm9qZWN0cyhhbGxQcm9qZWN0cyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLyBfbG9hZCxcclxuICAgIF9zYXZlLFxyXG4gICAgZ2V0QWxsVGFza3MsXHJcbiAgICBnZXRBbGxQcm9qZWN0cyxcclxuICAgIGFkZFRhc2ssXHJcbiAgICBhZGRQcm9qZWN0LFxyXG59O1xyXG4iLCIvKipcclxuXHJcbmRyYXdOZXdUYXNrTW9kYWxcclxuXHJcbiovXHJcblxyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IGRyYXdUb1Rhc2tsaXN0ID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBkcmF3VG9Qcm9qZWN0U2lkZWJhciA9IGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XHJcbiAgICBsZXQgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1zaWRlYmFyLWNvbnRhaW5lclwiKTtcclxuICAgIHByb2plY3RzU2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udmFsdWUgPSBwcm9qZWN0O1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIiwgXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGV2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IHJvd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpY29uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtMVwiKTtcclxuXHJcbiAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFyXCIsIFwiZmEtc21cIiwgXCJmYS1jaXJjbGVcIik7XHJcblxyXG4gICAgbGV0IHRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLWF1dG9cIik7XHJcbiAgICB0ZXh0Q29udGFpbmVyLnRleHRDb250ZW50ID0gcHJvamVjdDtcclxuXHJcbiAgICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xyXG4gICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKHRleHRDb250YWluZXIpO1xyXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHJvd0NvbnRhaW5lcik7XHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlVGFza0VsZW1lbnQgPSBmdW5jdGlvbiAodGFzaykge1xyXG4gICAgbGV0IG1lZGlhQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtZWRpYVwiLCBcImQtZmxleFwiKTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0YXNrLmlkfWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IHRhc2suaWQ7IC8vVE9ETyAtLT4gbWFrZSBzdXJlIHRvIHVzZSBzb21ldGhpbmcgZWxzZSB0aGFuIHRhc2suaWRcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNoZWNrLWlucHV0XCIsIFwiYWxpZ24tc2VsZi1zdGFydFwiLCBcIm10LTJcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCBtZWRpYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpYS1ib2R5XCIsIFwibXMtM1wiLCBcImQtZmxleFwiLCBcInctMTAwXCIsIFwianVzdGlmeS1jb250ZW50LWJldHdlZW5cIik7XHJcblxyXG4gICAgbGV0IHRleHRCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBlZGl0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke3Rhc2suaWR9YDtcclxuICAgIGVkaXRCdXR0b24udmFsdWUgPSB0YXNrLmlkO1xyXG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXJcclxuXHJcbiAgICBsZXQgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBBZGQgZGVsZXRlIGJ1dHRvbiwgd2l0aCBldmVudCBsaXN0ZW5lciBpbmNsdWRpbmcgYXJlLXlvdS1zdXJlLW1vZGFsXHJcblxyXG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQodGV4dEJvZHkpO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUJvZHkpO1xyXG5cclxuICAgIHJldHVybiBtZWRpYUNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZURpdmlkZXJFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGRpdmlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKFwiYm9yZGVyLXRvcFwiLCBcIm15LTJcIik7XHJcblxyXG4gICAgcmV0dXJuIGRpdmlkZXI7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVOZXdUYXNrQnV0dG9uRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIG5ldyB0YXNrXCI7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1ibG9ja1wiLCBcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICByb3cuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrSW5wdXRFbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgdGFza09iaiA9IHsgdGl0bGU6IFwiXCIsIGRlc2NyaXB0aW9uOiBcIlwiLCBwcm9qZWN0OiBcIlwiLCBkYXRlOiBcIlwiLCBpZDogTWF0aC5yYW5kb20oKSwgZG9uZTogZmFsc2UgfVxyXG4gICAgLy9UT0RPIC0tPiByZXBsYWNlIE1hdGgucmFuZG9tIHdpdGggaW5jcmVtZW50ZXItZnVuY3Rpb25cclxuKSB7XHJcbiAgICBjb25zdCBjcmVhdGVJbnB1dEdyb3VwID0gZnVuY3Rpb24gKGxhYmVsLCBpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgaW5wdXRHcm91cC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXBcIiwgXCJtYi0yXCIpO1xyXG5cclxuICAgICAgICBsZXQgc3BhbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cC10ZXh0XCIpO1xyXG4gICAgICAgIHNwYW5MYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsO1xyXG5cclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKHNwYW5MYWJlbCk7XHJcbiAgICAgICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXRHcm91cDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRhc2tJbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuaWQgPSBcInRhc2staW5wdXQtY29udGFpbmVyXCI7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0VGl0bGUudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgaW5wdXRUaXRsZS52YWx1ZSA9IHRhc2tPYmoudGl0bGU7XHJcbiAgICBpbnB1dFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IGlucHV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLnJvd3MgPSBcIjRcIjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24udmFsdWUgPSB0YXNrT2JqLmRlc2NyaXB0aW9uO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dFByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gICAgaW5wdXRQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJmb3JtLXNlbGVjdFwiKTtcclxuICAgIGxldCBwcm9qZWN0c0FyciA9IGRhdGFTdG9yYWdlLmdldEFsbFByb2plY3RzKCk7IC8vVE9ETyAtLT4gVXNlIGEgZ2V0dGVyIGZvciB0aGUgcHJvamVjdHMgYXJyXHJcbiAgICBmb3IgKGxldCBpIGluIHByb2plY3RzQXJyKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdHNBcnJbaV07XHJcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdHNBcnJbaV07XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBpbnB1dFByb2plY3QudmFsdWUgPSB0YXNrT2JqLnByb2plY3Q7XHJcblxyXG4gICAgbGV0IGlucHV0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0RGF0ZS50eXBlID0gXCJkYXRlXCI7XHJcbiAgICBpbnB1dERhdGUudmFsdWUgPSB0YXNrT2JqLmRhdGU7XHJcbiAgICBpbnB1dERhdGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzYXZlQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Sb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvblJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tcHJpbWFyeVwiLCBcImJ0bi1ibG9ja1wiKTtcclxuICAgIHNhdmVCdXR0b25Sb3cuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbik7XHJcbiAgICBzYXZlQnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNhdmVCdXR0b25Sb3cpO1xyXG5cclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiVGl0bGVcIiwgaW5wdXRUaXRsZSkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJEZXNjcmlwdGlvblwiLCBpbnB1dERlc2NyaXB0aW9uKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIlByb2plY3RcIiwgaW5wdXRQcm9qZWN0KSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIkR1ZSBEYXRlXCIsIGlucHV0RGF0ZSkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNhdmVCdXR0b25Db250YWluZXIpO1xyXG5cclxuICAgIHJldHVybiB0YXNrSW5wdXRDb250YWluZXI7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3VG9UYXNrbGlzdCxcclxuICAgIGRyYXdUb1Byb2plY3RTaWRlYmFyLFxyXG4gICAgY3JlYXRlUHJvamVjdCxcclxuICAgIGNyZWF0ZVRhc2tFbGVtZW50LFxyXG4gICAgY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQsXHJcbiAgICBjcmVhdGVEaXZpZGVyRWxlbWVudCxcclxuICAgIGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBjb29yZGluYXRvciBmcm9tIFwiLi9jb29yZGluYXRvclwiO1xyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuXHJcbi8vdGVzdGluZ1xyXG5jb25zdCB0ZXN0RGF0YVNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZGF0YVN0b3JhZ2UuX3NhdmUoXCJ0YXNrc1wiLCB7XHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJ0YXNrIG9uZVwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIG9uZVwiLFxyXG4gICAgICAgICAgICBwcm9qZWN0OiBcIlByb2plY3QgMVwiLFxyXG4gICAgICAgICAgICBkYXRlOiBcIjIwMDAtMDEtMDFcIixcclxuICAgICAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uIG9mIHRhc2sgdHdvXCIsXHJcbiAgICAgICAgICAgIHByb2plY3Q6IFwiUHJvamVjdCAyXCIsXHJcbiAgICAgICAgICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4gICAgICAgICAgICBkb25lOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YVN0b3JhZ2UuX3NhdmUoXCJwcm9qZWN0c1wiLCBbXCJQcml2YXRlXCIsIFwiV29ya1wiXSk7XHJcbn07XHJcblxyXG50ZXN0RGF0YVNldHVwKCk7XHJcbmRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4gICAgdGl0bGU6IFwidGFzayB0aHJlZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0aHJlZVwiLFxyXG4gICAgcHJvamVjdDogXCJQcm9qZWN0IDJcIixcclxuICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4gICAgZG9uZTogZmFsc2UsXHJcbn0pO1xyXG5kYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiUHJvamVjdCAzXCIpO1xyXG4vLyBjb25zdCB0ZXN0ID0gZGF0YVN0b3JhZ2UuZ2V0QWxsVGFza3MoKTtcclxuLy9lbmQgdGVzdGluZ1xyXG5cclxuY29vcmRpbmF0b3IuY29vcmRpbmF0ZUluaXRpYWxMb2FkKCk7XHJcblxyXG4vL3Rlc3RpbmdcclxuLy8gY29uc3QgdGFza0lucHV0RWxlbWVudCA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0lucHV0RWxlbWVudCgpO1xyXG4vLyBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tJbnB1dEVsZW1lbnQpO1xyXG4vL2VuZCB0ZXN0aW5nXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==