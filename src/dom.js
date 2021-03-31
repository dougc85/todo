




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
    }
};

export default domStuff;