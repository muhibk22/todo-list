import { format } from 'date-fns';
import { ta } from 'date-fns/locale/ta';

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


function saveProjects(projectArray) {
    if (storageAvailable("localStorage")) {
        localStorage.setItem("projects", JSON.stringify(projectArray));
    }
    else console.log("Failed to save to local storage");
}

function loadTasks(todoArray) {
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
            }
            catch (e) {
                console.error("Error parsing tasks from localStorage:", e);
                localStorage.removeItem("tasks");
            }
        }
        else {
            console.log("No tasks found in localStorage.");
            initializeTask(todoArray);
        }
    }
    else {
        console.log("LocalStorage is not available.");
    }
}

function loadProjects(projectArray) {
    if (storageAvailable("localStorage")) {
        let savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
            try {
                savedProjects = JSON.parse(savedProjects);
                projectArray.length = 0;

                for (let i = 0; i < savedProjects.length; i++) {
                    projectArray.push(savedProjects[i]);
                };
            }
            catch (e) {
                console.error("Error parsing project from localStore", e);
                localStorage.removeItem("projects");
            }
        }
        else {
            initializeProject(projectArray);
        }
    }
    else {
        console.log("Local Storage is not available");
    }
}



function initializeTask(taskArray) {
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    let task1 = { title: "Do laundry", details: "Wash all clothes", date: formattedDate, priority: "High", status: "incomplete" };
    let task2 = { title: "Buy groceries", details: "Get milk, eggs, and bread", date: formattedDate, priority: "Medium", status: "incomplete" };
    taskArray.push(task1, task2);
}

function initializeProject(projectArray) {
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    const task = { title: "Run 5 miles", details: "Run 5 miles early in the morning", date: formattedDate, priority: "High", status: "incomplete" };
    const project1 = { title: "Marathon Training", tasks: [task] };
    const project2 = { title: "Make a to-do list", tasks: [] };
    projectArray.push(project1, project2);
}

function changeStatus(taskArray,index){
    taskArray[index].status = taskArray[index].status === "incomplete" ? "complete" : "incomplete";
    saveToStorage(taskArray);
}

function changeStatusProject(taskArray, index, projectArray){
    taskArray[index].status = taskArray[index].status === "incomplete" ? "complete" : "incomplete";
    saveProjects(projectArray);
}
export { loadTasks, saveToStorage, loadProjects, saveProjects, changeStatus, changeStatusProject };
