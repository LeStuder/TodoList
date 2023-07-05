import domCreator from "./domCreator";

const clickNewTaskButtonTasklistElement = function (event) {
    event.target.remove();
    const taskInputElement = domCreator.createTaskInputElement();
    domCreator.drawToTasklist(taskInputElement);
};

export default { clickNewTaskButtonTasklistElement };
