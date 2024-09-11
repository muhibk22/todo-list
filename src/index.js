import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo, submitProject } from "./submit";
import { updateProjects, updateTasks} from "./display";
import {loadTasks,loadProjects} from "./storage";
import { format } from 'date-fns';

document.addEventListener("DOMContentLoaded", function () {
    const todoBtn = document.getElementById("submit-todo");
    const projectBtn = document.getElementById("submit-project");
    const todoArray = [];
    const projectArray = [];

    const date = new Date(2024, 8, 12);
    const formatDate= format(date,"MMM d");
    console.log(formatDate);

    navdrop();
    addTask();

    loadTasks(todoArray);
    updateTasks(todoArray);
    loadProjects(projectArray);
    updateProjects(projectArray);
   

    todoBtn.addEventListener("click", () => {
        submitTodo(todoArray)
        updateTasks(todoArray);
    });
    projectBtn.addEventListener("click", () => {
        submitProject(projectArray)
        updateProjects(projectArray);
    });
});