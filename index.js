import { projects, skills } from "/data.js";

const usingNow = document.getElementById("using-now")
const learning = document.getElementById("learning")
const allProjects = document.getElementById("all-projects-container")
const menuEl = document.getElementById("menu")
const cancelEl = document.getElementById("cancel")
const dropdownEl = document.querySelector(".dropdown-menu")

// window.addEventListener("resize", () => {
//     if (window.innerWidth >= 750) {
//         navEl.classList.remove("hide")
//       } else if (window.innerWidth < 750) {
//         navEl.classList.add("hide")
//       }
// })

const getUsingNowHtml = () => {
    let html = ""

    skills[0].map(skill => {
        html += `
            <div>
                <img src="/images/${skill.icon}.png" alt="${skill.icon} logo" >
                <p>${skill.name}</p>
            </div>
        `
    })

    return html
}

const getLearningHtml = () => {
    let html = ""

    skills[1].map(skill => {
        html += `
            <div>
                <img src="/images/${skill.icon}.png" alt="${skill.icon} logo" >
                <p>${skill.name}</p>
            </div>
        `
    })

    return html
}


const getProjectsHtml = () => {
    let html = ""
    
    projects.map(project => {
        const {name, image, desc, github, demo, skills} = project
        
        let skillHtml = ""
        
        skills.map(skill => {
            skillHtml += `
                <img src="./images/${skill}.png" alt="${skill} logo" >
            `
        })
    
        html += `
            <div class="project-container">
                <img src="./images/${image}.png">
                <div class="project-info">
                    <h2>${name}</h2>
                    <div class="project-tools-container">
                        ${skillHtml}
                    </div>
                    <p>${desc}</p>
                    <div class="project-links">
                        <a href="${github}" target="_blank"><div>
                            <p>Code</p>
                            <img class="github" src="./images/github.png" alt="github">
                        </div></a>
                        <a href="${demo}" target="_blank"><div>
                            <p>Demo</p>
                            <img class="link" src="./images/link.png" alt="link">
                        </div></a>
                    </div>
                </div>
            </div>
        `
    })
    
    return html
}

menuEl.onclick = () => {
    const isOpen = dropdownEl.classList.contains("open")
    dropdownEl.classList.toggle("open")

    menuEl.classList = isOpen ? 
        "fa-solid fa-bars" :
        "fa-solid fa-xmark"
}

document.getElementById("my-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData)

    fetch("submit.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      const messageContainer = document.getElementById("message-container");
      messageContainer.innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
  });

const render = () => {
    usingNow.innerHTML = getUsingNowHtml()
    learning.innerHTML = getLearningHtml()
    allProjects.innerHTML = getProjectsHtml()
}

render()