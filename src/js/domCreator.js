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

export default {
    drawProjects,
};
