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
    button.classList.add("btn");
    button.classList.add("btn-light");
    button.classList.add("sidebar-btn");

    //event listener

    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row");

    let iconContainer = document.createElement("div");
    iconContainer.classList.add("col-1");

    let icon = document.createElement("i");
    icon.classList.add("far");
    icon.classList.add("fa-sm");
    icon.classList.add("fa-circle");

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
    mediaContainer.classList.add("media");
    mediaContainer.classList.add("d-flex");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${task.id}`;
    checkbox.value = task.id;
    checkbox.classList.add("form-check-input");
    checkbox.classList.add("align-self-start");
    checkbox.classList.add("mt-2");

    //event listener

    let mediaBody = document.createElement("div");
    mediaBody.classList.add("media-body");
    mediaBody.classList.add("ms-3");
    mediaBody.classList.add("d-flex");
    mediaBody.classList.add("w-100");
    mediaBody.classList.add("justify-content-between");

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
    editButton.classList.add("btn");
    editButton.classList.add("btn-light");

    //event listener

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa");
    editIcon.classList.add("fa-pen-to-square");

    //Add delete button, with event listener including are-you-sure-modal

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
    divider.classList.add("border-top");
    divider.classList.add("my-2");

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
    button.classList.add("btn");
    button.classList.add("btn-block");
    button.classList.add("btn-light");

    row.appendChild(button);
    container.appendChild(row);

    return container;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    drawToTasklist,
    drawToProjectSidebar,
    createProject,
    createTaskElement,
    createNewTaskButtonElement,
    createDividerElement,
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ2xKRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QztBQUN6QztBQUNBLHFCQUFxQixpQkFBaUIsSUFBSSxjQUFjO0FBQ3hEO0FBQ0EsTUFBTSw2R0FBNkc7QUFDbkgsTUFBTSwrR0FBK0c7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0RBQVU7QUFDNUIsSUFBSSxzREFBVTtBQUNkO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzREFBVTtBQUMvQixvQkFBb0Isc0RBQVU7QUFDOUIsSUFBSSxzREFBVTtBQUNkLElBQUksc0RBQVU7QUFDZDtBQUNBO0FBQ0Esc0JBQXNCLHNEQUFVO0FBQ2hDLHNEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5cclxuY3JlYXRlVGFza0VsZW1lbnRJbnB1dFxyXG5cclxuZHJhd05ld1Rhc2tNb2RhbFxyXG5cclxuKi9cclxuXHJcbmNvbnN0IGRyYXdUb1Rhc2tsaXN0ID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBkcmF3VG9Qcm9qZWN0U2lkZWJhciA9IGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XHJcbiAgICBsZXQgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1zaWRlYmFyLWNvbnRhaW5lclwiKTtcclxuICAgIHByb2plY3RzU2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBidXR0b24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuLWxpZ2h0XCIpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAvL2V2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IHJvd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpY29uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtMVwiKTtcclxuXHJcbiAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFyXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc21cIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1jaXJjbGVcIik7XHJcblxyXG4gICAgbGV0IHRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLWF1dG9cIik7XHJcbiAgICB0ZXh0Q29udGFpbmVyLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG5cclxuICAgIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XHJcbiAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dENvbnRhaW5lcik7XHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQocm93Q29udGFpbmVyKTtcclxuICAgIHJldHVybiBidXR0b247XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrRWxlbWVudCA9IGZ1bmN0aW9uICh0YXNrKSB7XHJcbiAgICBsZXQgbWVkaWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1lZGlhXCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImQtZmxleFwiKTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0YXNrLmlkfWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IHRhc2suaWQ7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jaGVjay1pbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJhbGlnbi1zZWxmLXN0YXJ0XCIpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcIm10LTJcIik7XHJcblxyXG4gICAgLy9ldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCBtZWRpYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpYS1ib2R5XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtcy0zXCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJkLWZsZXhcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcInctMTAwXCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiKTtcclxuXHJcbiAgICBsZXQgdGV4dEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuXHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7dGFzay5pZH1gO1xyXG4gICAgZWRpdEJ1dHRvbi52YWx1ZSA9IHRhc2suaWQ7XHJcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XHJcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgLy9ldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhLXBlbi10by1zcXVhcmVcIik7XHJcblxyXG4gICAgLy9BZGQgZGVsZXRlIGJ1dHRvbiwgd2l0aCBldmVudCBsaXN0ZW5lciBpbmNsdWRpbmcgYXJlLXlvdS1zdXJlLW1vZGFsXHJcblxyXG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQodGV4dEJvZHkpO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUJvZHkpO1xyXG5cclxuICAgIHJldHVybiBtZWRpYUNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZURpdmlkZXJFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGRpdmlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKFwiYm9yZGVyLXRvcFwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcIm15LTJcIik7XHJcblxyXG4gICAgcmV0dXJuIGRpdmlkZXI7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVOZXdUYXNrQnV0dG9uRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXItZmx1aWRcIik7XHJcblxyXG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIG5ldyB0YXNrXCI7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuLWJsb2NrXCIpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgcm93LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZHJhd1RvVGFza2xpc3QsXHJcbiAgICBkcmF3VG9Qcm9qZWN0U2lkZWJhcixcclxuICAgIGNyZWF0ZVByb2plY3QsXHJcbiAgICBjcmVhdGVUYXNrRWxlbWVudCxcclxuICAgIGNyZWF0ZU5ld1Rhc2tCdXR0b25FbGVtZW50LFxyXG4gICAgY3JlYXRlRGl2aWRlckVsZW1lbnQsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmxldCBhbGxQcm9qZWN0cyA9IFt7IG5hbWU6IFwiUHJpdmF0ZVwiIH0sIHsgbmFtZTogXCJXb3JrXCIgfV07XHJcbmxldCBhbGxUYXNrcyA9IFtcclxuICAgIHsgaWQ6IDEsIHRpdGxlOiBcIkNyZWF0ZSB0aGUgZmlyc3QgVGFza1wiLCBkZXNjcmlwdGlvbjogXCJUaGlzIHRhc2sgaXMgbWVhbnQgdG8gYmUgc2hvd24gYXMgdGhlIGZpcnN0IHRlc3QtdGFza1wiIH0sXHJcbiAgICB7IGlkOiAyLCB0aXRsZTogXCJDcmVhdGUgdGhlIHNlY29uZCBUYXNrXCIsIGRlc2NyaXB0aW9uOiBcIlRoaXMgdGFzayBpcyBtZWFudCB0byBiZSBzaG93biBhcyB0aGUgc2Vjb25kIHRlc3QtdGFza1wiIH0sXHJcbl07XHJcblxyXG4vL2luaXRpYWwgZHJhd1xyXG5mb3IgKGxldCBpIGluIGFsbFByb2plY3RzKSB7XHJcbiAgICBsZXQgcHJvamVjdCA9IGRvbUNyZWF0b3IuY3JlYXRlUHJvamVjdChhbGxQcm9qZWN0c1tpXSk7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUb1Byb2plY3RTaWRlYmFyKHByb2plY3QpO1xyXG59XHJcblxyXG5mb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICBjb25zdCB0YXNrRWxlbSA9IGRvbUNyZWF0b3IuY3JlYXRlVGFza0VsZW1lbnQoYWxsVGFza3NbaV0pO1xyXG4gICAgY29uc3QgZGl2aWRlciA9IGRvbUNyZWF0b3IuY3JlYXRlRGl2aWRlckVsZW1lbnQoKTtcclxuICAgIGRvbUNyZWF0b3IuZHJhd1RvVGFza2xpc3QodGFza0VsZW0pO1xyXG4gICAgZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChkaXZpZGVyKTtcclxufVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvbUNyZWF0b3IuY3JlYXRlTmV3VGFza0J1dHRvbkVsZW1lbnQoKTtcclxuZG9tQ3JlYXRvci5kcmF3VG9UYXNrbGlzdChuZXdUYXNrQnV0dG9uKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9