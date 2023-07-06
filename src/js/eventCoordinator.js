import domCreator from "./domCreator";
import dataStructurer from "./dataStructurer";
import dataStorage from "./dataStorage";

const clickNewTaskButtonTasklistElement = function (event) {
    event.target.remove();
    const taskInputElement = domCreator.createTaskInputElement();
    domCreator.drawToTasklist(taskInputElement);
};

const clickSaveButton = function (id, done) {
    const title = document.getElementById("inputTitle");
    const description = document.getElementById("inputDescription");
    const projectID = document.getElementById("inputProject");
    const date = document.getElementById("inputDate");

    if (!title.value || !description.value || !projectID.value || !date.value) {
        //input validation
        const inputArr = [title, description, projectID, date];
        for (let i in inputArr) {
            if (inputArr[i].value) {
                inputArr[i].classList.remove("is-invalid");
                inputArr[i].classList.add("is-valid");
            } else {
                inputArr[i].classList.remove("is-valid");
                inputArr[i].classList.add("is-invalid");
            }
        }
    } else {
        let taskObj = {};

        //if id is null this means that the createTaskInputElement() function has been called with default values and
        //thus aims to create a new tasks
        if (id === null) {
            taskObj = dataStructurer.createTaskObj(title.value, description.value, projectID.value, date.value, false);
            dataStorage.addTask(taskObj);
        } else {
            taskObj = dataStructurer.createTaskObj(title.value, description.value, projectID.value, date.value, done);
            dataStorage.editTask(id, taskObj);
        }
        const allVisibleTasks = dataStructurer.getAllVisibleTasks();
        domCreator.clearTasklist();
        for (let i in allVisibleTasks) {
            const taskElem = domCreator.createTaskElement(i, allVisibleTasks[i]);
            const divider = domCreator.createDividerElement();
            domCreator.drawToTasklist(taskElem);
            domCreator.drawToTasklist(divider);
        }
        domCreator.drawNewTaskButtonToTasklist();
    }
};

const clickTaskCheckbox = function (event) {
    const taskID = event.target.value;
    const status = event.target.checked;
    dataStorage.setTaskStatus(taskID, status);
};

export default { clickNewTaskButtonTasklistElement, clickSaveButton, clickTaskCheckbox };
