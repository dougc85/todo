




const domStuff = {

    renderProjects(projects) {
        const projectContainer = document.querySelector('.project-container');

        while (projectContainer.firstChild) {
            projectContainer.removeChild(projectContainer.firstChild);
        }

        projects.forEach(project => {

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
            pProject.textContent = project.name;

            if (project.selected) {
                editProject.classList.add('project-selected');
                deleteProject.classList.add('project-selected');
                Projectdiv.classList.add('project-selected');
            }

            projectDiv.appendChild(editProject);
            projectDiv.appendChild(deleteProject);
            projectDiv.appendChild(pProject);

            projectContainer.appendChild(projectDiv);
        })
    },

    renderTasks(tasks) {
        const taskContainer = document.querySelector('.task-container');

        while (taskContainer.firstChild) {
            taskContainer.removeChild(task.firstChild);
        }

        tasks.forEach(task => {

            const taskWrapper = document.createElement('div');
            taskWrapper.classList.add('task-wrapper');



            const greenScreen = document.createElement('div');
            greenScreen.classList.add('green-screen', 'hidden');

            const taskElement = document.createElement('div');
            taskElement.classList.add('task');


            
            const editTask = document.createElement('div');
            editTask.classList.add('edit-task');
            editTask.textContent = "Edit";

            const deleteTask = document.createElement('div');
            deleteTask.classList.add('delete-task');
            deleteTask.textContent = "Delete";

            const checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            const x = document.createElement('div');
            x.classList.add('x', 'hidden');
            checkbox.appendChild(x);

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
        })

    }
};

export default domStuff;