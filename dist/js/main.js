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

    let divider = document.createElement("div");
    divider.classList.add("border-top");
    divider.classList.add("mt-2");

    editButton.appendChild(editIcon);
    buttonContainer.appendChild(editButton);
    textBody.appendChild(title);
    textBody.appendChild(description);
    mediaBody.appendChild(textBody);
    mediaBody.appendChild(buttonContainer);
    mediaContainer.appendChild(checkbox);
    mediaContainer.appendChild(mediaBody);
    tasksContainer.appendChild(mediaContainer);
    tasksContainer.appendChild(divider);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ3BIRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QztBQUN6QztBQUNBLHNEQUFVLGlCQUFpQixpQkFBaUIsSUFBSSxjQUFjO0FBQzlEO0FBQ0EsTUFBTSw2R0FBNkc7QUFDbkgsTUFBTSwrR0FBK0c7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFVO0FBQ2QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9qcy9kb21DcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcblxyXG5kcmF3TmV3VGFza0J1dHRvblxyXG5cclxuZHJhd05ld1Rhc2tJbnB1dFxyXG5cclxuZHJhd05ld1Rhc2tNb2RhbFxyXG5cclxuZHJhd1Rhc2tFZGl0XHJcblxyXG4gKi9cclxuXHJcbi8vZHJhd3MgdGhlIHByb2plY3RzIGluIHRoZSBzaWRlYmFyLlxyXG5jb25zdCBkcmF3UHJvamVjdHMgPSBmdW5jdGlvbiAocHJvamVjdHNBcnIpIHtcclxuICAgIGxldCBwcm9qZWN0c1NpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXNpZGViYXItY29udGFpbmVyXCIpO1xyXG4gICAgZm9yIChsZXQgaSBpbiBwcm9qZWN0c0Fycikge1xyXG4gICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICBidXR0b24udmFsdWUgPSBwcm9qZWN0c0FycltpXS5uYW1lO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuLWxpZ2h0XCIpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1idG5cIik7XHJcblxyXG4gICAgICAgIC8vZXZlbnQgbGlzdGVuZXJcclxuXHJcbiAgICAgICAgbGV0IHJvd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XHJcblxyXG4gICAgICAgIGxldCBpY29uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpY29uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtMVwiKTtcclxuXHJcbiAgICAgICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYXJcIik7XHJcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc21cIik7XHJcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICBsZXQgdGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLWF1dG9cIik7XHJcbiAgICAgICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3RzQXJyW2ldLm5hbWU7XHJcblxyXG4gICAgICAgIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgICAgICAgcm93Q29udGFpbmVyLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xyXG4gICAgICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Q29udGFpbmVyKTtcclxuICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQocm93Q29udGFpbmVyKTtcclxuICAgICAgICBwcm9qZWN0c1NpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGRyYXdUYXNrID0gZnVuY3Rpb24gKHRhc2spIHtcclxuICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gICAgbGV0IG1lZGlhQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lZGlhQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtdC0yXCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1lZGlhXCIpO1xyXG4gICAgbWVkaWFDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImQtZmxleFwiKTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0YXNrLmlkfWA7XHJcbiAgICBjaGVja2JveC52YWx1ZSA9IHRhc2suaWQ7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jaGVjay1pbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJhbGlnbi1zZWxmLXN0YXJ0XCIpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcIm10LTJcIik7XHJcblxyXG4gICAgLy9ldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCBtZWRpYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpYS1ib2R5XCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJtcy0zXCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJkLWZsZXhcIik7XHJcbiAgICBtZWRpYUJvZHkuY2xhc3NMaXN0LmFkZChcInctMTAwXCIpO1xyXG4gICAgbWVkaWFCb2R5LmNsYXNzTGlzdC5hZGQoXCJqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiKTtcclxuXHJcbiAgICBsZXQgdGV4dEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuXHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG5cclxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7dGFzay5pZH1gO1xyXG4gICAgZWRpdEJ1dHRvbi52YWx1ZSA9IHRhc2suaWQ7XHJcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XHJcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG4tbGlnaHRcIik7XHJcblxyXG4gICAgLy9ldmVudCBsaXN0ZW5lclxyXG5cclxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhLXBlbi10by1zcXVhcmVcIik7XHJcblxyXG4gICAgLy9BZGQgZGVsZXRlIGJ1dHRvbiwgd2l0aCBldmVudCBsaXN0ZW5lciBpbmNsdWRpbmcgYXJlLXlvdS1zdXJlLW1vZGFsXHJcblxyXG4gICAgbGV0IGRpdmlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKFwiYm9yZGVyLXRvcFwiKTtcclxuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcIm10LTJcIik7XHJcblxyXG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICB0ZXh0Qm9keS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XHJcbiAgICBtZWRpYUJvZHkuYXBwZW5kQ2hpbGQodGV4dEJvZHkpO1xyXG4gICAgbWVkaWFCb2R5LmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbiAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUJvZHkpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFDb250YWluZXIpO1xyXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2aWRlcik7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3UHJvamVjdHMsXHJcbiAgICBkcmF3VGFzayxcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiogIFxyXG5Nb2R1bGVzOlxyXG5cclxuXHJcblxyXG5jb29yZGluYXRvclxyXG4gICAgQ29vcmRpbmF0b3JcclxuICAgICAgICBIYW5kbGVzIHRoaW5ncyBsaWtlIHRoZSBpbml0aWFsIGxvYWQgb2YgdGhlIHBhZ2VcclxuXHJcblxyXG5kb21FdmVudHNcclxuICAgIEFibGUgdG8gY3JlYXRlIEV2ZW50IExpc3RlbmVycyBhbmQgY29udGFpbnMgdGhlIHNwZWNpZmljIEZ1bmN0aW9ucyBjYWxsZWQgYnkgdGhlIEV2ZW50IExpc3RlbmVyc1xyXG5cclxuXHJcbmRvbUNyZWF0b3JcclxuICAgIFRoaXMgdGFrZXMgYW4gT2JqZWN0IGFuZCBhIFBsYWNlIHRvIGRpc3BsYXkgdGhlIE9iamVjdHMgY29udGVudFxyXG5cclxuXHJcbmRhdGFTdG9yYWdlOlxyXG4gICAgRGF0YSBTYXZlclxyXG4gICAgICAgIFRoaXMgc2F2ZXMgbmV3IElucHV0IHRvIGEgSlNPTi1maWxlXHJcblxyXG4gICAgRGF0YSBMb2FkZXJcclxuICAgICAgICBUaGlzIGxvYWRzIGEgSlNPTi1maWxlXHJcblxyXG5cclxuZGF0YVN0cnVjdHVyZXI6XHJcbiAgICBEYXRhIFN0cnVjdHVyZXJcclxuICAgICAgICBUaGluZ3MgbGlrZSBhc3NvY2lhdGluZyB0aGUgdGFza3Mgd2l0aCB0aGVpciBwcm9qZWN0c1xyXG4gICAgICAgIEFsc28gdGhpbmdzIGxpa2UgcmVtb3ZpbmcgdGhlIHByb2plY3QgZnJvbSB0YXNrcyB3aGVyZSB0aGUgcHJvamVjdCBoYXMgYmVlbiBkZWxldGVkLlxyXG5cclxuICAgIERhdGEgU2VsZWN0ZXJcclxuICAgICAgICBUaGlzIHRha2VzIGEgT2JqZWN0IGZyb20gdGhlIERhdGEgTG9hZGVyIGFuZCByZXR1cm5zIGEgZmlsdGVyZWQgT2JqZWN0IHRvIHRoZSBDcmVhdG9yXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRvbUNyZWF0b3IgZnJvbSBcIi4vZG9tQ3JlYXRvci5qc1wiO1xyXG5cclxuZG9tQ3JlYXRvci5kcmF3UHJvamVjdHMoW3sgbmFtZTogXCJQcml2YXRlXCIgfSwgeyBuYW1lOiBcIldvcmtcIiB9XSk7XHJcbmxldCBhbGxUYXNrcyA9IFtcclxuICAgIHsgaWQ6IDEsIHRpdGxlOiBcIkNyZWF0ZSB0aGUgZmlyc3QgVGFza1wiLCBkZXNjcmlwdGlvbjogXCJUaGlzIHRhc2sgaXMgbWVhbnQgdG8gYmUgc2hvd24gYXMgdGhlIGZpcnN0IHRlc3QtdGFza1wiIH0sXHJcbiAgICB7IGlkOiAyLCB0aXRsZTogXCJDcmVhdGUgdGhlIHNlY29uZCBUYXNrXCIsIGRlc2NyaXB0aW9uOiBcIlRoaXMgdGFzayBpcyBtZWFudCB0byBiZSBzaG93biBhcyB0aGUgc2Vjb25kIHRlc3QtdGFza1wiIH0sXHJcbl07XHJcblxyXG4vL2luaXRpYWwgZHJhd1xyXG5mb3IgKGxldCBpIGluIGFsbFRhc2tzKSB7XHJcbiAgICBkb21DcmVhdG9yLmRyYXdUYXNrKGFsbFRhc2tzW2ldKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=