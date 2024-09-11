
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

function loadTasksFromLocalStorage(todoArray) {
    if (storageAvailable("localStorage")) {
        let savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            try {
                savedTasks = JSON.parse(savedTasks);
                todoArray.length = 0;

                savedTasks.forEach(task => {
                    todoArray.push({
                        title: task.title || "",
                        details: task.details || "",
                        date: task.date || "",
                        priority: task.priority || "",
                        status: task.status || "incomplete"
                    });
                });
            } catch (e) {
                console.error("Error parsing tasks from localStorage:", e);
                localStorage.removeItem("tasks");
            }
        } else {
            console.log("No tasks found in localStorage.");
        }
    } else {
        console.log("LocalStorage is not available.");
    }
}




export { loadTasksFromLocalStorage, saveToStorage };
