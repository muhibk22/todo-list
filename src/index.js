import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import {submitTodo,submitProject } from "./submit";
import {updateProjects ,updateTasks} from "./display";

document.addEventListener("DOMContentLoaded",function(){
    const todoBtn=document.getElementById("submit-todo");
    const projectBtn=document.getElementById("submit-project");
    const todoArray=[];
    const projectArray=[];

    navdrop();
    addTask();
    updateProjects(projectArray);
    updateTasks(todoArray);


    todoBtn.addEventListener("click",()=>submitTodo(todoArray));
    projectBtn.addEventListener("click",()=>submitProject(projectArray));
});