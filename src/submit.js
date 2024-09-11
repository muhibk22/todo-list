function submitTodo(todoArray){
    const todoForm=document.getElementById("todo-form");
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    const todoTitle=document.getElementById("todo-title").value;
    const todoDetail=document.getElementById("todo-detail").value;
    const todoDate=document.getElementById("dueDate").value;
    let selectedPriority="Low";
    const priorityButton=document.querySelectorAll(".priority-btn");
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


function submitProject(){

}

export {submitTodo,submitProject};