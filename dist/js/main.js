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

drawProjects

drawTask

drawNewTaskButton

drawNewTaskInput

drawNewTaskModal

drawTaskEdit

 */

const drawProjects = function (projectsArr) {
    let projectsSidebarContainer = document.getElementById("projects-sidebar-container");
    for (let i in projectsArr) {
        let button = document.createElement("button");
        button.type = "button";
        button.value = projectsArr[i].name;
        button.classList.add("btn");
        button.classList.add("btn-light");
        button.classList.add("sidebar-btn");

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    drawProjects,
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ25ERjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QztBQUN6QztBQUNBLHNEQUFVLGlCQUFpQixpQkFBaUIsSUFBSSxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvanMvZG9tQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5cclxuZHJhd1Byb2plY3RzXHJcblxyXG5kcmF3VGFza1xyXG5cclxuZHJhd05ld1Rhc2tCdXR0b25cclxuXHJcbmRyYXdOZXdUYXNrSW5wdXRcclxuXHJcbmRyYXdOZXdUYXNrTW9kYWxcclxuXHJcbmRyYXdUYXNrRWRpdFxyXG5cclxuICovXHJcblxyXG5jb25zdCBkcmF3UHJvamVjdHMgPSBmdW5jdGlvbiAocHJvamVjdHNBcnIpIHtcclxuICAgIGxldCBwcm9qZWN0c1NpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXNpZGViYXItY29udGFpbmVyXCIpO1xyXG4gICAgZm9yIChsZXQgaSBpbiBwcm9qZWN0c0Fycikge1xyXG4gICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICBidXR0b24udmFsdWUgPSBwcm9qZWN0c0FycltpXS5uYW1lO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuLWxpZ2h0XCIpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1idG5cIik7XHJcblxyXG4gICAgICAgIGxldCByb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHJvd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgaWNvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sLTFcIik7XHJcblxyXG4gICAgICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFyXCIpO1xyXG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNtXCIpO1xyXG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhLWNpcmNsZVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1hdXRvXCIpO1xyXG4gICAgICAgIHRleHRDb250YWluZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0c0FycltpXS5uYW1lO1xyXG5cclxuICAgICAgICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgICAgIHJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcclxuICAgICAgICByb3dDb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dENvbnRhaW5lcik7XHJcbiAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHJvd0NvbnRhaW5lcik7XHJcbiAgICAgICAgcHJvamVjdHNTaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3UHJvamVjdHMsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICBcclxuTW9kdWxlczpcclxuXHJcblxyXG5cclxuY29vcmRpbmF0b3JcclxuICAgIENvb3JkaW5hdG9yXHJcbiAgICAgICAgSGFuZGxlcyB0aGluZ3MgbGlrZSB0aGUgaW5pdGlhbCBsb2FkIG9mIHRoZSBwYWdlXHJcblxyXG5cclxuZG9tRXZlbnRzXHJcbiAgICBBYmxlIHRvIGNyZWF0ZSBFdmVudCBMaXN0ZW5lcnMgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpYyBGdW5jdGlvbnMgY2FsbGVkIGJ5IHRoZSBFdmVudCBMaXN0ZW5lcnNcclxuXHJcblxyXG5kb21DcmVhdG9yXHJcbiAgICBUaGlzIHRha2VzIGFuIE9iamVjdCBhbmQgYSBQbGFjZSB0byBkaXNwbGF5IHRoZSBPYmplY3RzIGNvbnRlbnRcclxuXHJcblxyXG5kYXRhU3RvcmFnZTpcclxuICAgIERhdGEgU2F2ZXJcclxuICAgICAgICBUaGlzIHNhdmVzIG5ldyBJbnB1dCB0byBhIEpTT04tZmlsZVxyXG5cclxuICAgIERhdGEgTG9hZGVyXHJcbiAgICAgICAgVGhpcyBsb2FkcyBhIEpTT04tZmlsZVxyXG5cclxuXHJcbmRhdGFTdHJ1Y3R1cmVyOlxyXG4gICAgRGF0YSBTdHJ1Y3R1cmVyXHJcbiAgICAgICAgVGhpbmdzIGxpa2UgYXNzb2NpYXRpbmcgdGhlIHRhc2tzIHdpdGggdGhlaXIgcHJvamVjdHNcclxuICAgICAgICBBbHNvIHRoaW5ncyBsaWtlIHJlbW92aW5nIHRoZSBwcm9qZWN0IGZyb20gdGFza3Mgd2hlcmUgdGhlIHByb2plY3QgaGFzIGJlZW4gZGVsZXRlZC5cclxuXHJcbiAgICBEYXRhIFNlbGVjdGVyXHJcbiAgICAgICAgVGhpcyB0YWtlcyBhIE9iamVjdCBmcm9tIHRoZSBEYXRhIExvYWRlciBhbmQgcmV0dXJucyBhIGZpbHRlcmVkIE9iamVjdCB0byB0aGUgQ3JlYXRvclxyXG4gKi9cclxuXHJcbmltcG9ydCBkb21DcmVhdG9yIGZyb20gXCIuL2RvbUNyZWF0b3IuanNcIjtcclxuXHJcbmRvbUNyZWF0b3IuZHJhd1Byb2plY3RzKFt7IG5hbWU6IFwiUHJpdmF0ZVwiIH0sIHsgbmFtZTogXCJXb3JrXCIgfV0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=