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

drawNewTaskButton

drawNewTaskInput

drawNewTaskModal

drawTaskEdit

 */

//draws the projects in the sidebar.
const drawProjects = function (projectsArr) {
    let projectsSidebarContainer = document.getElementById("projects-sidebar-container");
    for (let i in projectsArr) {
        let button = document.createElement("button");
        button.type = "button";
        button.value = projectsArr[i].name;
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
        textContainer.textContent = projectsArr[i].name;

        iconContainer.appendChild(icon);
        rowContainer.appendChild(iconContainer);
        rowContainer.appendChild(textContainer);
        button.appendChild(rowContainer);
        projectsSidebarContainer.appendChild(button);
    }
};

const drawTask = function (task) {
    let tasksContainer = document.getElementById("tasks-container");
    let mediaContainer = document.createElement("div");
    mediaContainer.classList.add("mt-2");
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
    tasksContainer.appendChild(mediaContainer);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    drawProjects,
    drawTask,
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



_domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawProjects([{ name: "Private" }, { name: "Work" }]);
let allTasks = [
    { id: 1, title: "Create the first Task", description: "This task is meant to be shown as the first test-task" },
    { id: 2, title: "Create the second Task", description: "This task is meant to be shown as the second test-task" },
];

//initial draw
for (let i in allTasks) {
    _domCreator_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawTask(allTasks[i]);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7O1VDL0dGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lDO0FBQ3pDO0FBQ0Esc0RBQVUsaUJBQWlCLGlCQUFpQixJQUFJLGNBQWM7QUFDOUQ7QUFDQSxNQUFNLDZHQUE2RztBQUNuSCxNQUFNLCtHQUErRztBQUNySDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksc0RBQVU7QUFDZCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2RvbUNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuXHJcbmRyYXdOZXdUYXNrQnV0dG9uXHJcblxyXG5kcmF3TmV3VGFza0lucHV0XHJcblxyXG5kcmF3TmV3VGFza01vZGFsXHJcblxyXG5kcmF3VGFza0VkaXRcclxuXHJcbiAqL1xyXG5cclxuLy9kcmF3cyB0aGUgcHJvamVjdHMgaW4gdGhlIHNpZGViYXIuXHJcbmNvbnN0IGRyYXdQcm9qZWN0cyA9IGZ1bmN0aW9uIChwcm9qZWN0c0Fycikge1xyXG4gICAgbGV0IHByb2plY3RzU2lkZWJhckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtc2lkZWJhci1jb250YWluZXJcIik7XHJcbiAgICBmb3IgKGxldCBpIGluIHByb2plY3RzQXJyKSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgIGJ1dHRvbi52YWx1ZSA9IHByb2plY3RzQXJyW2ldLm5hbWU7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG4tbGlnaHRcIik7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWJ0blwiKTtcclxuXHJcbiAgICAgICAgLy9ldmVudCBsaXN0ZW5lclxyXG5cclxuICAgICAgICBsZXQgcm93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICByb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGljb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC0xXCIpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhclwiKTtcclxuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zbVwiKTtcclxuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1jaXJjbGVcIik7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtYXV0b1wiKTtcclxuICAgICAgICB0ZXh0Q29udGFpbmVyLnRleHRDb250ZW50ID0gcHJvamVjdHNBcnJbaV0ubmFtZTtcclxuXHJcbiAgICAgICAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgICAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XHJcbiAgICAgICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKHRleHRDb250YWluZXIpO1xyXG4gICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChyb3dDb250YWluZXIpO1xyXG4gICAgICAgIHByb2plY3RzU2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZHJhd1Rhc2sgPSBmdW5jdGlvbiAodGFzaykge1xyXG4gICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1jb250YWluZXJcIik7XHJcbiAgICBsZXQgbWVkaWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm10LTJcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWVkaWFcIik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZC1mbGV4XCIpO1xyXG5cclxuICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke3Rhc2suaWR9YDtcclxuICAgIGNoZWNrYm94LnZhbHVlID0gdGFzay5pZDtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNoZWNrLWlucHV0XCIpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImFsaWduLXNlbGYtc3RhcnRcIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwibXQtMlwiKTtcclxuXHJcbiAgICAvL2V2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IG1lZGlhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcIm1lZGlhLWJvZHlcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcIm1zLTNcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcImQtZmxleFwiKTtcclxuICAgIG1lZGlhQm9keS5jbGFzc0xpc3QuYWRkKFwidy0xMDBcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcImp1c3RpZnktY29udGVudC1iZXR3ZWVuXCIpO1xyXG5cclxuICAgIGxldCB0ZXh0Qm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG5cclxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XHJcblxyXG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZWRpdEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC1idXR0b24tJHt0YXNrLmlkfWA7XHJcbiAgICBlZGl0QnV0dG9uLnZhbHVlID0gdGFzay5pZDtcclxuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0blwiKTtcclxuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0bi1saWdodFwiKTtcclxuXHJcbiAgICAvL2V2ZW50IGxpc3RlbmVyXHJcblxyXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIik7XHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcclxuXHJcbiAgICAvL0FkZCBkZWxldGUgYnV0dG9uLCB3aXRoIGV2ZW50IGxpc3RlbmVyIGluY2x1ZGluZyBhcmUteW91LXN1cmUtbW9kYWxcclxuXHJcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcclxuICAgIHRleHRCb2R5LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIHRleHRCb2R5LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgIG1lZGlhQm9keS5hcHBlbmRDaGlsZCh0ZXh0Qm9keSk7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhQm9keSk7XHJcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUNvbnRhaW5lcik7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3UHJvamVjdHMsXHJcbiAgICBkcmF3VGFzayxcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiogIFxyXG5Nb2R1bGVzOlxyXG5cclxuXHJcblxyXG5jb29yZGluYXRvclxyXG4gICAgQ29vcmRpbmF0b3JcclxuICAgICAgICBIYW5kbGVzIHRoaW5ncyBsaWtlIHRoZSBpbml0aWFsIGxvYWQgb2YgdGhlIHBhZ2VcclxuXHJcblxyXG5kb21FdmVudHNcclxuICAgIEFibGUgdG8gY3JlYXRlIEV2ZW50IExpc3RlbmVycyBhbmQgY29udGFpbnMgdGhlIHNwZWNpZmljIEZ1bmN0aW9ucyBjYWxsZWQgYnkgdGhlIEV2ZW50IExpc3RlbmVyc1xyXG5cclxuXHJcbmRvbUNyZWF0b3JcclxuICAgIFRoaXMgdGFrZXMgYW4gT2JqZWN0IGFuZCBhIFBsYWNlIHRvIGRpc3BsYXkgdGhlIE9iamVjdHMgY29udGVudFxyXG5cclxuXHJcbmRhdGFTdG9yYWdlOlxyXG4gICAgRGF0YSBTYXZlclxyXG4gICAgICAgIFRoaXMgc2F2ZXMgbmV3IElucHV0IHRvIGEgSlNPTi1maWxlXHJcblxyXG4gICAgRGF0YSBMb2FkZXJcclxuICAgICAgICBUaGlzIGxvYWRzIGEgSlNPTi1maWxlXHJcblxyXG5cclxuZGF0YVN0cnVjdHVyZXI6XHJcbiAgICBEYXRhIFN0cnVjdHVyZXJcclxuICAgICAgICBUaGluZ3MgbGlrZSBhc3NvY2lhdGluZyB0aGUgdGFza3Mgd2l0aCB0aGVpciBwcm9qZWN0c1xyXG4gICAgICAgIEFsc28gdGhpbmdzIGxpa2UgcmVtb3ZpbmcgdGhlIHByb2plY3QgZnJvbSB0YXNrcyB3aGVyZSB0aGUgcHJvamVjdCBoYXMgYmVlbiBkZWxldGVkLlxyXG5cclxuICAgIERhdGEgU2VsZWN0ZXJcclxuICAgICAgICBUaGlzIHRha2VzIGEgT2JqZWN0IGZyb20gdGhlIERhdGEgTG9hZGVyIGFuZCByZXR1cm5zIGEgZmlsdGVyZWQgT2JqZWN0IHRvIHRoZSBDcmVhdG9yXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRvbUNyZWF0b3IgZnJvbSBcIi4vZG9tQ3JlYXRvci5qc1wiO1xyXG5cclxuZG9tQ3JlYXRvci5kcmF3UHJvamVjdHMoW3sgbmFtZTogXCJQcml2YXRlXCIgfSwgeyBuYW1lOiBcIldvcmtcIiB9XSk7XHJcbmxldCBhbGxUYXNrcyA9IFtcclxuICAgIHsgaWQ6IDEsIHRpdGxlOiBcIkNyZWF0ZSB0aGUgZmlyc3QgVGFza1wiLCBkZXNjcmlwdGlvbjogXCJUaGlzIHRhc2sgaXMgbWVhbnQgdG8gYmUgc2hvd24gYXMgdGhlIGZpcnN0IHRlc3QtdGFza1wiIH0sXHJcbiAgICB7IGlkOiAyLCB0aXRsZTogXCJDcmVhdGUgdGhlIHNlY29uZCBUYXNrXCIsIGRlc2NyaXB0aW9uOiBcIlRoaXMgdGFzayBpcyBtZWFudCB0byBiZSBzaG93biBhcyB0aGUgc2Vjb25kIHRlc3QtdGFza1wiIH0sXHJcbl07XHJcblxyXG4vL2luaXRpYWwgZHJhd1xyXG5mb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUYXNrKGFsbFRhc2tzW2ldKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=