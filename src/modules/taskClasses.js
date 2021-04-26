export {Task, UI, List, addNewTask }
import {hideTaskCreate, hideProjectCreate,tabSwitch} from './functions'

// Task Class: Represent tasks 
class Task {
  constructor(taskTitle, description, project, dueDate ){
    this.taskTitle = taskTitle;
    this.description = description;
    this.project = project;
    this.dueDate = dueDate;
  }
} 

//UI Class: Handle UI Tasks
class UI {
  static displayTask() {
    const tasks = List.getTasks();
    tasks.forEach((task) => UI.addTaskToList(task));
  }
  static addTaskToList(task){
    const list = document.querySelector(`#task-list-${task.project}`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td> ${task.taskTitle}</td>
      <td> ${task.description}</td>
      <td> ${task.dueDate}</td>
      <td> ${task.project}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
    `;
    list.appendChild(row);  
  };
static deleteTask(el){
  if (el.classList.contains('delete')){
    el.parentElement.parentElement.remove();
  }
}

static showAlert(message ,className){
  const div =document.createElement('div');
  div.className=`alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#task-form');
container.insertBefore(div, form);
//vanish in 4 seconds
setTimeout(() => document.querySelector('.alert').remove(),4000);
};

static clearFields(){
    document.querySelector('#taskTitle').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#dueDate').value = '';
    document.querySelector('#project').value = '';
  };
}

//List Class: Handles Storage
class List {
  static getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
      tasks =[];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  };
  static addTask(task){
    console.log('also here');
    const tasks = List.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  static removeTask(project){
    console.log('finally here');
   const tasks = List.getTasks();
  
   tasks.forEach((task, index) => {
        if (project !==task.project) {
          tasks.splice(index, 1);
        };
      });
      //JSON.stringify(
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log("Finished removing tasks from local")
  };
};

//Event: Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);

//Event: Add Task
function addNewTask () {
  document.getElementById('task-add').addEventListener('click', (e) => {
  //prevent default value from being submitted
    e.preventDefault();

    //get form values
      const taskTitle = document.querySelector('#taskTitle').value;
      const description = document.querySelector('#description').value;
      const project = document.querySelector('#project').value;
      const dueDate = document.querySelector('#dueDate').value;

  //Validate Book
    if(taskTitle === '' || description === '' || project === '' || dueDate === ''){
      UI.showAlert('Form not complete', 'danger');
    } else {
  //instantiate book
    const task = new Task(taskTitle, description, project, dueDate);
    //add book to UI
    UI.addTaskToList(task);
    //add book to store

    List.addTask(task);
    //show success message
    UI.showAlert('task added', 'success');
    //clear fields
    UI.clearFields();
    hideTaskCreate();
    }
  });
  };

// //Event: Remove Book

document.querySelector(`#table-ondeck`).addEventListener('click', (e) =>{
  //remove book from UI
  UI.deleteTask(e.target);
  //remove book from store
  List.removeTask(e.target.parentElement.previousElementSibling.textContent);
  //show remove alert
   UI.showAlert('Task removed', 'success');
});
document.querySelector(`#table-dugout`).addEventListener('click', (e) =>{
  //remove book from UI
  UI.deleteTask(e.target);
  //remove book from store
  List.removeTask(e.target.parentElement.previousElementSibling.textContent);
  //show remove alert
   UI.showAlert('Task removed', 'success');
});
document.querySelector(`#table-atbat`).addEventListener('click', (e) =>{
  //remove book from UI
  UI.deleteTask(e.target);
  //remove book from store
  List.removeTask(e.target.parentElement.previousElementSibling.textContent);
  //show remove alert
   UI.showAlert('Task removed', 'success');
});

export function addNewProject () {
  document.getElementById('project-add').addEventListener('click', (e) => {
  //prevent default value from being submitted
    e.preventDefault();
    const navBar = document.querySelector(".nav-tabs");
    const newItem = document.createElement('li');
    //"nav-item"
    newItem.className = "nav-item";

    const link = document.createElement('a');
    link.className = "nav-link";
    link.setAttribute("data-toggle", "tab");
    // link.data-toggle = "tab";
    const newProjectName = document.getElementById("projectName").value;
    link.innerText = newProjectName;
    link.href = `#${newProjectName}`;
    link.id = `${newProjectName}`;
    navBar.appendChild(newItem);
    newItem.appendChild(link);
    //add projects tasks table

  let newTable = document.createElement('div');
  newTable.className = "tab-pane fade";
  newTable.id = `${newProjectName}_tasks`;
  newTable.innerHTML = `
  <table class="table table-striped mt-5" id="table-${newProjectName}">
            <thead>
              <th>Task</th>
              <th>Description</th>
              <th>Project</th>
              <th>Due Date</th>
              <th></th>
            </thead>
            <tbody id="task-list-${newProjectName}"></tbody>
          </table>`;
document.getElementById("myTabContent").appendChild(
newTable);
    //add to tabs array 
     tabSwitch();
     hideProjectCreate();
  console.log("yes");
  });
};
