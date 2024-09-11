function Task(title, details, date, priority, status = 'incomplete') {
    this.title = title;
    this.details = details;
    this.date = date;
    this.priority = priority;
    this.status = status;

}
Task.prototype.markComplete = function () {
    this.status = 'complete';
};


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException && e.name === "QuotaExceededError" && storage && storage.length !== 0
        );
    }
}

function saveToStorage(taskArray) {
    if (storageAvailable("localStorage")) {
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    }
    else console.log("Failed to save to local storage");
}

function loadTasksFromLocalStorage(taskArray) {
    if (storageAvailable("localStorage")) {
        const savedTasks = localStorage.getItem("tasks");
        taskArray = JSON.parse(savedTasks);
        
    }
    else {
        console.log("Failed to load data from local storage");
    }
    if (taskArray.length === 0) {
        initilizeTask(taskArray);
    }
}

function initilizeTask(taskArray) {
    let task1 = new Task("Do laundry", "Wash all clothes", "Sep 12", "high");
    let task2 = new Task("Buy groceries", "Get milk, eggs, and bread", "Sep 12", "medium");
    taskArray.push(task1, task2);
}

export { loadTasksFromLocalStorage, saveToStorage };
