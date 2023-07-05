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
const taskInputElement = _domCreator__WEBPACK_IMPORTED_MODULE_2__["default"].createTaskInputElement();
_domCreator__WEBPACK_IMPORTED_MODULE_2__["default"].drawToTasklist(taskInputElement);
//end testing

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0Y7QUFDekM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVEQUFXO0FBQ2pDLG1CQUFtQix1REFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0RBQVU7QUFDaEMsUUFBUSxzREFBVTtBQUNsQjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQVU7QUFDbkMsd0JBQXdCLHNEQUFVO0FBQ2xDLFFBQVEsc0RBQVU7QUFDbEIsUUFBUSxzREFBVTtBQUNsQjtBQUNBO0FBQ0EsMEJBQTBCLHNEQUFVO0FBQ3BDLElBQUksc0RBQVU7QUFDZDtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0I0QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLElBQUk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxJQUFJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQWdFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0RBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ2pORjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QztBQUNBO0FBQ0Y7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvREFBVztBQUNmLElBQUksb0RBQVc7QUFDZixJQUFJLG9EQUFXO0FBQ2Y7QUFDQSxJQUFJLG9EQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJLG9EQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLG9EQUFXO0FBQ1g7QUFDQTtBQUNBLHlCQUF5QixtREFBVTtBQUNuQyxtREFBVTtBQUNWIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvY29vcmRpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZGF0YVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYXRhU3RvcmFnZSBmcm9tIFwiLi9kYXRhU3RvcmFnZS5qc1wiO1xyXG5pbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yLmpzXCI7XHJcblxyXG5jb25zdCBjb29yZGluYXRlSW5pdGlhbExvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL1RPRE8gLS0+IExvYWQgYWxsUHJvamVjdHMgYW5kIGFsbFRhc2tzIGZyb20gU3RvcmFnZVxyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZGF0YVN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGxldCBhbGxUYXNrcyA9IGRhdGFTdG9yYWdlLmdldEFsbFRhc2tzKCk7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBMYXRlciBvbiB1c2UgYSBjb29kaW5hdG9yIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgUHJvamVjdHNTaWRlYmFyXHJcbiAgICBmb3IgKGxldCBpIGluIGFsbFByb2plY3RzKSB7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBkb21DcmVhdG9yLmNyZWF0ZVByb2plY3QoaSwgYWxsUHJvamVjdHNbaV0pO1xyXG4gICAgICAgIGRvbUNyZWF0b3IuZHJhd1RvUHJvamVjdFNpZGViYXIocHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxUYXNrcykge1xyXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrRWxlbWVudChpLCBhbGxUYXNrc1tpXSk7XHJcbiAgICAgICAgY29uc3QgZGl2aWRlciA9IGRvbUNyZWF0b3IuY3JlYXRlRGl2aWRlckVsZW1lbnQoKTtcclxuICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tFbGVtKTtcclxuICAgICAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KGRpdmlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb21DcmVhdG9yLmNyZWF0ZU5ld1Rhc2tCdXR0b25FbGVtZW50KCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KG5ld1Rhc2tCdXR0b24pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29vcmRpbmF0ZUluaXRpYWxMb2FkLFxyXG59O1xyXG4iLCJpbXBvcnQgZGF0YVN0cnVjdHVyZXIgZnJvbSBcIi4vZGF0YVN0cnVjdHVyZXJcIjtcclxuXHJcbmNvbnN0IF9sb2FkID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgY29uc3Qgb2JqID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuXHJcbiAgICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShvYmopO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgX3NhdmUgPSBmdW5jdGlvbiAoa2V5LCBkYXRhT2JqKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGFPYmopKTtcclxufTtcclxuXHJcbmNvbnN0IF9hc3NpZ25VbmlxdWVJRCA9IGZ1bmN0aW9uICh0eXBlLCBvYmopIHtcclxuICAgIGxldCBhbGxQYXJhbWV0ZXJzID0gX2dldEFsbFBhcmFtZXRlcnMoKTtcclxuICAgIGlmICghYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleSkge1xyXG4gICAgICAgIGFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXkgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICghYWxsUGFyYW1ldGVycy5sYXN0VXNlZEtleVt0eXBlXSkge1xyXG4gICAgICAgIGFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXlbdHlwZV0gPSAwO1xyXG4gICAgfVxyXG4gICAgbGV0IG5ld0tleSA9IG51bGw7XHJcbiAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgIGxldCBsYXN0VXNlZEtleSA9IGFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXlbdHlwZV07XHJcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhbGxLZXlzW2FsbEtleXMubGVuZ3RoIC0gMV0pKSB7XHJcbiAgICAgICAgbGFzdFVzZWRLZXkgPSBNYXRoLm1heChwYXJzZUludChhbGxLZXlzW2FsbEtleXMubGVuZ3RoIC0gMV0pLCBhbGxQYXJhbWV0ZXJzLmxhc3RVc2VkS2V5W3R5cGVdKTtcclxuICAgIH1cclxuICAgIG5ld0tleSA9IGxhc3RVc2VkS2V5ICsgMTtcclxuICAgIGFsbFBhcmFtZXRlcnMubGFzdFVzZWRLZXlbdHlwZV0gPSBuZXdLZXk7XHJcbiAgICBfc2V0QWxsUGFyYW1ldGVycyhhbGxQYXJhbWV0ZXJzKTtcclxuICAgIHJldHVybiBuZXdLZXk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRBbGxUYXNrcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBfbG9hZChcInRhc2tzXCIpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0QWxsUHJvamVjdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gX2xvYWQoXCJwcm9qZWN0c1wiKTtcclxufTtcclxuXHJcbmNvbnN0IF9nZXRBbGxQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIF9sb2FkKFwicGFyYW1ldGVyc1wiKTtcclxufTtcclxuXHJcbmNvbnN0IF9zZXRBbGxUYXNrcyA9IGZ1bmN0aW9uIChhbGxUYXNrcykge1xyXG4gICAgX3NhdmUoXCJ0YXNrc1wiLCBhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBfc2V0QWxsUHJvamVjdHMgPSBmdW5jdGlvbiAoYWxsUHJvamVjdHMpIHtcclxuICAgIF9zYXZlKFwicHJvamVjdHNcIiwgYWxsUHJvamVjdHMpO1xyXG59O1xyXG5cclxuY29uc3QgX3NldEFsbFBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoYWxsUGFyYW1ldGVycykge1xyXG4gICAgX3NhdmUoXCJwYXJhbWV0ZXJzXCIsIGFsbFBhcmFtZXRlcnMpO1xyXG59O1xyXG5cclxuY29uc3QgcmVtb3ZlUHJvamVjdEZyb21UYXNrcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBsZXQgZ2VuZXJhbFByb2plY3RLZXkgPSAxO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxUYXNrcykge1xyXG4gICAgICAgIGlmIChhbGxUYXNrc1tpXS5wcm9qZWN0ID09PSBrZXkpIHtcclxuICAgICAgICAgICAgYWxsVGFza3NbaV0ucHJvamVjdCA9IGdlbmVyYWxQcm9qZWN0S2V5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vVE9ETyAtLT4gUHJvbXQgdGhlIFVzZXIgaW4gZG9tQ3JlYXRvciB0aGF0IHRoZSB0YXNrcyB3aWxsIGJlIHJlc2V0dGVkIHRvIHRoZSBcIkdlbmVyYWxcIiBwcm9qZWN0XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uICh0YXNrT2JqKSB7XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBjb25zdCBpZCA9IF9hc3NpZ25VbmlxdWVJRChcInRhc2tzXCIsIGFsbFRhc2tzKTtcclxuICAgIGFsbFRhc2tzW2lkXSA9IHRhc2tPYmo7XHJcbiAgICBfc2V0QWxsVGFza3MoYWxsVGFza3MpO1xyXG59O1xyXG5cclxuY29uc3QgYWRkUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IGdldEFsbFByb2plY3RzKCk7XHJcbiAgICBjb25zdCBpZCA9IF9hc3NpZ25VbmlxdWVJRChcInByb2plY3RzXCIsIGFsbFByb2plY3RzKTtcclxuICAgIGlmIChPYmplY3QudmFsdWVzKGFsbFByb2plY3RzKS5zb21lKChlbGVtKSA9PiBlbGVtID09PSBuYW1lKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxsUHJvamVjdHNbaWRdID0gbmFtZTtcclxuICAgICAgICBfc2V0QWxsUHJvamVjdHMoYWxsUHJvamVjdHMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICBkZWxldGUgYWxsVGFza3Nba2V5XTtcclxuICAgIF9zZXRBbGxUYXNrcyhhbGxUYXNrcyk7XHJcbn07XHJcblxyXG5jb25zdCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgbGV0IGFsbFByb2plY3RzID0gZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIHJlbW92ZVByb2plY3RGcm9tVGFza3Moa2V5KTtcclxuICAgIGRlbGV0ZSBhbGxQcm9qZWN0c1trZXldO1xyXG4gICAgX3NldEFsbFByb2plY3RzKGFsbFByb2plY3RzKTtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24gKGtleSwgdGFza09iaikge1xyXG4gICAgbGV0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICAgIGFsbFRhc2tzW2tleV0gPSB0YXNrT2JqO1xyXG4gICAgX3NldEFsbFRhc2tzKGFsbFRhc2tzKTtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRQcm9qZWN0ID0gZnVuY3Rpb24gKGtleSwgcHJvamVjdE5hbWUpIHtcclxuICAgIGxldCBhbGxQcm9qZWN0cyA9IGdldEFsbFByb2plY3RzKCk7XHJcbiAgICBhbGxQcm9qZWN0c1trZXldID0gcHJvamVjdE5hbWU7XHJcbiAgICBfc2V0QWxsUHJvamVjdHMoYWxsUHJvamVjdHMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLy8gX2xvYWQsXHJcbiAgICAvLyBfc2F2ZSxcclxuICAgIGdldEFsbFRhc2tzLFxyXG4gICAgZ2V0QWxsUHJvamVjdHMsXHJcbiAgICBfc2V0QWxsVGFza3MsXHJcbiAgICBhZGRUYXNrLFxyXG4gICAgYWRkUHJvamVjdCxcclxuICAgIGRlbGV0ZVRhc2ssXHJcbiAgICBkZWxldGVQcm9qZWN0LFxyXG4gICAgZWRpdFRhc2ssXHJcbiAgICBlZGl0UHJvamVjdCxcclxufTtcclxuIiwiLyoqXHJcblRPRE86XHJcbmRyYXdOZXdUYXNrTW9kYWxcclxuXHJcbiovXHJcblxyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuXHJcbi8vQWRkIGRvbUVsZW1lbnQgdG8gdGhlIFRhc2tsaXN0XHJcbmNvbnN0IGRyYXdUb1Rhc2tsaXN0ID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG4vL2FkZCBkb21FbGVtZW50IHRvIHRoZSBQcm9qZWN0IFBhbmVsIGluIHRoZSBTaWRlYmFyXHJcbmNvbnN0IGRyYXdUb1Byb2plY3RTaWRlYmFyID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCBwcm9qZWN0c1NpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXNpZGViYXItY29udGFpbmVyXCIpO1xyXG4gICAgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59O1xyXG5cclxuLy9yZXR1cm5zIGEgZG9tRWxlbWVudCBiYXNlZCBvbiB0aGUgcHJvamVjdC1uYW1lIHN0cmluZyBnaXZlbiBhcyBwYXJhbWV0ZXJcclxuY29uc3QgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uIChrZXksIHByb2plY3QpIHtcclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgYnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIiwgXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGFkZCBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCByb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaWNvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTFcIik7XHJcblxyXG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhclwiLCBcImZhLXNtXCIsIFwiZmEtY2lyY2xlXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1hdXRvXCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3Q7XHJcblxyXG4gICAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Q29udGFpbmVyKTtcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChyb3dDb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxufTtcclxuXHJcbi8vcmV0dXJucyBhIGRvbUVsZW1lbnQgYmFzZWQgb24gdGhlIHRhc2sgb2JqZWN0IGdpdmVuIGFzIHBhcmFtZXRlclxyXG5jb25zdCBjcmVhdGVUYXNrRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHRhc2spIHtcclxuICAgIGxldCBtZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWVkaWFcIiwgXCJkLWZsZXhcIik7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7a2V5fWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IGtleTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNoZWNrLWlucHV0XCIsIFwiYWxpZ24tc2VsZi1zdGFydFwiLCBcIm10LTJcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lciB3aGVuIGNoZWNrYm94IGlzIGNoZWNrZWQgb3IgdW5jaGVja2VkXHJcblxyXG4gICAgbGV0IG1lZGlhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcIm1lZGlhLWJvZHlcIiwgXCJtcy0zXCIsIFwiZC1mbGV4XCIsIFwidy0xMDBcIiwgXCJqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiKTtcclxuXHJcbiAgICBsZXQgdGV4dEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuXHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7a2V5fWA7XHJcbiAgICBlZGl0QnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXIgd2hlbiBlZGl0LWJ1dHRvbiBpcyBjbGlja2VkXHJcblxyXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gQWRkIGRlbGV0ZSBidXR0b24sIHdpdGggZXZlbnQgbGlzdGVuZXIgaW5jbHVkaW5nIGFyZS15b3Utc3VyZS1tb2RhbFxyXG5cclxuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKHRleHRCb2R5KTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFCb2R5KTtcclxuXHJcbiAgICByZXR1cm4gbWVkaWFDb250YWluZXI7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBkaXZpc2VyIGRvbUVsZW1lbnQgZm9yIGJldHdlZW4gdGhlIGRpZmZlcmVudCB0YXNrc1xyXG5jb25zdCBjcmVhdGVEaXZpZGVyRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImJvcmRlci10b3BcIiwgXCJteS0yXCIpO1xyXG5cclxuICAgIHJldHVybiBkaXZpZGVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZG9tRWxlbWVudCBmb3IgdGhlIGJ1dHRvbiB0byBhZGQgYSBuZXcgdGFza3MgYXQgdGhlIGVuZCBvZiB0aGUgdGFza2xpc3RcclxuY29uc3QgY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBuZXcgdGFza1wiO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tYmxvY2tcIiwgXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgcm93LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuLy9jcmVhdGUgZG9tRWxlbWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBvciBlZGl0IGEgbmV3IHRhc2sgaW4gdGhlIHRhc2tsaXN0IG9yIGJlIGRpc3BsYXllZCBpbiBhIG1vZGFsXHJcbmNvbnN0IGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQgPSBmdW5jdGlvbiAoXHJcbiAgICB0YXNrT2JqID0geyB0aXRsZTogXCJcIiwgZGVzY3JpcHRpb246IFwiXCIsIHByb2plY3Q6IFwiXCIsIGRhdGU6IFwiXCIsIGRvbmU6IGZhbHNlIH0sXHJcbiAgICBrZXkgPSBudWxsXHJcbikge1xyXG4gICAgY29uc3QgY3JlYXRlSW5wdXRHcm91cCA9IGZ1bmN0aW9uIChsYWJlbCwgaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGlucHV0R3JvdXAuY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwXCIsIFwibWItMlwiKTtcclxuXHJcbiAgICAgICAgbGV0IHNwYW5MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHNwYW5MYWJlbC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXAtdGV4dFwiKTtcclxuICAgICAgICBzcGFuTGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbDtcclxuXHJcbiAgICAgICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChzcGFuTGFiZWwpO1xyXG4gICAgICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0R3JvdXA7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0YXNrSW5wdXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmlkID0gXCJ0YXNrLWlucHV0LWNvbnRhaW5lclwiO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IGlucHV0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dFRpdGxlLnR5cGUgPSBcInRleHRcIjtcclxuICAgIGlucHV0VGl0bGUudmFsdWUgPSB0YXNrT2JqLnRpdGxlO1xyXG4gICAgaW5wdXRUaXRsZS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi5yb3dzID0gXCI0XCI7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLnZhbHVlID0gdGFza09iai5kZXNjcmlwdGlvbjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIGlucHV0UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1zZWxlY3RcIik7XHJcbiAgICBsZXQgYWxsUHJvamVjdHMgPSBkYXRhU3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhbGxQcm9qZWN0cykge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGFsbFByb2plY3RzW2ldO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBpbnB1dFByb2plY3QudmFsdWUgPSB0YXNrT2JqLnByb2plY3Q7XHJcblxyXG4gICAgbGV0IGlucHV0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0RGF0ZS50eXBlID0gXCJkYXRlXCI7XHJcbiAgICBpbnB1dERhdGUudmFsdWUgPSB0YXNrT2JqLmRhdGU7XHJcbiAgICBpbnB1dERhdGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzYXZlQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Sb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvblJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICBzYXZlQnV0dG9uLnZhbHVlID0ga2V5O1xyXG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLXByaW1hcnlcIiwgXCJidG4tYmxvY2tcIik7XHJcbiAgICBzYXZlQnV0dG9uUm93LmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uUm93KTtcclxuXHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIlRpdGxlXCIsIGlucHV0VGl0bGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRGVzY3JpcHRpb25cIiwgaW5wdXREZXNjcmlwdGlvbikpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJQcm9qZWN0XCIsIGlucHV0UHJvamVjdCkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJEdWUgRGF0ZVwiLCBpbnB1dERhdGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uQ29udGFpbmVyKTtcclxuXHJcbiAgICByZXR1cm4gdGFza0lucHV0Q29udGFpbmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZHJhd1RvVGFza2xpc3QsXHJcbiAgICBkcmF3VG9Qcm9qZWN0U2lkZWJhcixcclxuICAgIGNyZWF0ZVByb2plY3QsXHJcbiAgICBjcmVhdGVUYXNrRWxlbWVudCxcclxuICAgIGNyZWF0ZU5ld1Rhc2tCdXR0b25FbGVtZW50LFxyXG4gICAgY3JlYXRlRGl2aWRlckVsZW1lbnQsXHJcbiAgICBjcmVhdGVUYXNrSW5wdXRFbGVtZW50LFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBjb29yZGluYXRvciBmcm9tIFwiLi9jb29yZGluYXRvclwiO1xyXG5pbXBvcnQgZGF0YVN0b3JhZ2UgZnJvbSBcIi4vZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IGRvbUNyZWF0b3IgZnJvbSBcIi4vZG9tQ3JlYXRvclwiO1xyXG5cclxuLy90ZXN0aW5nXHJcbmNvbnN0IHRlc3REYXRhU2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiR2VuZXJhbFwiKTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFByb2plY3QoXCJQcml2YXRlXCIpO1xyXG4gICAgZGF0YVN0b3JhZ2UuYWRkUHJvamVjdChcIldvcmtcIik7XHJcblxyXG4gICAgZGF0YVN0b3JhZ2UuYWRkVGFzayh7XHJcbiAgICAgICAgdGl0bGU6IFwidGFzayBvbmVcIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIG9uZVwiLFxyXG4gICAgICAgIHByb2plY3Q6IDIsXHJcbiAgICAgICAgZGF0ZTogXCIyMDAwLTAxLTAxXCIsXHJcbiAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4gICAgICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0d29cIixcclxuICAgICAgICBwcm9qZWN0OiAzLFxyXG4gICAgICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4gICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyB0ZXN0RGF0YVNldHVwKCk7XHJcbi8vIGRhdGFTdG9yYWdlLmFkZFRhc2soe1xyXG4vLyAgICAgdGl0bGU6IFwidGFzayB0aHJlZVwiLFxyXG4vLyAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb24gb2YgdGFzayB0aHJlZVwiLFxyXG4vLyAgICAgcHJvamVjdDogXCJQcm9qZWN0IDJcIixcclxuLy8gICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4vLyAgICAgZG9uZTogZmFsc2UsXHJcbi8vIH0pO1xyXG4vLyBkYXRhU3RvcmFnZS5hZGRQcm9qZWN0KFwiUHJvamVjdCAzXCIpO1xyXG4vLyBkYXRhU3RvcmFnZS5kZWxldGVUYXNrKDEpO1xyXG4vLyBkYXRhU3RvcmFnZS5kZWxldGVQcm9qZWN0KDIpO1xyXG4vLyBkYXRhU3RvcmFnZS5lZGl0UHJvamVjdCgyLCBcIlByaXZhdGVcIik7XHJcbi8vIGRhdGFTdG9yYWdlLmVkaXRUYXNrKDIsIHtcclxuLy8gICAgIHRpdGxlOiBcInRhc2sgdHdvXCIsXHJcbi8vICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvbiBvZiB0YXNrIHR3byB3aXRoIHNvbWUgZWRpdFwiLFxyXG4vLyAgICAgcHJvamVjdDogMyxcclxuLy8gICAgIGRhdGU6IFwiMjAwMC0wMy0wM1wiLFxyXG4vLyAgICAgZG9uZTogZmFsc2UsXHJcbi8vIH0pO1xyXG4vL2VuZCB0ZXN0aW5nXHJcblxyXG5jb29yZGluYXRvci5jb29yZGluYXRlSW5pdGlhbExvYWQoKTtcclxuXHJcbi8vdGVzdGluZ1xyXG5jb25zdCB0YXNrSW5wdXRFbGVtZW50ID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrSW5wdXRFbGVtZW50KCk7XHJcbmRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0lucHV0RWxlbWVudCk7XHJcbi8vZW5kIHRlc3RpbmdcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9