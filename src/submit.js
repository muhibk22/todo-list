
function submitTodo(todoArray){
    const todoForm=document.getElementById("todo-form");
    const todoTitle=document.getElementById("todo-title").value;
    const todoDetail=document.getElementById("todo-detail").value;
    const todoDate=document.getElementById("dueDate").value;
    const form=document.querySelector(".form-container");
    let selectedPriority="Low";

    const priorityButton=document.querySelectorAll(".priority-btn");
    const todoTitleCheck=document.getElementById("todo-title").value.trim();

    if (!todoTitleCheck){
        alert ("Title can not be empty ");
        return;
    }
    if (!todoDate){
        alert("Enter Due Date");
        return;
    }
    priorityButton.forEach(button=>{
        button.addEventListener("click",()=>{
            selectedPriority=button.textContent;
        });
    })

    const todo = {
        title: todoTitle,
        details: todoDetail,
        date: todoDate,
        priority: selectedPriority,
        status: 'incomplete' 
    };

    todoArray.push(todo);
    todoForm.reset();
    const formFields = form.querySelectorAll('input, select, textarea, date');
    formFields.forEach((field) => {
        field.disabled = true;
    });
    form.classList.add("hide");

}


function submitProject(projectArray){
    const projectTitle=document.getElementById("project-title").value;
    const projectForm=document.getElementById("project-form");
    const form=document.querySelector(".form-container");

    const projectTitleCheck = document.getElementById("project-title").value.trim();
    
    if (!projectTitleCheck) {
        alert("Project Title cannot be empty");
        return; 
    }
    const project={title: projectTitle, tasks: []};
    projectArray.push(project);
    projectForm.reset();
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach((field) => {
        field.disabled = true;
    });
    form.classList.add("hide");
}

function submitTask(projectArray, selectedProject){
    const index=selectedProject.index;
    submitTodo(projectArray[index].tasks);
    console.log(selectedProject.index);
}

export {submitTodo,submitProject, submitTask};