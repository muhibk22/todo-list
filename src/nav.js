import closeImg from "./images/window-close.svg";

export default function navdrop(){
    const navButton=document.getElementById("navigation");
    const sidebar=document.querySelector(".sidebar");
    const toggleNav=()=>{
        sidebar.classList.toggle("show");
        if (navButton.textContent=="☰"){
            navButton.innerHTML=`<img src="${closeImg}"/>`;

        }
        else{
            navButton.innerHTML=`&#9776;`;
        }
    }
    navButton.addEventListener("click",toggleNav);
   
}

export function closeNav(){
    const li= document.querySelectorAll("li");
    const sidebar=document.querySelector(".sidebar");
    const navButton=document.getElementById("navigation");

    li.forEach((list)=>{
        list.removeEventListener("click", closeBar);
        list.addEventListener("click", closeBar);
    });
 
    
    function closeBar(){
        sidebar.classList.toggle("show");
        if (navButton.textContent=="☰"){
            navButton.innerHTML=`<img src="${closeImg}"/>`;

        }
        else{
            navButton.innerHTML=`&#9776;`;
        }
    }
}
