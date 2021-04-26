import {dateLimits, revealTaskCreate, revealProjectCreate, tabSwitch ,hideProjectCreate,hideTaskCreate, listenForAddTask} from './modules/functions.js';
import {Task, UI, List, addNewTask, addNewProject} from './modules/taskClasses';

//set form due date min/current day limit
dateLimits();
//listen for new task creation
document.getElementById("newtask").addEventListener('click', revealTaskCreate);
document.getElementById("newproject").addEventListener('click', revealProjectCreate);

// listenForAddTask();
addNewTask();
addNewProject();
UI.displayTask();
tabSwitch();
