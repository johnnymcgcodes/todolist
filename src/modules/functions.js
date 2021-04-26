
import {Task} from './taskClasses'
//set new task form due date min/current day limit
export function dateLimits (){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var yearOut = yyyy + 1
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
var oneYearFromNow = new Date();
today = yyyy+'-'+mm+'-'+dd;
oneYearFromNow = yearOut +'-'+mm+'-'+dd;
document.getElementById("dueDate").setAttribute("min", today);
document.getElementById("dueDate").setAttribute("max", oneYearFromNow);
}

//hide new task form unless needed 
export function revealTaskCreate (){ 
      document.getElementById("task-form").style.display = "initial";
      document.getElementById("project-form").style.display = "none";
    };
export function hideTaskCreate(){

    if (document.getElementById("task-form").style.display = "initial"){
    document.getElementById("task-form").style.display = "none";

}
}

export function revealProjectCreate (){
    document.getElementById("project-form").style.display = "initial";
    document.getElementById("task-form").style.display = "none";
}
export function hideProjectCreate(){
    if (document.getElementById("project-form").style.display = "initial"){
    document.getElementById("project-form").style.display = "none";
    }
}

export function tabSwitch (){
  let tabs = document.querySelector(".nav-tabs").children;
  let tabsArray = [...tabs];

  tabsArray.forEach((tab, index) => {
  let tabid = tab.firstElementChild.id;
    document.getElementById(tabid).addEventListener('click', function(){
    document.getElementById(tabid).className = "nav-link active";
    document.getElementById(`${tabid}_tasks`).className = "tab-pane fade active show";
   
      tabsArray.forEach((tab, i) => {
        if (i !== index){
          tabsArray[i].className = "nav-link inactive";
          tabsArray[i].firstElementChild.className = "nav-link";
          let baseId = (tabsArray[i].firstElementChild.id);
          document.getElementById(`${baseId}_tasks`).className = "tab-pane fade inactive";
        }
      });
  });
  })
}