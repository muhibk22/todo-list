import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo, submitProject } from "./submit";
import { updateProjects, updateTasks,initializeTask, initializeProject} from "./display";
import {loadTasks,loadProjects} from "./storage";

document.addEventListener("DOMContentLoaded", function () {
    const todoBtn = document.getElementById("submit-todo");
    const projectBtn = document.getElementById("submit-project");
    const todoArray = [];
    const projectArray = [];

    navdrop();
    addTask();

    loadTasks(todoArray);
    updateTasks(todoArray);
    loadProjects(projectArray);
    updateProjects(projectArray);
   
    // if (todoArray.length===0){
    //     initilizeTask(todoArray);
    // }

    todoBtn.addEventListener("click", () => {
        submitTodo(todoArray)
        updateTasks(todoArray);
    });
    projectBtn.addEventListener("click", () => {
        submitProject(projectArray)
        updateProjects(projectArray);
    });
});