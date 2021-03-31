import domStuff from './dom.js';

const screenCover = document.querySelector('.screen-cover');
const projectForm = document.querySelector('.project-form');
const taskForm = document.querySelector('.task-form');

const projectInput = document.querySelector('.project-input');


const addProjectButton = document.querySelector('.add-project');
const addTaskButton = document.querySelector('.add-task');






let projects = [];
let projectCounter = 0;

let thisSolution;

const projectFactory = (projectName) => {
    projectCounter += 1;

    const edProj = editProjectSubmit.bind(this);

    return {name: projectName,
            todos: [],
            selected: false,
            id: projectCounter,
            
            delete() {
                let ind = projects.indexOf(this);
                projects.splice(ind, 1);
                domStuff.renderProjects(projects);
            },

            edit() {
                thisSolution = editProjectSubmit.bind(this);

                projectInput.value = this.name;
                screenCover.classList.toggle('hidden');
                projectForm.classList.toggle('hidden');
                document.addEventListener('keydown', thisSolution);
                document.addEventListener('click', addProjectEscape);
            }
        }
}

const sortProjects = (projects) => {
    projects.sort((a,b) => {
        if (a.name < b.name) {
            return -1;
        }
        else {
            return 1;
        }
    })
}

function editProjectSubmit(e) {
    if (e.key === 'Enter') {
        document.removeEventListener('click', addProjectEscape);
        document.removeEventListener('keydown', thisSolution);
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');
        let ind = projects.indexOf(this);
        projects[ind].name = projectInput.value;
        sortProjects(projects);
        domStuff.renderProjects(projects);
        projectInput.value = '';
    } else if (e.key === 'Escape') {
        document.removeEventListener('click', addProjectEscape);
        document.removeEventListener('keydown', thisSolution);
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');
        projectInput.value = '';
    }
}

const addProjectSubmit = (e) => {
    if (e.key === 'Enter') {
        document.removeEventListener('click', addProjectEscape);
        document.removeEventListener('keydown', addProjectSubmit);
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');
        projects.push(projectFactory(projectInput.value));
        sortProjects(projects);
        domStuff.renderProjects(projects);
        projectInput.value = '';
    } else if (e.key === 'Escape') {
        document.removeEventListener('click', addProjectEscape);
        document.removeEventListener('keydown', addProjectSubmit);
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');
        projectInput.value = '';
    }
}

const addProjectEscape = (e) => {
    if (e.target === screenCover) {
        document.removeEventListener('click', addProjectEscape);
        document.removeEventListener('keydown', addProjectSubmit);
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');
        projectInput.value = '';
    }
}

const addProjectHandler = (e) => {
    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    document.addEventListener('keydown', (addProjectSubmit));
    document.addEventListener('click', (addProjectEscape));
}

addProjectButton.addEventListener('click', addProjectHandler);

