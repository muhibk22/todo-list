import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo, submitProject } from "./submit";
import { updateProjects, updateTasks,initilizeTask} from "./display";
import {loadTasksFromLocalStorage,saveToStorage} from "./storage";

document.addEventListener("DOMContentLoaded", function () {
    const todoBtn = document.getElementById("submit-todo");
    const projectBtn = document.getElementById("submit-project");
    const todoArray = [];
    const projectArray = [];

    navdrop();
    addTask();

    loadTasksFromLocalStorage(todoArray);
    updateProjects(projectArray);
    console.log(todoArray);
   
    if (todoArray.length===0){
        initilizeTask(todoArray);
    }
    updateTasks(todoArray);

    todoBtn.addEventListener("click", () => {
        submitTodo(todoArray)
        updateTasks(todoArray);
    });
    projectBtn.addEventListener("click", () => submitProject(projectArray));
});