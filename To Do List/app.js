const addTaskBtn = document.querySelector('button[type=submit]');
const taskList = document.querySelector('#task-list');
const filterTask = document.querySelector('.filter-task');
const clearTasksBtn = document.querySelector('.clear-tasks');

// Get Tasks
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        CreateElement(task);
    });
});

// Add Task
addTaskBtn.addEventListener('click', (e) => {

    // Getting Value from the DOM
    e.preventDefault();
    let inputValue = e.target.previousElementSibling.firstElementChild;
    
    // Creating the Element
    if(inputValue !== "")
    {
        // Creating the element
        CreateElement(inputValue.value);
    
        // Setting the value to the browser
        AddTaskToTheLocalStorage(inputValue.value);
        
        // Resetting the input value to null
        inputValue.value = "";
    }

});

// Remove Task
taskList.addEventListener('click', (e) =>{

    if(e.target.parentElement.parentElement.parentElement.classList.contains('task'))
    {
        const del = e.target.parentElement.parentElement.innerText;

        // Removing the Item from the DOM
        e.target.parentElement.parentElement.parentElement.remove();

        // Removing the Item from the Local Storage
        RemoveTaskToTheLocalStorage(del);
    }
});

// Filter Task
filterTask.addEventListener('keyup', (e) => {

    const tasks = document.querySelectorAll('.task');
    const text = e.target.value.toLowerCase();

    tasks.forEach(task => {

        const content = task.firstChild.innerText.toLowerCase();
        if(content.indexOf(text) === -1)
        {
            task.style.display = 'none';
        }
        else
        {
            task.style.display = 'block';
        }
    });
});

// Clear Tasks
clearTasksBtn.addEventListener('click', (e) => {

    document.querySelectorAll('.task').forEach(task => {
        task.remove();
    });
    localStorage.clear();

}); 

const CreateElement = value => {

    // Creating the Element
    const newTask = document.createElement('div');
    newTask.classList = 'bg-info m-1 task';
    newTask.innerHTML = `<p class="p-2 text-light"> ${value}
                            <a href="#" class = "float-right text-light text-decoration-none">
                                <i class="fa-lg fas fa-minus-circle"></i>
                            </a>
                        </p> `;

    // Adding the new Element to the Markup
    taskList.appendChild(newTask);
}

const AddTaskToTheLocalStorage = task => {

    let localStorageTaskList;
    if(localStorage.getItem('tasks') === null)
    {
        localStorageTaskList = [];
    }
    else
    {
        localStorageTaskList = JSON.parse(localStorage.getItem('tasks'));
    }
    localStorageTaskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(localStorageTaskList));
}

const RemoveTaskToTheLocalStorage = del => {

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task, index) => {
        if(del === task)
        {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}