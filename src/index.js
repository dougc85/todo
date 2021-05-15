import domStuff from './dom';

const screenCover = document.querySelector('.screen-cover');
const projectForm = document.querySelector('.project-form');
const taskForm = document.querySelector('.task-form');

const projectInput = document.querySelector('.project-input');

// Task Inputs
const nameInput = document.querySelector('.name-input');
const description = document.querySelector('.description-input');
const dueDate = document.querySelector('.due-input');
const priority = document.querySelector('.priority-input');

const addProjectButton = document.querySelector('.add-project');
const addTaskButton = document.querySelector('.add-task');

// Global State
let projects = [];
let projectCounter = 0;
let thisSolution;
let thisSolution2;
let currentProject = '';

// Factory functions - generate projects and tasks
const projectFactory = (projectName) => {
  projectCounter += 1;

  return {
    name: projectName,
    tasks: [],
    selected: true,
    id: projectCounter,

    delete() {
      const ind = projects.indexOf(this);
      projects.splice(ind, 1);
      domStuff.renderProjects(projects);

      if (currentProject.id === this.id) {
        currentProject = '';
        if (projects.length === 0) {
          document.querySelector('.tasks-header').innerHTML = 'Start by adding a project.<br> You must have a project selected in order to add tasks.';
        } else {
          document.querySelector('.tasks-header').textContent = 'Select Project to View or Add Tasks';
        }
        domStuff.renderTasks([]);
      }
      window.localStorage.setItem('todolist', JSON.stringify(projects));
    },

    edit() {
      // eslint-disable-next-line no-use-before-define
      thisSolution = editProjectSubmit.bind(this);

      projectInput.value = this.name;
      screenCover.classList.toggle('hidden');
      projectForm.classList.toggle('hidden');
      document.addEventListener('keydown', thisSolution);
      // eslint-disable-next-line no-use-before-define
      document.addEventListener('click', addProjectEscape);
      window.localStorage.setItem('todolist', JSON.stringify(projects));
    },

    open(projectDiv, pProject) {
      projectDiv.removeChild(pProject);

      projects.forEach((project) => {
        if (project.selected) {
          project.close();
        }
      });

      const pProjectClose = document.createElement('p');
      pProjectClose.classList.add('project-paragraph');
      pProjectClose.textContent = this.name;
      pProjectClose.addEventListener('click', this.close.bind(this));
      projectDiv.appendChild(pProjectClose);

      projectDiv.classList.add('project-selected');
      projectDiv.firstChild.classList.add('project-selected');
      projectDiv.firstChild.nextSibling.classList.add('project-selected');
      this.selected = true;
      currentProject = this;

      document.querySelector('.tasks-header').textContent = this.name.concat(' - Tasks');

      domStuff.renderTasks(this.tasks);
    },

    close() {
      const projectDiv = document.querySelector(`[data-id='${this.id}']`);
      const pProject = projectDiv.querySelector('.project-paragraph');

      projectDiv.removeChild(pProject);

      const pProjectOpen = document.createElement('p');
      pProjectOpen.classList.add('project-paragraph');
      pProjectOpen.textContent = this.name;
      pProjectOpen.addEventListener('click', this.open.bind(this, projectDiv, pProjectOpen));
      projectDiv.appendChild(pProjectOpen);

      projectDiv.classList.remove('project-selected');
      projectDiv.firstChild.classList.remove('project-selected');
      projectDiv.firstChild.nextSibling.classList.remove('project-selected');

      this.selected = false;
      currentProject = '';

      document.querySelector('.tasks-header').textContent = 'Select Project to View or Add Tasks';
      domStuff.renderTasks([]);
    },
  };
};

const taskFactory = (
  projectId,
  taskName,
  descriptionInput,
  due,
  priorityInput,
  month,
  day,
  year,
  inputDateFormat,
) => (
  {
    due,
    month,
    day,
    year,
    inputDateFormat,
    project: projectId,
    name: taskName,
    description: descriptionInput,
    priority: priorityInput,
    active: true,

    activeSwitch(greenScreen, x) {
      this.active = !this.active;
      greenScreen.classList.toggle('hidden');
      x.classList.toggle('hidden');
      // eslint-disable-next-line no-use-before-define
      sortTasks(currentProject.tasks);
      domStuff.renderTasks(currentProject.tasks);
    },

    delete() {
      const ind = currentProject.tasks.indexOf(this);
      currentProject.tasks.splice(ind, 1);
      domStuff.renderTasks(currentProject.tasks);
      window.localStorage.setItem('todolist', JSON.stringify(projects));
    },

    edit() {
      // eslint-disable-next-line no-use-before-define
      thisSolution = editTaskKeydown.bind(this);
      // eslint-disable-next-line no-use-before-define
      thisSolution2 = editTaskClick.bind(this);

      nameInput.value = this.name;
      description.value = this.description;
      dueDate.value = this.inputDateFormat;
      priority.value = this.priority;

      screenCover.classList.toggle('hidden');
      taskForm.classList.toggle('hidden');
      document.addEventListener('keydown', thisSolution);
      document.addEventListener('click', thisSolution2);
      window.localStorage.setItem('todolist', JSON.stringify(projects));
    },
  });

const sortProjects = (projectsList) => {
  projectsList.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    return 1;
  });
  window.localStorage.setItem('todolist', JSON.stringify(projects));
};

const priorityRanking = {
  lowest: 1,
  low: 2,
  medium: 3,
  high: 4,
  highest: 5,
};

const sortTasks = (tasks) => {
  tasks.sort((a, b) => {
    // Compare active status
    if (a.active === b.active) {
      // Then compare priority
      if (priorityRanking[a.priority] === priorityRanking[b.priority]) {
        // then compare date due
        if (a.due === b.due) {
          // then compare names
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 1;
        }
        if (a.year !== b.year) {
          return parseInt(a.year, 10) - parseInt(b.year, 10);
        }
        if (a.month !== b.month) {
          return a.month - b.month;
        }
        if (a.day !== b.day) {
          return a.day - b.day;
        }
      }
      return priorityRanking[b.priority] - priorityRanking[a.priority];
    }
    if (a.active) {
      return -1;
    }
    return 1;
  });
  window.localStorage.setItem('todolist', JSON.stringify(projects));
};

function editProjectSubmit(e) {
  if (e.key === 'Enter') {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', addProjectEscape);
    document.removeEventListener('keydown', thisSolution);
    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    const ind = projects.indexOf(this);
    projects[ind].name = projectInput.value;
    sortProjects(projects);
    domStuff.renderProjects(projects);
    projectInput.value = '';
    window.localStorage.setItem('todolist', JSON.stringify(projects));
  } else if (e.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', addProjectEscape);
    document.removeEventListener('keydown', thisSolution);
    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    projectInput.value = '';
  }
}

const addProjectSubmit = (e) => {
  if (e.key === 'Enter') {
    if (projectInput.value === '') {
      return;
    }

    // Remove listeners and remove popup
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', addProjectEscape);
    document.removeEventListener('keydown', addProjectSubmit);

    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');

    // create new project, open it, and open tasks, render all
    const newProject = projectFactory(projectInput.value);
    currentProject = newProject;
    projects.forEach((project) => {
      const proj = project;
      proj.selected = false;
    });
    projects.push(newProject);
    sortProjects(projects);
    document.querySelector('.tasks-header').textContent = newProject.name.concat(' - Tasks');
    domStuff.renderProjects(projects);
    projectInput.value = '';
    domStuff.renderTasks(newProject.tasks);
    window.localStorage.setItem('todolist', JSON.stringify(projects));
  } else if (e.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', addProjectEscape);
    document.removeEventListener('keydown', addProjectSubmit);
    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    projectInput.value = '';
  }
};

const addProjectEscape = (e) => {
  if (e.target === screenCover) {
    document.removeEventListener('click', addProjectEscape);
    document.removeEventListener('keydown', addProjectSubmit);
    screenCover.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    projectInput.value = '';
  }
};

const addProjectHandler = () => {
  screenCover.classList.toggle('hidden');
  projectForm.classList.toggle('hidden');
  document.addEventListener('keydown', (addProjectSubmit));
  document.addEventListener('click', (addProjectEscape));
};

function editTaskKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();

    // Disable if form is not filled out
    if (nameInput.value === '' || description.value === '' || dueDate.value === '' || priority.value === 'select one') {
      return;
    }
    // Remove listeners and remove popup
    document.removeEventListener('keydown', thisSolution);
    document.removeEventListener('click', thisSolution2);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');

    // create new task and display it

    const dateYear = dueDate.value.slice(2, 4);
    const dateMonth = (dueDate.value[5] === '0') ? dueDate.value.slice(6, 7) : dueDate.value.slice(5, 7);
    const dateDay = (dueDate.value[8] === '0') ? dueDate.value.slice(9) : dueDate.value.slice(8);

    // Not working Part
    const ind = currentProject.tasks.indexOf(this);
    const currentTask = currentProject.tasks[ind];

    currentTask.name = nameInput.value;
    currentTask.description = description.value;
    currentTask.due = `${dateMonth}/${dateDay}/${dateYear}`;
    currentTask.day = dateDay;
    currentTask.month = dateMonth;
    currentTask.year = dateYear;
    currentTask.inputDateFormat = dueDate.value;
    currentTask.priority = priority.value;

    sortTasks(currentProject.tasks);
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';

    domStuff.renderTasks(currentProject.tasks);
    window.localStorage.setItem('todolist', JSON.stringify(projects));
  } else if (e.key === 'Escape') {
    document.removeEventListener('click', thisSolution2);
    document.removeEventListener('keydown', thisSolution);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';
  }
}

function editTaskClick(e) {
  e.preventDefault();
  if (e.target === document.querySelector('.submit-button')) {
    // Disable if form is not filled out
    if (nameInput.value === '' || description.value === '' || dueDate.value === '' || priority.value === 'select one') {
      return;
    }
    // Remove listeners and remove popup
    document.removeEventListener('keydown', thisSolution);
    document.removeEventListener('click', thisSolution2);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');

    // update task

    const dateYear = dueDate.value.slice(2, 4);
    const dateMonth = (dueDate.value[5] === '0') ? dueDate.value.slice(6, 7) : dueDate.value.slice(5, 7);
    const dateDay = (dueDate.value[8] === '0') ? dueDate.value.slice(9) : dueDate.value.slice(8);

    const ind = currentProject.tasks.indexOf(this);
    const currentTask = currentProject.tasks[ind];

    currentTask.name = nameInput.value;
    currentTask.description = description.value;
    currentTask.due = `${dateMonth}/${dateDay}/${dateYear}`;
    currentTask.day = dateDay;
    currentTask.month = dateMonth;
    currentTask.year = dateYear;
    currentTask.inputDateFormat = dueDate.value;
    currentTask.priority = priority.value;

    sortTasks(currentProject.tasks);
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';

    domStuff.renderTasks(currentProject.tasks);
    window.localStorage.setItem('todolist', JSON.stringify(projects));
  } else if (e.target === screenCover) {
    document.removeEventListener('click', thisSolution2);
    document.removeEventListener('keydown', thisSolution);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';
  }
}

const addTaskKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    // Disable if form is not filled out
    if (nameInput.value === '' || description.value === '' || dueDate.value === '' || priority.value === 'select one') {
      return;
    }
    // Remove listeners and remove popup
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', addTaskClick);
    document.removeEventListener('keydown', addTaskKeydown);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');

    // create new task and display it

    const dateYear = dueDate.value.slice(2, 4);
    const dateMonth = (dueDate.value[5] === '0') ? dueDate.value.slice(6, 7) : dueDate.value.slice(5, 7);
    const dateDay = (dueDate.value[8] === '0') ? dueDate.value.slice(9) : dueDate.value.slice(8);

    const newTask = taskFactory(currentProject.id, nameInput.value, description.value, `${dateMonth}/${dateDay}/${dateYear}`, priority.value, dateMonth, dateDay, dateYear, dueDate.value);
    currentProject.tasks.push(newTask);

    sortTasks(currentProject.tasks);
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';

    domStuff.renderTasks(currentProject.tasks);
    window.localStorage.setItem('todolist', JSON.stringify(projects));
  } else if (e.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', addTaskClick);
    document.removeEventListener('keydown', addTaskKeydown);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';
  }
};

const addTaskClick = (e) => {
  e.preventDefault();
  if (e.target === document.querySelector('.submit-button')) {
    // Disable if form is not filled out
    if (nameInput.value === '' || description.value === '' || dueDate.value === '' || priority.value === 'select one') {
      return;
    }

    // Remove listeners and remove popup
    document.removeEventListener('click', addTaskClick);
    document.removeEventListener('keydown', addTaskKeydown);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');

    // create new task and display it

    const dateYear = dueDate.value.slice(2, 4);
    const dateMonth = (dueDate.value[5] === '0') ? dueDate.value.slice(6, 7) : dueDate.value.slice(5, 7);
    const dateDay = (dueDate.value[8] === '0') ? dueDate.value.slice(9) : dueDate.value.slice(8);

    const newTask = taskFactory(currentProject.id, nameInput.value, description.value, `${dateMonth}/${dateDay}/${dateYear}`, priority.value, dateMonth, dateDay, dateYear, dueDate.value);
    currentProject.tasks.push(newTask);

    sortTasks(currentProject.tasks);
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';

    domStuff.renderTasks(currentProject.tasks);
    window.localStorage.setItem('todolist', JSON.stringify(projects));
  } else if (e.target === screenCover) {
    document.removeEventListener('click', addTaskClick);
    document.removeEventListener('keydown', addTaskKeydown);
    screenCover.classList.toggle('hidden');
    taskForm.classList.toggle('hidden');
    nameInput.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'select one';
  }
};

const addTaskHandler = () => {
  if (currentProject === '') {
    return;
  }
  screenCover.classList.toggle('hidden');
  taskForm.classList.toggle('hidden');
  document.addEventListener('keydown', (addTaskKeydown));
  document.addEventListener('click', (addTaskClick));
};

addProjectButton.addEventListener('click', addProjectHandler);
addTaskButton.addEventListener('click', addTaskHandler);

const localStore = window.localStorage.getItem('todolist');

if (localStore) {
  const simpleProjectsArray = JSON.parse(localStore);
  projects = simpleProjectsArray.map((simpleProject) => {
    const tasks = simpleProject.tasks.map((task) => {
      const {
        projectId,
        taskName,
        descriptionInput,
        due,
        priorityInput,
        month,
        day,
        year,
        inputDateFormat,
      } = task;
      return taskFactory(
        projectId,
        taskName,
        descriptionInput,
        due,
        priorityInput,
        month,
        day,
        year,
        inputDateFormat,
      );
    });
    const newProject = projectFactory(simpleProject.name);
    newProject.tasks = tasks;
    newProject.id = simpleProject.id;
    return newProject;
  });
  domStuff.renderProjects(projects);
}
