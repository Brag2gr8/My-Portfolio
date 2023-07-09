import { projects, skills } from "/data.js"

const downloadButton = document.querySelector('.download-btn')
const downloadMessage = document.querySelector(".download-message-container")
const consentCheckbox = document.getElementById('consent-checkbox')
const usingNow = document.getElementById("using-now")
const learning = document.getElementById("learning")
const allProjects = document.getElementById("all-projects-container")
const menuEl = document.getElementById("menu")
const dropdownEl = document.querySelector(".dropdown-menu")

AOS.init()

menuEl.onclick = () => {
    const isOpen = dropdownEl.classList.contains("open")
    dropdownEl.classList.toggle("open")

    menuEl.classList = isOpen ? 
        "fa-solid fa-bars" :
        "fa-solid fa-xmark"
}

document.getElementById("my-form").addEventListener("submit", (e) => {
    e.preventDefault()
    e.target.reset()
    const success = document.querySelector(".message-container")
    success.style.display = "block"
    setTimeout(()=> {
        success.style.display = "none"
    }, 5000) 
})



downloadButton.onclick = () => {
  if (consentCheckbox.checked) {
    const resumeUrl = "https://drive.google.com/uc?export=download&id=13qReKLk0lN6tI3qmmE_SD1SUi7YChQM0";

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iPad|iPhone|iPod/i.test(userAgent);
    
    if (isMobile) {
      window.open(resumeUrl, '_blank');
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = resumeUrl;
      downloadLink.download = 'resume.pdf'; 
      downloadLink.click();
    }
    
    downloadMessage.style.display = "block";
    setTimeout(()=> {
        downloadMessage.style.display = "none";
    }, 5000) 
  } else {
    alert("Please give your consent to download my resume.");
  }
};


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
            <div class="project-container"  data-aos="zoom-in">
                <img src="./images/${image}.png">
                <div class="project-info">
                    <h2>${name}</h2>
                    <div class="project-tools-container">
                        ${skillHtml}
                    </div>
                    <p>${desc}</p>
                    <div class="project-links">
                        <a href="https://github.com/brag2gr8/${github}" target="_blank"><div>
                            <p>Code</p>
                            <img class="github" src="./images/github.png" alt="github">
                        </div></a>
                        <a href="https://${demo}.netlify.app" target="_blank"><div>
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

const render = () => {
    usingNow.innerHTML = getUsingNowHtml()
    learning.innerHTML = getLearningHtml()
    allProjects.innerHTML = getProjectsHtml()
}

render()