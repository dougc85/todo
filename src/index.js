import domStuff from './dom.js';

const screenCover = document.querySelector('.screen-cover');
const projectForm = document.querySelector('.project-form');
const taskForm = document.querySelector('.task-form');


const addProjectButton = document.querySelector('.add-project');
const addTaskButton = document.querySelector('.add-task');






let projects = [];

const projectFactory = (projectName) => {
    return {name: projectName,
            todos: [],
            selected: false}
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



const addProjectSubmit = (e) => {
    if (e.key === 'Enter') {
        document.removeEventListener('keydown', addProjectSubmit);
        const projectInput = document.querySelector('.project-input');
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');
        projects.push(projectFactory(projectInput.value));
        sortProjects(projects);
        domStuff.renderProjects(projects);
        projectInput.value = '';
    }
}

const addProjectHandler = (e) => {
    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    document.addEventListener('keydown', (addProjectSubmit));
}

addProjectButton.addEventListener('click', addProjectHandler);

