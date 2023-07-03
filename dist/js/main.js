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
    inputProject.value = taskObj.project;
    let projectsArr = ["Project 1", "Project 2"]; //TODO --> Use a getter for the projects arr
    for (let i in projectsArr) {
        let option = document.createElement("option");
        option.textContent = projectsArr[i];
        inputProject.appendChild(option);
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VTtBQUNoQyxzREFBVTtBQUNWO0FBQ0EseUJBQXlCLHNEQUFVO0FBQ25DLHNEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5cclxuY3JlYXRlVGFza0VsZW1lbnRJbnB1dFxyXG5cclxuZHJhd05ld1Rhc2tNb2RhbFxyXG5cclxuKi9cclxuXHJcbmNvbnN0IGRyYXdUb1Rhc2tsaXN0ID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBkcmF3VG9Qcm9qZWN0U2lkZWJhciA9IGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XHJcbiAgICBsZXQgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1zaWRlYmFyLWNvbnRhaW5lclwiKTtcclxuICAgIHByb2plY3RzU2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1saWdodFwiLCBcInNpZGViYXItYnRuXCIpO1xyXG5cclxuICAgIC8vVE9ETyAtLT4gZXZlbnQgbGlzdGVuZXJcclxuXHJcbiAgICBsZXQgcm93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHJvd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBpY29uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGljb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC0xXCIpO1xyXG5cclxuICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYXJcIiwgXCJmYS1zbVwiLCBcImZhLWNpcmNsZVwiKTtcclxuXHJcbiAgICBsZXQgdGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtYXV0b1wiKTtcclxuICAgIHRleHRDb250YWluZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcblxyXG4gICAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcclxuICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Q29udGFpbmVyKTtcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChyb3dDb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tFbGVtZW50ID0gZnVuY3Rpb24gKHRhc2spIHtcclxuICAgIGxldCBtZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWVkaWFcIiwgXCJkLWZsZXhcIik7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7dGFzay5pZH1gO1xyXG4gICAgY2hlY2tib3gudmFsdWUgPSB0YXNrLmlkO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImZvcm0tY2hlY2staW5wdXRcIiwgXCJhbGlnbi1zZWxmLXN0YXJ0XCIsIFwibXQtMlwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IGV2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IG1lZGlhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcIm1lZGlhLWJvZHlcIiwgXCJtcy0zXCIsIFwiZC1mbGV4XCIsIFwidy0xMDBcIiwgXCJqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiKTtcclxuXHJcbiAgICBsZXQgdGV4dEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuXHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7dGFzay5pZH1gO1xyXG4gICAgZWRpdEJ1dHRvbi52YWx1ZSA9IHRhc2suaWQ7XHJcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgLy9UT0RPIC0tPiBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIsIFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcclxuXHJcbiAgICAvL1RPRE8gLS0+IEFkZCBkZWxldGUgYnV0dG9uLCB3aXRoIGV2ZW50IGxpc3RlbmVyIGluY2x1ZGluZyBhcmUteW91LXN1cmUtbW9kYWxcclxuXHJcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcclxuICAgIHRleHRCb2R5LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIHRleHRCb2R5LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZCh0ZXh0Qm9keSk7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhQm9keSk7XHJcblxyXG4gICAgcmV0dXJuIG1lZGlhQ29udGFpbmVyO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlRGl2aWRlckVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgZGl2aWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXZpZGVyLmNsYXNzTGlzdC5hZGQoXCJib3JkZXItdG9wXCIsIFwibXktMlwiKTtcclxuXHJcbiAgICByZXR1cm4gZGl2aWRlcjtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZU5ld1Rhc2tCdXR0b25FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1mbHVpZFwiKTtcclxuXHJcbiAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJBZGQgbmV3IHRhc2tcIjtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWJsb2NrXCIsIFwiYnRuLWxpZ2h0XCIpO1xyXG5cclxuICAgIHJvdy5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tJbnB1dEVsZW1lbnQgPSBmdW5jdGlvbiAoXHJcbiAgICB0YXNrT2JqID0geyB0aXRsZTogXCJcIiwgZGVzY3JpcHRpb246IFwiXCIsIHByb2plY3Q6IFwiXCIsIGRhdGU6IFwiXCIsIGlkOiBNYXRoLnJhbmRvbSgpLCBkb25lOiBmYWxzZSB9XHJcbiAgICAvL1RPRE8gLS0+IHJlcGxhY2UgTWF0aC5yYW5kb20gd2l0aCBpbmNyZW1lbnRlci1mdW5jdGlvblxyXG4pIHtcclxuICAgIGNvbnN0IGNyZWF0ZUlucHV0R3JvdXAgPSBmdW5jdGlvbiAobGFiZWwsIGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1ncm91cFwiLCBcIm1iLTJcIik7XHJcblxyXG4gICAgICAgIGxldCBzcGFuTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBzcGFuTGFiZWwuY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwLXRleHRcIik7XHJcbiAgICAgICAgc3BhbkxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XHJcblxyXG4gICAgICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoc3BhbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEdyb3VwO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGFza0lucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5pZCA9IFwidGFzay1pbnB1dC1jb250YWluZXJcIjtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXRUaXRsZS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBpbnB1dFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZTtcclxuICAgIGlucHV0VGl0bGUuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGlucHV0RGVzY3JpcHRpb24ucm93cyA9IFwiNFwiO1xyXG4gICAgaW5wdXREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tPYmouZGVzY3JpcHRpb247XHJcbiAgICBpbnB1dERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBpbnB1dFByb2plY3QuY2xhc3NMaXN0LmFkZChcImZvcm0tc2VsZWN0XCIpO1xyXG4gICAgaW5wdXRQcm9qZWN0LnZhbHVlID0gdGFza09iai5wcm9qZWN0O1xyXG4gICAgbGV0IHByb2plY3RzQXJyID0gW1wiUHJvamVjdCAxXCIsIFwiUHJvamVjdCAyXCJdOyAvL1RPRE8gLS0+IFVzZSBhIGdldHRlciBmb3IgdGhlIHByb2plY3RzIGFyclxyXG4gICAgZm9yIChsZXQgaSBpbiBwcm9qZWN0c0Fycikge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RzQXJyW2ldO1xyXG4gICAgICAgIGlucHV0UHJvamVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbnB1dERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dERhdGUudHlwZSA9IFwiZGF0ZVwiO1xyXG4gICAgaW5wdXREYXRlLnZhbHVlID0gdGFza09iai5kYXRlO1xyXG4gICAgaW5wdXREYXRlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcblxyXG4gICAgbGV0IHNhdmVCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLWZsdWlkXCIpO1xyXG5cclxuICAgIGxldCBzYXZlQnV0dG9uUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNhdmVCdXR0b25Sb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLXByaW1hcnlcIiwgXCJidG4tYmxvY2tcIik7XHJcbiAgICBzYXZlQnV0dG9uUm93LmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xyXG4gICAgc2F2ZUJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uUm93KTtcclxuXHJcbiAgICB0YXNrSW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRHcm91cChcIlRpdGxlXCIsIGlucHV0VGl0bGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEdyb3VwKFwiRGVzY3JpcHRpb25cIiwgaW5wdXREZXNjcmlwdGlvbikpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJQcm9qZWN0XCIsIGlucHV0UHJvamVjdCkpO1xyXG4gICAgdGFza0lucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0R3JvdXAoXCJEdWUgRGF0ZVwiLCBpbnB1dERhdGUpKTtcclxuICAgIHRhc2tJbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uQ29udGFpbmVyKTtcclxuXHJcbiAgICByZXR1cm4gdGFza0lucHV0Q29udGFpbmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZHJhd1RvVGFza2xpc3QsXHJcbiAgICBkcmF3VG9Qcm9qZWN0U2lkZWJhcixcclxuICAgIGNyZWF0ZVByb2plY3QsXHJcbiAgICBjcmVhdGVUYXNrRWxlbWVudCxcclxuICAgIGNyZWF0ZU5ld1Rhc2tCdXR0b25FbGVtZW50LFxyXG4gICAgY3JlYXRlRGl2aWRlckVsZW1lbnQsXHJcbiAgICBjcmVhdGVUYXNrSW5wdXRFbGVtZW50LFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKiAgXHJcbk1vZHVsZXM6XHJcblxyXG5cclxuXHJcbmNvb3JkaW5hdG9yXHJcbiAgICBDb29yZGluYXRvclxyXG4gICAgICAgIEhhbmRsZXMgdGhpbmdzIGxpa2UgdGhlIGluaXRpYWwgbG9hZCBvZiB0aGUgcGFnZVxyXG5cclxuXHJcbmRvbUV2ZW50c1xyXG4gICAgQWJsZSB0byBjcmVhdGUgRXZlbnQgTGlzdGVuZXJzIGFuZCBjb250YWlucyB0aGUgc3BlY2lmaWMgRnVuY3Rpb25zIGNhbGxlZCBieSB0aGUgRXZlbnQgTGlzdGVuZXJzXHJcblxyXG5cclxuZG9tQ3JlYXRvclxyXG4gICAgVGhpcyB0YWtlcyBhbiBPYmplY3QgYW5kIGEgUGxhY2UgdG8gZGlzcGxheSB0aGUgT2JqZWN0cyBjb250ZW50XHJcblxyXG5cclxuZGF0YVN0b3JhZ2U6XHJcbiAgICBEYXRhIFNhdmVyXHJcbiAgICAgICAgVGhpcyBzYXZlcyBuZXcgSW5wdXQgdG8gYSBKU09OLWZpbGVcclxuXHJcbiAgICBEYXRhIExvYWRlclxyXG4gICAgICAgIFRoaXMgbG9hZHMgYSBKU09OLWZpbGVcclxuXHJcblxyXG5kYXRhU3RydWN0dXJlcjpcclxuICAgIERhdGEgU3RydWN0dXJlclxyXG4gICAgICAgIFRoaW5ncyBsaWtlIGFzc29jaWF0aW5nIHRoZSB0YXNrcyB3aXRoIHRoZWlyIHByb2plY3RzXHJcbiAgICAgICAgQWxzbyB0aGluZ3MgbGlrZSByZW1vdmluZyB0aGUgcHJvamVjdCBmcm9tIHRhc2tzIHdoZXJlIHRoZSBwcm9qZWN0IGhhcyBiZWVuIGRlbGV0ZWQuXHJcblxyXG4gICAgRGF0YSBTZWxlY3RlclxyXG4gICAgICAgIFRoaXMgdGFrZXMgYSBPYmplY3QgZnJvbSB0aGUgRGF0YSBMb2FkZXIgYW5kIHJldHVybnMgYSBmaWx0ZXJlZCBPYmplY3QgdG8gdGhlIENyZWF0b3JcclxuICovXHJcblxyXG5pbXBvcnQgZG9tQ3JlYXRvciBmcm9tIFwiLi9kb21DcmVhdG9yLmpzXCI7XHJcblxyXG5sZXQgYWxsUHJvamVjdHMgPSBbeyBuYW1lOiBcIlByaXZhdGVcIiB9LCB7IG5hbWU6IFwiV29ya1wiIH1dO1xyXG5sZXQgYWxsVGFza3MgPSBbXHJcbiAgICB7IGlkOiAxLCB0aXRsZTogXCJDcmVhdGUgdGhlIGZpcnN0IFRhc2tcIiwgZGVzY3JpcHRpb246IFwiVGhpcyB0YXNrIGlzIG1lYW50IHRvIGJlIHNob3duIGFzIHRoZSBmaXJzdCB0ZXN0LXRhc2tcIiB9LFxyXG4gICAgeyBpZDogMiwgdGl0bGU6IFwiQ3JlYXRlIHRoZSBzZWNvbmQgVGFza1wiLCBkZXNjcmlwdGlvbjogXCJUaGlzIHRhc2sgaXMgbWVhbnQgdG8gYmUgc2hvd24gYXMgdGhlIHNlY29uZCB0ZXN0LXRhc2tcIiB9LFxyXG5dO1xyXG5cclxuLy9pbml0aWFsIGRyYXdcclxuZm9yIChsZXQgaSBpbiBhbGxQcm9qZWN0cykge1xyXG4gICAgbGV0IHByb2plY3QgPSBkb21DcmVhdG9yLmNyZWF0ZVByb2plY3QoYWxsUHJvamVjdHNbaV0pO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3VG9Qcm9qZWN0U2lkZWJhcihwcm9qZWN0KTtcclxufVxyXG5cclxuZm9yIChsZXQgaSBpbiBhbGxUYXNrcykge1xyXG4gICAgY29uc3QgdGFza0VsZW0gPSBkb21DcmVhdG9yLmNyZWF0ZVRhc2tFbGVtZW50KGFsbFRhc2tzW2ldKTtcclxuICAgIGNvbnN0IGRpdmlkZXIgPSBkb21DcmVhdG9yLmNyZWF0ZURpdmlkZXJFbGVtZW50KCk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUb1Rhc2tsaXN0KHRhc2tFbGVtKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QoZGl2aWRlcik7XHJcbn1cclxuXHJcbmNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb21DcmVhdG9yLmNyZWF0ZU5ld1Rhc2tCdXR0b25FbGVtZW50KCk7XHJcbmRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QobmV3VGFza0J1dHRvbik7XHJcblxyXG5jb25zdCB0YXNrSW5wdXRFbGVtZW50ID0gZG9tQ3JlYXRvci5jcmVhdGVUYXNrSW5wdXRFbGVtZW50KCk7XHJcbmRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0lucHV0RWxlbWVudCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==