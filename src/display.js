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

export {updateProjects};