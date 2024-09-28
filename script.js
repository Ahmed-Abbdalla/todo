let input = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTasksMsg = document.querySelector(".no-tasks-message");
let taskCount = document.querySelector(".tasks-cout span");
let tasksCompleted = document.querySelector(".tasks-completed span");

// focus on input field
window.addEventListener("onload", input.focus());

//run sweet alert

runSweetAlert = () => {
  Swal.fire(" Please Enter the Tasks !");
};

sweetAlertSameTask = () => {
  Swal.fire(" this task is found before !");
};

// check id task already exists
function taskExists(taskText) {
  let tasks = document.querySelectorAll(".task-box");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].firstChild.textContent.trim() === taskText.trim()) {
      return true;
    }
  }
  return false;
}

//adding the task :

addButton.addEventListener("click", () => {
  if (input.value === "") {
    runSweetAlert();
    return false;
  } else if (taskExists(input.value)) {
    sweetAlertSameTask();
    return false;
    // Show alert if task already exists
  } else {
    noTasksMsg.remove(); // Remove "No Tasks To Show" message if present
  }
  // create Mainspan element
  let mainSpan = document.createElement("span");
  //add class to main span
  mainSpan.classList.add("task-box");
  // create Delete button
  deleteElement = document.createElement("span");
  // create class to delete button
  deleteElement.classList.add("delete");

  //add text to mainSpan
  mainSpan.appendChild(document.createTextNode(input.value));
  //add text to delete button ;
  deleteElement.appendChild(document.createTextNode("Delete"));
  // add delete button to mainspan
  mainSpan.appendChild(deleteElement);

  // add task to html ele
  tasksContainer.appendChild(mainSpan);

  //   console.log(typeof tasksContainer.childElementCount);
  getTaskCout(tasksContainer.childElementCount);

  checkComplieted();

  input.value = "";
});

// delete button action
document.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    e.target.parentNode.remove();
    getTaskCout(tasksContainer.childElementCount);

    if (tasksContainer.children.length === 0) {
      tasksContainer.appendChild(noTasksMsg);
    }
  }
});

// finisth task

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("task-box")) {
    event.target.classList.toggle("finished");
  }
});

function getTaskCout(value) {
  document.querySelector(".tasks-count").firstElementChild.textContent = value;
}

function checkComplieted() {
  let count = 0;
  [...tasksContainer.children].forEach((ele) => {
    if (ele.classList.contains("finished")) {
      count++;
    }
  });
  document.querySelector(".tasks-completed span").textContent = count;
}
