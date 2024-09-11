

function submitTodo(todoArray){
    const todoForm=document.getElementById("todo-form");
    const todoTitle=document.getElementById("todo-title").value;
    const todoDetail=document.getElementById("todo-detail").value;
    const todoDate=document.getElementById("dueDate").value;
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
    console.log(todoArray);
    todoForm.reset();
}


function submitProject(projectArray){
    const projectTitle=document.getElementById("project-title").value;
    const projectForm=document.getElementById("project-form");
    

    const projectTitleCheck = document.getElementById("project-title").value.trim();
    
    if (!projectTitleCheck) {
        alert("Project Title cannot be empty");
        return; 
    }
    projectArray.push(projectTitle);
    projectForm.reset();
    console.log(projectArray);
}

export {submitTodo,submitProject};