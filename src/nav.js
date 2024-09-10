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

