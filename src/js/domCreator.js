/**
TODO:
drawNewTaskModal

*/

import dataStorage from "./dataStorage";
import eventCoordinator from "./eventCoordinator";
import dataStructurer from "./dataStructurer";
import utility from "./utility";

//Add domElement to the Tasklist
const drawToTasklist = function (domElement) {
    let tasksContainer = document.getElementById("tasks-container");
    tasksContainer.appendChild(domElement);
};

//add domElement to the Project Panel in the Sidebar
const drawToProjectlist = function (domElement) {
    let projectsSidebarContainer = document.getElementById("projects-sidebar-container");
    projectsSidebarContainer.appendChild(domElement);
};

const drawToViewlist = function (domElement) {
    let viewsSidebarContainer = document.getElementById("views-sidebar-container");
    viewsSidebarContainer.appendChild(domElement);
};

const clearTasklist = function () {
    let tasksContainer = document.getElementById("tasks-container");
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
};

const drawVisibleTasksToTasklist = function () {
    let tasks = dataStructurer.getAllVisibleTasks();
    for (let i in tasks) {
        const taskElem = createTaskElement(i, tasks[i]);
        const divider = createDividerElement();
        drawToTasklist(taskElem);
        drawToTasklist(divider);
    }
};

const drawNewTaskButtonToTasklist = function () {
    const newTaskButton = createNewTaskButtonTasklistElement();
    drawToTasklist(newTaskButton);
};

const drawAllProjectsToSidebar = function () {
    let allProjects = dataStorage.getAllProjects();
    for (let i in allProjects) {
        let project = createProjectElement(i, allProjects[i]);
        drawToProjectlist(project);
    }
};

const drawAllViewsToSidebar = function () {
    const allViews = dataStructurer.createViewsCollection();

    //TODO --> Save Views to sessionStorage, probably better do that in the coordinateInitialLoad()

    for (let i in allViews) {
        const viewELement = createViewElement(i, allViews[i].viewName, allViews[i].iconElem);
        drawToViewlist(viewELement);
    }
};

const createViewElement = function (viewID, viewName, iconElem) {
    const viewNameKebabCase = utility.makeKebabCase(viewName);

    const button = document.createElement("button");
    button.type = "button";
    button.id = `view-button-${viewNameKebabCase}`;
    button.value = viewID;
    button.classList.add("btn", "btn-light", "sidebar-btn");

    const row = document.createElement("div");
    row.classList.add("row");

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("col-2");

    const textContainer = document.createElement("div");
    textContainer.classList.add("col-10");
    textContainer.textContent = viewName;

    iconContainer.innerHTML = iconElem;
    row.appendChild(iconContainer);
    row.appendChild(textContainer);
    button.appendChild(row);

    return button;
};

const indicateCurrentView = function () {
    const currentViewID = dataStorage.loadSessionStorage("currentView");

    if (currentViewID === null) {
        currentViewID = 1;
    }

    const allViews = dataStorage.loadSessionStorage("allViews");
    const currentViewName = allViews[currentViewID].viewName;

    const viewButtons = document.getElementById("views-sidebar-container").children;
    for (let i = 0; i < viewButtons.length; i++) {
        if (viewButtons[i].value == currentViewID) {
            viewButtons[i].classList.add("active");
        } else {
            viewButtons[i].classList.remove("active");
        }
    }

    const currentViewTextElement = document.getElementById("current-view-text");
    currentViewTextElement.textContent = `${currentViewName} Tasks`;
};

//returns a domElement based on the project-name string given as parameter
const createProjectElement = function (id, projectName) {
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
        eventCoordinator.clickTaskCheckbox(event);
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
        eventCoordinator.clickNewTaskButtonTasklistElement(event);
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
    let allProjects = dataStorage.getAllProjects();
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
        eventCoordinator.clickSaveButton(id, taskObj.done);
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

export default {
    drawToTasklist,
    drawToProjectlist,
    drawNewTaskButtonToTasklist,
    drawAllProjectsToSidebar,
    drawVisibleTasksToTasklist,
    drawAllViewsToSidebar,
    createViewElement,
    clearTasklist,
    indicateCurrentView,
    createProjectElement,
    createTaskElement,
    createNewTaskButtonTasklistElement,
    createDividerElement,
    createTaskInputElement,
};
