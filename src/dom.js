const domStuff = {

  renderProjects(projects) {
    const projectContainer = document.querySelector('.project-container');

    while (projectContainer.firstChild) {
      projectContainer.removeChild(projectContainer.firstChild);
    }

    projects.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');
      projectDiv.dataset.id = project.id;

      const editProject = document.createElement('div');
      editProject.classList.add('edit-project');
      editProject.textContent = 'Edit';
      editProject.addEventListener('click', project.edit.bind(project));

      const deleteProject = document.createElement('div');
      deleteProject.classList.add('delete-project');
      deleteProject.textContent = 'x';
      deleteProject.addEventListener('click', project.delete.bind(project));

      const pProject = document.createElement('p');
      pProject.classList.add('project-paragraph');
      pProject.textContent = project.name;
      if (project.selected) {
        pProject.addEventListener('click', project.close.bind(project));
      } else {
        pProject.addEventListener('click', project.open.bind(project, projectDiv, pProject));
      }

      if (project.selected) {
        editProject.classList.add('project-selected');
        deleteProject.classList.add('project-selected');
        projectDiv.classList.add('project-selected');
      }

      projectDiv.appendChild(editProject);
      projectDiv.appendChild(deleteProject);
      projectDiv.appendChild(pProject);

      projectContainer.appendChild(projectDiv);
    });

    const marginFixer = document.createElement('div');
    marginFixer.classList.add('margin-fixer-projects');
    marginFixer.textContent = 'margin';

    projectContainer.appendChild(marginFixer);
  },

  renderTasks(tasks) {
    const taskContainer = document.querySelector('.task-container');

    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }

    tasks.forEach((task) => {
      const taskWrapper = document.createElement('div');
      taskWrapper.classList.add('task-wrapper');

      const greenScreen = document.createElement('div');
      greenScreen.classList.add('green-screen');
      if (task.active) {
        greenScreen.classList.add('hidden');
      }

      const taskElement = document.createElement('div');
      taskElement.classList.add('task');

      const editTask = document.createElement('div');
      editTask.classList.add('edit-task');
      editTask.textContent = 'Edit';
      editTask.addEventListener('click', task.edit.bind(task));

      const deleteTask = document.createElement('div');
      deleteTask.classList.add('delete-task');
      deleteTask.textContent = 'Delete';
      deleteTask.addEventListener('click', task.delete.bind(task));

      const checkbox = document.createElement('div');
      checkbox.classList.add('checkbox');
      const x = document.createElement('div');
      x.classList.add('x');
      x.innerHTML = '<img src="check.png">';
      if (task.active) {
        x.classList.add('hidden');
      }
      checkbox.appendChild(x);
      checkbox.addEventListener('click', task.activeSwitch.bind(task, greenScreen, x));

      const titleContainer = document.createElement('div');
      titleContainer.classList.add('item-containers', 'title-descr-container');
      const title = document.createElement('h4');
      title.classList.add('top-task');
      title.textContent = task.name;
      titleContainer.appendChild(title);
      const description = document.createElement('p');
      description.classList.add('bottom-task');
      description.textContent = task.description;
      titleContainer.appendChild(description);

      const dueContainer = document.createElement('div');
      dueContainer.classList.add('item-containers', 'due-container');
      const dueDate = document.createElement('div');
      dueDate.classList.add('date', 'top-task');
      dueDate.textContent = task.due;
      dueContainer.appendChild(dueDate);
      const dueLabel = document.createElement('p');
      dueLabel.classList.add('bottom-task', 'due-p');
      dueLabel.textContent = 'Due';
      dueContainer.appendChild(dueLabel);

      const priorityContainer = document.createElement('div');
      priorityContainer.classList.add('item-containers', 'priority-container');
      const priority = document.createElement('div');
      priority.classList.add('priority', 'top-task', `priority-${task.priority}`);

      priorityContainer.appendChild(priority);
      const priorityLabel = document.createElement('p');
      priorityLabel.classList.add('bottom-task', 'priority-p');
      priorityLabel.textContent = task.priority[0].toUpperCase() + task.priority.slice(1);
      priorityContainer.appendChild(priorityLabel);

      taskElement.appendChild(editTask);
      taskElement.appendChild(deleteTask);
      taskElement.appendChild(checkbox);
      taskElement.appendChild(titleContainer);
      taskElement.appendChild(dueContainer);
      taskElement.appendChild(priorityContainer);

      taskWrapper.appendChild(greenScreen);
      taskWrapper.appendChild(taskElement);

      taskContainer.appendChild(taskWrapper);
    });

    const marginFixer = document.createElement('div');
    marginFixer.classList.add('margin-fixer-tasks');
    marginFixer.textContent = 'margin';

    taskContainer.appendChild(marginFixer);
  },
};

export default domStuff;
