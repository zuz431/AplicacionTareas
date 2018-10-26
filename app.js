document.getElementById('formTask').addEventListener('submit',SaveTask);

function SaveTask(e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const TASK = {
        title, //title: title
        description//description: description
    };

    if(localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(TASK);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(TASK);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    GetTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();
}

function GetTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length;i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class = "btn btn-danger" onclick="DeleteTasks('${title}')">Delete</a>
            </div>
        </div>`
    }
}

function DeleteTasks(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i,1);
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
    GetTasks();
}

GetTasks();