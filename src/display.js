import editImg from "./images/pencil.svg";
import deleteImg from "./images/delete.svg";
import { saveToStorage, saveProjects, changeStatus, changeStatusProject } from "./storage";
import { format, add } from 'date-fns';


function updateProjects(projectArray) {
    const projects = document.querySelector(".projects");
    projects.innerHTML = "";
    for (let i = 0; i < projectArray.length; i++) {
        projects.appendChild(createProject(i, projectArray[i], projectArray));
    }
    saveProjects(projectArray);
};

function createProject(index, project, projectArray) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.innerText = project.title;
    li.setAttribute("index", index);
    ul.appendChild(li);
    li.setAttribute("project", project.title);
    li.addEventListener("click", () => {
        const title = document.querySelector(".title");
        title.innerText = li.textContent;
        if (project.tasks.length === 0) {
            emptyProject(index,project,projectArray);
            return;
        }
        generateProjectTasks(index, project, projectArray)

    });

    return ul;
}

function generateProjectTasks(index, project, projectArray) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";
    const taskArray = project.tasks;
    for (let i = 0; i < taskArray.length; i++) {
        taskContainer.appendChild(createTask(i, taskArray[i]));
    }
    deleteProjectTask(index, project, projectArray);
    saveProjects(projectArray);
    details(taskArray);
    edit(taskArray);
    checkmark(taskArray,projectArray);
};

function emptyProject(index,project,projectArray) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = `<div class="empty-project">
    <h3>It appears you have no tasks for this Project </h3>
    <div><button type="button" class="empty-project-btn" id="add-task">Add Task </button>
    <button type="button" class="empty-project-btn" id="del-project">Delete Project </button></div>
    </div>`;
    const deleteProject=document.getElementById("del-project");
    const addTask=document.getElementById("add-task");

    deleteProject.addEventListener("click", ()=>{
        projectArray.splice(index,1);
        updateProjects(projectArray);
        taskContainer.innerHTML = `<h3>Project ${project.title} Deleted</h3>`;
    });

    addTask.addEventListener("click",()=>{
        const form=document.querySelector(".form-container");
        form.classList.remove("hide");
        const formFields = form.querySelectorAll('input, select, textarea, date');
        formFields.forEach((field) => {
            field.disabled = false;
        });
    });
    
}

function deleteProjectTask(index, project, projectArray) {
    const deleteButton = document.querySelectorAll(".delete");
    let arrayIndex;
    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            const taskDiv = button.closest(".tasks");
            arrayIndex = taskDiv.getAttribute("data-index");
            project.tasks.splice(arrayIndex, 1);
            projectArray.splice(index, 1, project);
            generateProjectTasks(index, project, projectArray);
        });
    });
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


function updateTasks(taskArray) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";

    for (let i = 0; i < taskArray.length; i++) {
        taskContainer.appendChild(createTask(i, taskArray[i]));
    }
    saveToStorage(taskArray);
    deleteTask(taskArray);
    details(taskArray);
    edit(taskArray);
    checkmark(taskArray)
}

function createTask(index, taskArray) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tasks");
    taskDiv.setAttribute("data-index", index);

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    taskDiv.appendChild(checkbox);

    const taskTitleDiv = document.createElement("div");
    taskTitleDiv.classList.add("task-title-div");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = taskArray.title;
    taskTitleDiv.appendChild(taskTitle);

    taskDiv.appendChild(taskTitleDiv);

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.classList.add("details");
    detailsButton.textContent = "Details";
    taskDiv.appendChild(detailsButton);

    const date = document.createElement("p");
    date.classList.add("date");
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

    if (taskArray.status==="complete"){
        checkbox.checked = true;
        taskTitle.style.opacity="0.5";
    }

    return taskDiv;
}


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
        details(taskArray);
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
        details(taskArray);
    });
}

function updateSelected(selecedProject){
    const li=document.querySelectorAll("li");
    li.forEach((list=>{
        list.addEventListener("click", ()=>{
            const index=list.getAttribute("index");
            if (!index){
                selecedProject.index=null;
            }
            else {
                selecedProject.index=index;
            }
        })
    }));
}

function details(taskArray) {
    const detailButton=document.querySelectorAll(".details");
    const detailContainer = document.querySelector(".detail-container");
    const closeButton = document.getElementById("close-details");
    const detailTitle=document.querySelector(".detail-title");
    const detailContent=document.querySelector(".detail-content");

    detailButton.forEach((detail)=>{
        detail.addEventListener("click",(event)=>showDetails(event));
    })
    function showDetails() {
        detailContainer.classList.remove("hide");
        const parentContainer = event.target.closest(".tasks");
        const index=parentContainer.getAttribute("data-index");
        detailTitle.innerText=taskArray[index].title;
        detailContent.innerHTML="";
        detailContent.innerHTML=`<p><b>Details: </b>${taskArray[index].details}  </p>
                <p><b>Priority:</b> <span class="${taskArray[index].priority}"> ${taskArray[index].priority}</span></p>
                <p><b>Due Date:</b> ${taskArray[index].date}</p>
                <p><b>Status:</b> ${taskArray[index].status} </p>`;
    };

    closeButton.addEventListener("click", () => {
        detailContainer.classList.add("hide");
    });
}

function edit (taskArray){
    const editButton=document.querySelectorAll(".edit");
    editButton.forEach((edit)=>{
        edit.addEventListener("click", editTask)
    });
    function editTask(){
        console.log("hello world");
    }
}

function checkmark(taskArray, projectArray = null) {
    const checkbox = document.querySelectorAll(".checkbox");
    
    checkbox.forEach((checkButton) => {
        checkButton.addEventListener("click", () => {
            const parentContainer = checkButton.closest(".tasks");
            const index = parentContainer.getAttribute("data-index");
            const taskTitle = parentContainer.querySelector(".task-title");

            // If projectArray is passed, use the second logic
            if (projectArray) {
                changeStatusProject(taskArray, index, projectArray);
            } else {
                changeStatus(taskArray, index);
            }

            if (taskArray[index].status === "complete") {
                taskTitle.style.opacity = "0.5";
            } else {
                taskTitle.style.opacity = "1";
            }
        });
    });
}
export { updateProjects, updateTasks, sortByTime, updateSelected, details, generateProjectTasks };