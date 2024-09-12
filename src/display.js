import editImg from "./images/pencil.svg";
import deleteImg from "./images/delete.svg";
import { saveToStorage, saveProjects } from "./storage";
import { format, add } from 'date-fns';


function sortByTime(taskArray) {
    const allTime = document.getElementById("all-time");
    const today = document.getElementById("today");
    const week = document.getElementById("week");
    const title = document.querySelector(".title");
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    const taskContainer = document.querySelector(".task-container");

    allTime.addEventListener("click", () => {
        title.textContent = "Tasks- All Time";
        updateTasks(taskArray)
    });
    today.addEventListener("click", function () {
        taskContainer.innerHTML = "";
        title.textContent = "Tasks- Today";
        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i].date === formattedDate) {
                taskContainer.appendChild(createTask(i, taskArray[i]));
            }
        }
    });

    week.addEventListener("click", function () {
        taskContainer.innerHTML = "";
        title.textContent = "Tasks- In a Week";
        const newDate = add(todayDate, { days: 7 });
        const targetDate = format(newDate, "yyyy-MM-dd");
        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i].date > formattedDate && taskArray[i].date <= targetDate) {
                taskContainer.appendChild(createTask(i, taskArray[i]));
            }
        }
    });
}


function updateProjects(projectArray) {
    const projects = document.querySelector(".projects");
    projects.innerHTML = "";
    for (let i = 0; i < projectArray.length; i++) {
        projects.appendChild(createProject(i, projectArray[i], projectArray));

    }
   
};



function createProject(index, project, projectArray) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.innerText = project.title;
    li.setAttribute("index", index);
    ul.appendChild(li);
    li.setAttribute("project", project.title);
    li.addEventListener("click", ()=>{
        const title = document.querySelector(".title");
        title.innerText = li.textContent;
        generateProjectTasks(index,project,projectArray)
    });
   
    return ul;
}

function generateProjectTasks (index,project,projectArray) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";
    const taskArray = project.tasks;
    for (let i = 0; i < taskArray.length; i++) {
        taskContainer.appendChild(createTask(i, taskArray[i]));
    }
    deleteProjectTask(index,project,projectArray);
    saveProjects(projectArray);
};

function deleteProjectTask(index,project,projectArray) {
    const deleteButton = document.querySelectorAll(".delete");
    let arrayIndex;
    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            const taskDiv = button.closest(".tasks");
            arrayIndex = taskDiv.getAttribute("data-index");
            project.tasks.splice(arrayIndex, 1);
            projectArray.splice(index,1,project);
            generateProjectTasks(index,project,projectArray);
        });
    });
}

function initializeProject(projectArray) {
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    const task = { title: "Run 5 miles", details: "Run 5 miles early in the morning", date: formattedDate, priority: "high", status: "incomplete" };
    const project1 = { title: "Marathon Training", tasks: [task,task] };
    const project2 = { title: "Make a to-do list", tasks: [task] };
    projectArray.push(project1, project2);
}

function deleteTask(todoArray) {
    const deleteButton = document.querySelectorAll(".delete");
    let index;
    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            const taskDiv = button.closest(".tasks");
            index = taskDiv.getAttribute("data-index");
            todoArray.splice(index, 1);
            console.log(index);
            updateTasks(todoArray);
        });
    });
};



function initializeTask(taskArray) {
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    let task1 = { title: "Do laundry", details: "Wash all clothes", date: formattedDate, priority: "high", status: "incomplete" };
    let task2 = { title: "Buy groceries", details: "Get milk, eggs, and bread", date: formattedDate, priority: "medium", status: "incomplete" };
    taskArray.push(task1, task2);
}

function updateTasks(taskArray) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";

    for (let i = 0; i < taskArray.length; i++) {
        taskContainer.appendChild(createTask(i, taskArray[i]));
    }
    saveToStorage(taskArray);
    deleteTask(taskArray);
}


function createTask(index, taskArray) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tasks");
    taskDiv.setAttribute('data-index', index);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    taskDiv.appendChild(checkbox);

    const taskTitleDiv = document.createElement('div');
    taskTitleDiv.classList.add('task-title-div');


    const taskTitle = document.createElement('p');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = taskArray.title;
    taskTitleDiv.appendChild(taskTitle);

    taskDiv.appendChild(taskTitleDiv);

    const detailsButton = document.createElement('button');
    detailsButton.type = 'button';
    detailsButton.classList.add('details');
    detailsButton.textContent = 'Details';
    taskDiv.appendChild(detailsButton);

    const date = document.createElement('p');
    date.classList.add('date');
    const formatDate = format(taskArray.date, "MMM d");
    date.textContent = formatDate;
    taskDiv.appendChild(date);


    const editButton = document.createElement('img');
    editButton.src = editImg;
    editButton.alt = 'Edit';
    editButton.classList.add('modify-btn', 'edit');
    taskDiv.appendChild(editButton);

    const deleteButton = document.createElement('img');
    deleteButton.src = deleteImg;
    deleteButton.alt = 'Delete';
    deleteButton.classList.add('modify-btn', 'delete');
    taskDiv.appendChild(deleteButton);


    return taskDiv;
}

export { updateProjects, updateTasks, initializeTask, initializeProject, sortByTime };