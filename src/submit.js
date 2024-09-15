import { generateProjectTasks, updateTasks } from "./display";
import { isBefore, startOfDay } from "date-fns";

let selectedPriority = "Low";

function initializePriority() {
    const priorityButton = document.querySelectorAll(".priority-btn");
    priorityButton.forEach(button => {
        button.addEventListener("click", () => {
            selectedPriority = button.textContent;
            console.log("Priority set to:", selectedPriority);

        });
    });
}

function checkDate(inputDate) {
    const today = startOfDay(new Date());

    const selectedDate = startOfDay(new Date(inputDate));

    if (isBefore(selectedDate, today)) {
        return false;
    } else {
        return true;
    }
}


function submitTodo(todoArray) {
    const todoForm = document.getElementById("todo-form");
    const todoTitle = document.getElementById("todo-title").value;
    const todoDetail = document.getElementById("todo-detail").value;
    const todoDate = document.getElementById("dueDate").value;
    const form = document.querySelector(".form-container");


    const todoTitleCheck = document.getElementById("todo-title").value.trim();


    if (!todoTitleCheck) {
        alert("Title can not be empty.");
        return;
    }
    if (!todoDate) {
        alert("Enter Due Date.");
        return;
    }
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    const todo = {
        title: todoTitle,
        details: todoDetail,
        date: todoDate,
        priority: selectedPriority,
        status: 'incomplete'
    };
    if (!checkDate(todoDate)) {
        alert("Due date is invalid.");
        return false;
    }
    else {
        todoArray.push(todo);
        todoForm.reset();
        const formFields = form.querySelectorAll('input, select, textarea, date');
        formFields.forEach((field) => {
            field.disabled = true;
        });
        form.classList.add("hide");
        console.log("New todo added:", todo);
        return true;
    }


}


function submitProject(projectArray) {
    const projectTitle = document.getElementById("project-title").value;
    const projectForm = document.getElementById("project-form");
    const form = document.querySelector(".form-container");

    const projectTitleCheck = document.getElementById("project-title").value.trim();

    if (!projectTitleCheck) {
        alert("Project Title cannot be empty");
        return;
    }
    const project = { title: projectTitle, tasks: [] };
    projectArray.push(project);
    projectForm.reset();
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach((field) => {
        field.disabled = true;
    });
    form.classList.add("hide");
}

function submitTask(projectArray, selectedProject) {
    const index = selectedProject.index;
    submitTodo(projectArray[index].tasks);
}

function editTask(index, taskArray) {
    const form = document.querySelector(".edit-container");
    const editForm = document.getElementById("edit-form");
    const todoTitle = document.getElementById("edit-title");
    const todoDetail = document.getElementById("edit-detail");
    const todoDate = document.getElementById("edit-dueDate");
    const priorityButton = document.querySelectorAll(".priority-btn");

    let selectedPriority = taskArray[index].priority;
    todoTitle.value = taskArray[index].title;
    todoDetail.value = taskArray[index].details;
    todoDate.value = taskArray[index].date;

    priorityButton.forEach(button => {
        button.classList.remove("selected");
        if (button.textContent === selectedPriority) {
            button.classList.add("selected");
        }
        button.addEventListener("click", () => {
            selectedPriority = button.textContent;
            priorityButton.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });


    function handleSubmit(event) {
        event.preventDefault();
        taskArray[index] = {
            title: todoTitle.value,
            details: todoDetail.value,
            date: todoDate.value,
            priority: selectedPriority,
            status: taskArray[index].status
        };

        console.log("Task updated:", taskArray[index]);

        editForm.reset();
        form.classList.add("hide");
        const formFields = form.querySelectorAll('input, select, textarea, date');
        formFields.forEach((field) => {
            field.disabled = true;
        });
        updateTasks(taskArray);
        editForm.removeEventListener("submit", handleSubmit);
    }
    editForm.addEventListener("submit", () => handleSubmit(event));
}

function editTaskProject(index, taskArray, projectArray) {
    const form = document.querySelector(".edit-container");
    const editForm = document.getElementById("edit-form");
    const todoTitle = document.getElementById("edit-title");
    const todoDetail = document.getElementById("edit-detail");
    const todoDate = document.getElementById("edit-dueDate");
    const priorityButton = document.querySelectorAll(".priority-btn");
    const projectIndex = document.querySelector(".title").getAttribute("index");
    console.log(index);
    let selectedPriority = taskArray[index].priority;
    todoTitle.value = taskArray[index].title;
    todoDetail.value = taskArray[index].details;
    todoDate.value = taskArray[index].date;

    priorityButton.forEach(button => {
        button.classList.remove("selected");
        if (button.textContent === selectedPriority) {
            button.classList.add("selected");
        }
        button.addEventListener("click", () => {
            selectedPriority = button.textContent;
            priorityButton.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });

    function handleSubmit(event) {
        event.preventDefault();
        projectArray[projectIndex].tasks[index] = {
            title: todoTitle.value,
            details: todoDetail.value,
            date: todoDate.value,
            priority: selectedPriority,
            status: taskArray[index].status
        };

        console.log("Project updated:", taskArray[index]);

        editForm.reset();
        form.classList.add("hide");
        const formFields = form.querySelectorAll('input, select, textarea, date');
        formFields.forEach((field) => {
            field.disabled = true;
        });
        generateProjectTasks(projectIndex, projectArray[projectIndex], projectArray);
        editForm.removeEventListener("submit", handleSubmit);
    }

    editForm.addEventListener("submit", () => handleSubmit(event));

}
export { submitTodo, submitProject, submitTask, editTask, editTaskProject, initializePriority };