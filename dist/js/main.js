/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/domCreator.js":
/*!******************************!*\
  !*** ./src/js/domCreator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**

createTaskElementInput

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
    button.value = project.name;
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
    textContainer.textContent = project.name;

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
    checkbox.value = task.id;
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
    let projectsArr = ["Project 1", "Project 2"]; //TODO --> Use a getter for the projects arr
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
/* harmony import */ var _domCreator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreator.js */ "./src/js/domCreator.js");
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



let allProjects = [{ name: "Private" }, { name: "Work" }];
let allTasks = [
    { id: 1, title: "Create the first Task", description: "This task is meant to be shown as the first test-task" },
    { id: 2, title: "Create the second Task", description: "This task is meant to be shown as the second test-task" },
];

//initial draw
for (let i in allProjects) {
    let project = _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].createProject(allProjects[i]);
    _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawToProjectSidebar(project);
}

for (let i in allTasks) {
    const taskElem = _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElement(allTasks[i]);
    const divider = _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].createDividerElement();
    _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(taskElem);
    _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(divider);
}

const newTaskButton = _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].createNewTaskButtonElement();
_domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(newTaskButton);

const taskInputElement = _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskInputElement();
_domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawToTasklist(taskInputElement);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHNEQUFVO0FBQ2hDLHNEQUFVO0FBQ1Y7QUFDQSx5QkFBeUIsc0RBQVU7QUFDbkMsc0RBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9kb21DcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcblxyXG5jcmVhdGVUYXNrRWxlbWVudElucHV0XHJcblxyXG5kcmF3TmV3VGFza01vZGFsXHJcblxyXG4qL1xyXG5cclxuY29uc3QgZHJhd1RvVGFza2xpc3QgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGRyYXdUb1Byb2plY3RTaWRlYmFyID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCBwcm9qZWN0c1NpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXNpZGViYXItY29udGFpbmVyXCIpO1xyXG4gICAgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi52YWx1ZSA9IHByb2plY3QubmFtZTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWxpZ2h0XCIsIFwic2lkZWJhci1idG5cIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCByb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaWNvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTFcIik7XHJcblxyXG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhclwiLCBcImZhLXNtXCIsIFwiZmEtY2lyY2xlXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1hdXRvXCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuXHJcbiAgICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xyXG4gICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKHRleHRDb250YWluZXIpO1xyXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHJvd0NvbnRhaW5lcik7XHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlVGFza0VsZW1lbnQgPSBmdW5jdGlvbiAodGFzaykge1xyXG4gICAgbGV0IG1lZGlhQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtZWRpYVwiLCBcImQtZmxleFwiKTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0YXNrLmlkfWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IHRhc2suaWQ7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jaGVjay1pbnB1dFwiLCBcImFsaWduLXNlbGYtc3RhcnRcIiwgXCJtdC0yXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXJcclxuXHJcbiAgICBsZXQgbWVkaWFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lZGlhQm9keS5jbGFzc0xpc3QuYWRkKFwibWVkaWEtYm9keVwiLCBcIm1zLTNcIiwgXCJkLWZsZXhcIiwgXCJ3LTEwMFwiLCBcImp1c3RpZnktY29udGVudC1iZXR3ZWVuXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Qm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG5cclxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XHJcblxyXG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZWRpdEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC1idXR0b24tJHt0YXNrLmlkfWA7XHJcbiAgICBlZGl0QnV0dG9uLnZhbHVlID0gdGFzay5pZDtcclxuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGV2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gQWRkIGRlbGV0ZSBidXR0b24sIHdpdGggZXZlbnQgbGlzdGVuZXIgaW5jbHVkaW5nIGFyZS15b3Utc3VyZS1tb2RhbFxyXG5cclxuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgdGV4dEJvZHkuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKHRleHRCb2R5KTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgbWVkaWFDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFCb2R5KTtcclxuXHJcbiAgICByZXR1cm4gbWVkaWFDb250YWluZXI7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEaXZpZGVyRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImJvcmRlci10b3BcIiwgXCJteS0yXCIpO1xyXG5cclxuICAgIHJldHVybiBkaXZpZGVyO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBuZXcgdGFza1wiO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tYmxvY2tcIiwgXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgcm93LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlVGFza0lucHV0RWxlbWVudCA9IGZ1bmN0aW9uIChcclxuICAgIHRhc2tPYmogPSB7IHRpdGxlOiBcIlwiLCBkZXNjcmlwdGlvbjogXCJcIiwgcHJvamVjdDogXCJcIiwgZGF0ZTogXCJcIiwgaWQ6IE1hdGgucmFuZG9tKCksIGRvbmU6IGZhbHNlIH1cclxuICAgIC8vVE9ETyAtLT4gcmVwbGFjZSBNYXRoLnJhbmRvbSB3aXRoIGluY3JlbWVudGVyLWZ1bmN0aW9uXHJcbikge1xyXG4gICAgY29uc3QgY3JlYXRlSW5wdXRHcm91cCA9IGZ1bmN0aW9uIChsYWJlbCwgaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGlucHV0R3JvdXAuY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwXCIsIFwibWItMlwiKTtcclxuXHJcbiAgICAgICAgbGV0IHNwYW5MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHNwYW5MYWJlbC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXAtdGV4dFwiKTtcclxuICAgICAgICBzcGFuTGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbDtcclxuXHJcbiAgICAgICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChzcGFuTGFiZWwpO1xyXG4gICAgICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0R3JvdXA7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0YXNrSW5wdXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmlkID0gXCJ0YXNrLWlucHV0LWNvbnRhaW5lclwiO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IGlucHV0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dFRpdGxlLnR5cGUgPSBcInRleHRcIjtcclxuICAgIGlucHV0VGl0bGUudmFsdWUgPSB0YXNrT2JqLnRpdGxlO1xyXG4gICAgaW5wdXRUaXRsZS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi5yb3dzID0gXCI0XCI7XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLnZhbHVlID0gdGFza09iai5kZXNjcmlwdGlvbjtcclxuICAgIGlucHV0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIGlucHV0UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1zZWxlY3RcIik7XHJcbiAgICBsZXQgcHJvamVjdHNBcnIgPSBbXCJQcm9qZWN0IDFcIiwgXCJQcm9qZWN0IDJcIl07IC8vVE9ETyAtLT4gVXNlIGEgZ2V0dGVyIGZvciB0aGUgcHJvamVjdHMgYXJyXHJcbiAgICBmb3IgKGxldCBpIGluIHByb2plY3RzQXJyKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdHNBcnJbaV07XHJcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdHNBcnJbaV07XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBpbnB1dFByb2plY3QudmFsdWUgPSB0YXNrT2JqLnByb2plY3Q7XHJcblxyXG4gICAgbGV0IGlucHV0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0RGF0ZS50eXBlID0gXCJkYXRlXCI7XHJcbiAgICBpbnB1dERhdGUudmFsdWUgPSB0YXNrT2JqLmRhdGU7XHJcbiAgICBpbnB1dERhdGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzYXZlQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Sb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvblJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tcHJpbWFyeVwiLCBcImJ0bi1ibG9ja1wiKTtcclxuICAgIHNhdmVCdXR0b25Sb3cuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbik7XHJcbiAgICBzYXZlQnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNhdmVCdXR0b25Sb3cpO1xyXG5cclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiVGl0bGVcIiwgaW5wdXRUaXRsZSkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJEZXNjcmlwdGlvblwiLCBpbnB1dERlc2NyaXB0aW9uKSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIlByb2plY3RcIiwgaW5wdXRQcm9qZWN0KSk7XHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIkR1ZSBEYXRlXCIsIGlucHV0RGF0ZSkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNhdmVCdXR0b25Db250YWluZXIpO1xyXG5cclxuICAgIHJldHVybiB0YXNrSW5wdXRDb250YWluZXI7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3VG9UYXNrbGlzdCxcclxuICAgIGRyYXdUb1Byb2plY3RTaWRlYmFyLFxyXG4gICAgY3JlYXRlUHJvamVjdCxcclxuICAgIGNyZWF0ZVRhc2tFbGVtZW50LFxyXG4gICAgY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQsXHJcbiAgICBjcmVhdGVEaXZpZGVyRWxlbWVudCxcclxuICAgIGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmxldCBhbGxQcm9qZWN0cyA9IFt7IG5hbWU6IFwiUHJpdmF0ZVwiIH0sIHsgbmFtZTogXCJXb3JrXCIgfV07XHJcbmxldCBhbGxUYXNrcyA9IFtcclxuICAgIHsgaWQ6IDEsIHRpdGxlOiBcIkNyZWF0ZSB0aGUgZmlyc3QgVGFza1wiLCBkZXNjcmlwdGlvbjogXCJUaGlzIHRhc2sgaXMgbWVhbnQgdG8gYmUgc2hvd24gYXMgdGhlIGZpcnN0IHRlc3QtdGFza1wiIH0sXHJcbiAgICB7IGlkOiAyLCB0aXRsZTogXCJDcmVhdGUgdGhlIHNlY29uZCBUYXNrXCIsIGRlc2NyaXB0aW9uOiBcIlRoaXMgdGFzayBpcyBtZWFudCB0byBiZSBzaG93biBhcyB0aGUgc2Vjb25kIHRlc3QtdGFza1wiIH0sXHJcbl07XHJcblxyXG4vL2luaXRpYWwgZHJhd1xyXG5mb3IgKGxldCBpIGluIGFsbFByb2plY3RzKSB7XHJcbiAgICBsZXQgcHJvamVjdCA9IGRvbUNyZWF0b3IuY3JlYXRlUHJvamVjdChhbGxQcm9qZWN0c1tpXSk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUb1Byb2plY3RTaWRlYmFyKHByb2plY3QpO1xyXG59XHJcblxyXG5mb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICBjb25zdCB0YXNrRWxlbSA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0VsZW1lbnQoYWxsVGFza3NbaV0pO1xyXG4gICAgY29uc3QgZGl2aWRlciA9IGRvbUNyZWF0b3IuY3JlYXRlRGl2aWRlckVsZW1lbnQoKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChkaXZpZGVyKTtcclxufVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvbUNyZWF0b3IuY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQoKTtcclxuZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChuZXdUYXNrQnV0dG9uKTtcclxuXHJcbmNvbnN0IHRhc2tJbnB1dEVsZW1lbnQgPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQoKTtcclxuZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdCh0YXNrSW5wdXRFbGVtZW50KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9