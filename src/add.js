export default function addTask(){
    const add=document.getElementById("add");
    const form=document.querySelector(".form-container");
    const close=document.getElementById("close-form");
    const task=document.getElementById("task");
    const project=document.getElementById("project");
    const taskForm=document.getElementById("todo-form");
    const projectForm=document.getElementById("project-form");

    close.addEventListener("click",function(){
        form.classList.add("hide");
        projectForm.reset();
        taskForm.reset();
    });
    add.addEventListener("click",function(){
        form.classList.remove("hide");
    });

    task.addEventListener("click",function(){
        if (taskForm.classList.contains("hide")) {
            taskForm.classList.remove("hide");
            if (!projectForm.classList.contains("hide")){
                projectForm.classList.add("hide");
            }
        }
    });

    project.addEventListener("click",function(){
        if (projectForm.classList.contains("hide")) {
            projectForm.classList.remove("hide");
            if (!taskForm.classList.contains("hide")){
                taskForm.classList.add("hide");
            }
        }
    })
}

