import domStuff from './dom.js';

const screenCover = document.querySelector('.screen-cover');
const projectForm = document.querySelector('.project-form');
const taskForm = document.querySelector('.task-form');

const projectInput = document.querySelector('.project-input');

//Task Inputs
const nameInput = document.querySelector('.name-input');
const description = document.querySelector('.description-input');
const dueDate = document.querySelector('.due-input');
const priority = document.querySelector('.priority-input');

const addProjectButton = document.querySelector('.add-project');
const addTaskButton = document.querySelector('.add-task');

//Global State
let projects = [];
let projectCounter = 0;
let thisSolution;
let currentProject = 'none';

console.log('ldlkm');

//Factory functions - generate projects and tasks
const projectFactory = (projectName) => {
    projectCounter += 1;

    const edProj = editProjectSubmit.bind(this);

    return {name: projectName,
        tasks: [],
        selected: true,
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
        },

        open(projectDiv, pProject) {

            projectDiv.removeChild(pProject);

            projects.forEach(project => {
                if (project.selected) {
                    project.close();
                }
            })

            const pProjectClose = document.createElement('p');
            pProjectClose.classList.add('project-paragraph')
            pProjectClose.textContent = this.name;
            pProjectClose.addEventListener('click', this.close.bind(this));
            projectDiv.appendChild(pProjectClose);

            projectDiv.classList.add('project-selected');
            projectDiv.firstChild.classList.add('project-selected');
            projectDiv.firstChild.nextSibling.classList.add('project-selected');
            this.selected = true;
            currentProject = this;

            document.querySelector('.tasks-header').textContent = this.name + " - Tasks"

            domStuff.renderTasks(this.tasks);
        },

        close() {
            const projectDiv = document.querySelector(`[data-id='${this.id}']`);
            let pProject = projectDiv.querySelector(".project-paragraph")

            projectDiv.removeChild(pProject);

            const pProjectOpen = document.createElement('p');
            pProjectOpen.classList.add('project-paragraph')
            pProjectOpen.textContent = this.name;
            pProjectOpen.addEventListener('click', this.open.bind(this, projectDiv, pProjectOpen));
            projectDiv.appendChild(pProjectOpen);

            projectDiv.classList.remove('project-selected');
            projectDiv.firstChild.classList.remove('project-selected');
            projectDiv.firstChild.nextSibling.classList.remove('project-selected');

            this.selected = false;
            currentProject = '';

            document.querySelector('.tasks-header').textContent = "Select Project to View Tasks";
            domStuff.renderTasks([]);
        }
    }
}

const taskFactory = (taskName, description, due, priority) => {
    return {
        name: taskName,
        description: description,
        due: due,
        priority: priority,
        active: true,

        delete() {
            return;
        },

        edit() {
            return;
        }
    }
}

const sortProjects = (projects) => {
    projects.sort((a,b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
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
        //Remove listeners and remove popup
        document.removeEventListener('click', addProjectEscape);
        document.removeEventListener('keydown', addProjectSubmit);
        screenCover.classList.toggle('hidden');
        projectForm.classList.toggle('hidden');

        //create new project, open it, and open tasks, render all
        const newProject = projectFactory(projectInput.value);
        currentProject = newProject;
        projects.forEach(project => {
            project.selected = false;
        })
        projects.push(newProject);
        sortProjects(projects);
        document.querySelector('.tasks-header').textContent = newProject.name + " - Tasks"
        domStuff.renderProjects(projects);
        projectInput.value = '';
        domStuff.renderTasks(newProject.tasks);
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

const addTaskSubmit = (e) => {
    if (e.key === 'Enter') {
        //Remove listeners and remove popup
        document.removeEventListener('click', addTaskEscape);
        document.removeEventListener('keydown', addTaskSubmit);
        screenCover.classList.toggle('hidden');
        taskForm.classList.toggle('hidden');

        //create new task and display it

        /* const nameInput = document.querySelector('.name-input');
        const description = document.querySelector('.description-input');
        const dueDate = document.querySelector('.due-input');
        const priority = document.querySelector('.priority-input'); */

        const dateYear = dueDate.value.slice(0, 2);
        const dateMonth = (dueDate.value[5] === '0') ? dueDate.value.slice(6, 7): dueDate.value.slice(5, 7);
        const dateDay = (dueDate.value[8] === '0') ? dueDate.value.slice(9): dueDate.value.slice(8);

        const newTask = taskFactory(nameInput.value, description.value, (dateMonth + '/' + dateDay +  '/' + dateYear), priority.value);
        currentProject.tasks.push(newTask);

        //sortTasks(currentProject.tasks);
        nameInput.value = '';
        description.value = '';
        dueDate.value = '';
        priority.value = 'lowest';

        domStuff.renderTasks(currentProject.tasks);

    } else if (e.key === 'Escape') {
        document.removeEventListener('click', addTaskEscape);
        document.removeEventListener('keydown', addTaskSubmit);
        screenCover.classList.toggle('hidden');
        taskForm.classList.toggle('hidden');
        
        console.log(dueDate.value);
        nameInput.value = '';
        description.value = '';
        dueDate.value = '';
        priority.value = 'lowest';
    }
}

const addTaskEscape = (e) => {
    if (e.target === screenCover) {
        document.removeEventListener('click', addTaskEscape);
        document.removeEventListener('keydown', addTaskSubmit);
        screenCover.classList.toggle('hidden');
        taskForm.classList.toggle('hidden');

        console.log(dueDate.value);
        nameInput.value = '';
        description.value = '';
        dueDate.value = '';
        priority.value = 'lowest';
    }
}

const addTaskHandler = (e) => {
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');
    document.addEventListener('keydown', (addTaskSubmit));
    document.addEventListener('click', (addTaskEscape));
}

addProjectButton.addEventListener('click', addProjectHandler);
addTaskButton.addEventListener('click', addTaskHandler);


