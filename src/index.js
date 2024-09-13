import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo, submitProject, submitTask} from "./submit";
import { updateProjects, updateTasks, sortByTime, updateSelected} from "./display";
import { loadTasks, loadProjects } from "./storage";


document.addEventListener("DOMContentLoaded", function () {
    const todoBtn = document.getElementById("submit-todo");
    const projectBtn = document.getElementById("submit-project");
    const todoArray = [];
    const projectArray = [];
    let selecedProject = {index: null };

    navdrop();
    addTask();

    loadTasks(todoArray);
    updateTasks(todoArray);
    loadProjects(projectArray);
    updateProjects(projectArray);
    sortByTime(todoArray);
    updateSelected(selecedProject);

    todoBtn.addEventListener("click", () => {
        if (selecedProject.index===null){
            submitTodo(todoArray);
        }
        else {
            submitTask(projectArray, selecedProject);
        }
    });
    projectBtn.addEventListener("click", () => {
        submitProject(projectArray)
        updateProjects(projectArray);
    });
});