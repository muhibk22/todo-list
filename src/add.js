export default function addTask() {
    const add = document.getElementById("add");
    const form = document.querySelector(".form-container");
    const close = document.getElementById("close-form");
    const task = document.getElementById("task");
    const project = document.getElementById("project");
    const taskForm = document.getElementById("todo-form");
    const projectForm = document.getElementById("project-form");
    const closeEdit=document.getElementById("close-edit");
    const editForm=document.getElementById("edit-form");
    const editContainer=document.querySelector(".edit-container");

    closeEdit.addEventListener("click", function(){
        editContainer.classList.add("hide");
        editForm.reset();
    })

    close.addEventListener("click", function () {
        form.classList.add("hide");
        projectForm.reset();
        taskForm.reset();
    });
    add.addEventListener("click", function () {
        const priorityButton = document.querySelectorAll(".priority-btn");
        const formFields = form.querySelectorAll('input, select, textarea, date');
        form.classList.remove("hide");
        formFields.forEach((field) => {
            field.disabled = false;
        });
        priorityButton.forEach(button => {
            button.addEventListener("click", () => {
                priorityButton.forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
            });
        });
    });

    task.addEventListener("click", function () {
        if (taskForm.classList.contains("hide")) {
            taskForm.classList.remove("hide");
            if (!projectForm.classList.contains("hide")) {
                projectForm.classList.add("hide");
            }
        }
    });

    project.addEventListener("click", function () {
        if (projectForm.classList.contains("hide")) {
            projectForm.classList.remove("hide");
            if (!taskForm.classList.contains("hide")) {
                taskForm.classList.add("hide");
            }
        }
    })
}

