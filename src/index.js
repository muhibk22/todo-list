import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { closeNav } from "./nav";
import { submitTodo, submitProject, submitTask, initializePriority} from "./submit";
import { updateProjects, updateTasks, sortByTime, updateSelected, generateProjectTasks} from "./display";
import { loadTasks, loadProjects } from "./storage";


document.addEventListener("DOMContentLoaded", function () {
    const todoBtn = document.getElementById("submit-todo");
    const projectBtn = document.getElementById("submit-project");
    const todoArray = [];
    const projectArray = [];
    let selecedProject = {index: null };

    navdrop();
    addTask();
    closeNav();
    initializePriority();

    loadTasks(todoArray);
    updateTasks(todoArray);
    loadProjects(projectArray);
    updateProjects(projectArray);
    sortByTime(todoArray);
    updateSelected(selecedProject);

    todoBtn.addEventListener("click", () => {
        if (selecedProject.index===null){
            submitTodo(todoArray);
            updateTasks(todoArray);
        }
        else {
            submitTask(projectArray, selecedProject);
            generateProjectTasks(selecedProject.index, projectArray[selecedProject.index], projectArray);
        }
    });
    projectBtn.addEventListener("click", () => {
        submitProject(projectArray);
        updateProjects(projectArray);
        updateSelected(selecedProject);
    });
});