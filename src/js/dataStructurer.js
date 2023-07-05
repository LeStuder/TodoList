import dataStorage from "./dataStorage";

const removeProjectFromTasks = function (key) {
    let allTasks = dataStorage.getAllTasks();
    let generalProjectKey = 1;
    for (let i in allTasks) {
        if (allTasks[i].project === key) {
            allTasks[i].project = generalProjectKey;
        }
    }
    //TODO --> Promt the User in domCreator that the tasks will be resetted to the "General" project
    dataStorage.setAllTasks(allTasks);
};

export default { removeProjectFromTasks };
