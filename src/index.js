import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo,submitProject } from "./submit";
import { updateProjects } from "./display";

document.addEventListener("DOMContentLoaded",function(){
    navdrop();
    addTask();
    const todoBtn=document.getElementById("submit-todo");
    const projectBtn=document.getElementById("submit-project");
    const todoArray=[];
    const projectArray=[];
    updateProjects(projectArray);
    todoBtn.addEventListener("click",()=>submitTodo(todoArray));
    projectBtn.addEventListener("click",()=>submitProject(projectArray));
});