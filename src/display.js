import editImg from "./images/pencil.svg";
import deleteImg from "./images/delete.svg";

function updateProjects(projectArray){
    const projects=document.querySelector(".projects");
    const ul=document.createElement("ul");
    projects.appendChild(ul);
    if (projectArray.length===0){
        const li=document.createElement("li");
        li.innerText="Batman";
        ul.appendChild(li);
    }
};

function deleteTask(){
    const deleteButton=document.querySelectorAll(".delete");
    let index;
    deleteButton.forEach(button=>{
        button.addEventListener("click",()=>{
            const taskDiv=button.closest(".tasks");
            index=taskDiv.getAttribute("data-index");
            taskDiv.remove();
            console.log(index);
        });
    });
};


function updateTasks(taskArray){
    const taskContainer=document.querySelector(".task-container");
    if (taskArray.length===0){
        taskContainer.appendChild(createTask(0,"Do laundry", "Sep 12"));
        taskContainer.appendChild(createTask(1,"Go to the gym","Sep 12" ));
    }
    deleteTask();

}

function createTask(index,title,dueDate) {
    
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks');
    taskDiv.setAttribute('data-index', index );

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    taskDiv.appendChild(checkbox);

    const taskTitleDiv = document.createElement('div');
    taskTitleDiv.classList.add('task-title-div');
    
    
    const taskTitle = document.createElement('p');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title;
    taskTitleDiv.appendChild(taskTitle);
    
    taskDiv.appendChild(taskTitleDiv);

    const detailsButton = document.createElement('button');
    detailsButton.type = 'button';
    detailsButton.classList.add('details');
    detailsButton.textContent = 'Details';
    taskDiv.appendChild(detailsButton);

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = dueDate;
    taskDiv.appendChild(date);

    
    const editButton = document.createElement('img');
    editButton.src = editImg;
    editButton.alt = 'Edit';
    editButton.classList.add('modify-btn', 'edit');
    taskDiv.appendChild(editButton);

    const deleteButton = document.createElement('img');
    deleteButton.src = deleteImg;
    deleteButton.alt = 'Delete';
    deleteButton.classList.add('modify-btn', 'delete');
    taskDiv.appendChild(deleteButton);

    return taskDiv;
}

export {updateProjects,deleteTask,updateTasks};