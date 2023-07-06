import domCreator from "./domCreator";
import dataStructurer from "./dataStructurer";
import dataStorage from "./dataStorage";

const clickNewTaskButtonTasklistElement = function (event) {
    event.target.remove();
    const taskInputElement = domCreator.createTaskInputElement();
    domCreator.drawToTasklist(taskInputElement);
};

const clickSaveButton = function (key, done) {
    const title = document.getElementById("inputTitle");
    const description = document.getElementById("inputDescription");
    const projectKey = document.getElementById("inputProject");
    const date = document.getElementById("inputDate");

    if (!title.value || !description.value || !projectKey.value || !date.value) {
        //input validation
        const inputArr = [title, description, projectKey, date];
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

        //if key is null this means that the createTaskInputElement() function has been called with default values and
        //thus aims to create a new tasks
        if (key === null) {
            taskObj = dataStructurer.createTaskObj(title.value, description.value, projectKey.value, date.value, false);
            dataStorage.addTask(taskObj);
        } else {
            taskObj = dataStructurer.createTaskObj(title.value, description.value, projectKey.value, date.value, done);
            dataStorage.editTask(key, taskObj);
        }
        const allVisibleTasks = dataStructurer.getAllVisibleTasks();
        domCreator.clearTasklist();
        for (let i in allVisibleTasks) {
            const taskElem = domCreator.createTaskElement(i, allVisibleTasks[i]);
            const divider = domCreator.createDividerElement();
            domCreator.drawToTasklist(taskElem);
            domCreator.drawToTasklist(divider);
        }
        const newTaskButton = domCreator.createNewTaskButtonTasklistElement();
        domCreator.drawToTasklist(newTaskButton);
    }
};

export default { clickNewTaskButtonTasklistElement, clickSaveButton };
