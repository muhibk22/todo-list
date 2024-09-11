import "./styles.css";
import "./form.css"
import navdrop from "./nav";
import addTask from "./add";
import { submitTodo,submitProject } from "./submit";

document.addEventListener("DOMContentLoaded",function(){
    navdrop();
    addTask();
    const todoBtn=document.getElementById("submit-todo");
    const todoArray=[];
    todoBtn.addEventListener("click",()=>submitTodo(todoArray));
})