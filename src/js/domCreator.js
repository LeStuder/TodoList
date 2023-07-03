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

export default {
    drawToTasklist,
    drawToProjectSidebar,
    createProject,
    createTaskElement,
    createNewTaskButtonElement,
    createDividerElement,
};
