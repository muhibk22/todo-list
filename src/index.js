import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo, submitProject } from "./submit";
import { updateProjects, updateTasks, sortByTime,initializeProject } from "./display";
import { loadTasks, loadProjects, selected } from "./storage";


document.addEventListener("DOMContentLoaded", function () {
    const todoBtn = document.getElementById("submit-todo");
    const projectBtn = document.getElementById("submit-project");
    const todoArray = [];
    const projectArray = [];
    let selectedProject = { title: "", tasks:[]};

    navdrop();
    addTask();

    loadTasks(todoArray);
    updateTasks(todoArray);
    loadProjects(projectArray);
    updateProjects(projectArray);
    sortByTime(todoArray);
    selected(selectedProject);


    todoBtn.addEventListener("click", () => {
        submitTodo(todoArray)
        updateTasks(todoArray);
    });
    projectBtn.addEventListener("click", () => {
        submitProject(projectArray)
        updateProjects(projectArray);
    });
});