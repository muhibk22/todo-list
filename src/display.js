import editImg from "./images/pencil.svg";
import deleteImg from "./images/delete.svg";
import { saveToStorage } from "./storage";
function updateProjects(projectArray) {
    const projects = document.querySelector(".projects");
    const ul = document.createElement("ul");
    projects.appendChild(ul);
    if (projectArray.length === 0) {
        const li = document.createElement("li");
        li.innerText = "Batman";
        ul.appendChild(li);
    }
};

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



function initilizeTask(taskArray) {
    let task1 = { title: "Do laundry", details: "Wash all clothes", date: "Sep 12", priority: "high", status: "incomplete" };
    let task2 = { title: "Buy groceries", details: "Get milk, eggs, and bread", date: "Sep 12", priority: "medium", status: "incomplete"};
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

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks');
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
    date.textContent = taskArray.date;
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

export { updateProjects, updateTasks, initilizeTask };