async function getProjects() {
    const response = await fetch('/json/projects.json');
    const data = await response.json();
    console.log(data);
    return data;
}

function autoDetectProject(){
    // get device type if mobile or desktop 
    if (window.innerWidth <= 768){
        renderProjects(true)
        // document.getElementById("pjwarnsel").innerText = "You are using mobile device, some features may not work properly."
    } else {
        renderProjects(false)
        console.log("desktop")
    }

}

async function renderProjects(datasaver) {
    // warning box fade out
    const warningBox = document.getElementById('pjwarnsel');
    warningBox.remove();

    // warningBox.classList.add('fade-out');
    // setTimeout(() => {
    //     warningBox.remove();
    // }, 1000);

    // loading text
    const loadingText = document.createElement('p');
    loadingText.id = 'p-loading-text';
    loadingText.innerText = 'Loading...';
    document.querySelector('.projects-container').appendChild(loadingText);

    getProjects().then(data => {
        const projectsContainer = document.querySelector('.projects-container');
        data.forEach(project => {
            projectsContainer.appendChild(createProject(project, datasaver));
        });
    }
    ).then(() => {
        document.getElementById('p-loading-text').remove();
    });

}

function createProject(data, datasaver) {
    const project = document.createElement('div');
    project.classList.add('project');
    // format example
    // {
    //     "name":"BCC Student Searcher",
    //     "description":"Search for students at BCC",
    //     "author":"Phat Lorthammakun",
    //     "version":"Dev",
    //     "image":"https://bss.phatlor.me/img/logo.png",
    //     "details":{
    //         "GitHub":"",
    //         "Website":"https://bss.phatlor.me/"
    //     }
    // },

    if (data.image && !datasaver) {
        const projectImage = document.createElement('img');
        projectImage.src = data.image;
        project.appendChild(projectImage);
    }

    if (data.name) {
        const projectName = document.createElement('h3');
        projectName.innerText = data.name;
        project.appendChild(projectName);
    }

    if (data.description) {
        const projectDescription = document.createElement('p');
        projectDescription.innerText = data.description;
        project.appendChild(projectDescription);
    }

    project.appendChild(document.createElement('br'));

    //  section div
    const projectSection = document.createElement('div');
    projectSection.classList.add('project-section');
    project.appendChild(projectSection);


    if (data.author) {
        const projectAuthor = document.createElement('p');
        projectAuthor.innerText = data.author;
        projectSection.appendChild(projectAuthor);
    }

    if (data.version) {
        const projectVersion = document.createElement('p');
        projectVersion.innerText = data.version;
        projectSection.appendChild(projectVersion);
    }

    if (data.details) {
        const projectUrls = document.createElement('div');
        projectUrls.classList.add('project-links');
        project.appendChild(projectUrls);

        
        if (data.details.Website) {
            const projectWebsite = document.createElement('a');
            projectWebsite.href = data.details.Website;
            projectWebsite.classList.add('project-link');
            projectWebsite.classList.add('website');
            projectWebsite.target = '_blank';
            projectWebsite.innerHTML = '<i class="fas fa-globe"></i>';
            projectUrls.appendChild(projectWebsite);
        }
        if (data.details.GitHub) {
            const projectGitHub = document.createElement('a');
            projectGitHub.href = data.details.GitHub;
            projectGitHub.classList.add('project-link');
            projectGitHub.classList.add('github');
            projectGitHub.target = '_blank';
            projectGitHub.innerHTML = '<i class="fab fa-github"></i>';
            projectUrls.appendChild(projectGitHub);
        }
    }

    return project;
}
