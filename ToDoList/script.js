document.addEventListener("DOMContentLoaded", function () {
  const taskListContainer = document.querySelector("#task-list ul");
  const addTaskForm = document.forms["add-task"];
  const searchBox = document.forms["search"].querySelector("#search-box");

  //add task
  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputText = addTaskForm.querySelector('input[type="text"]').value;

    const taskWrapper = document.createElement("li");
    const taskName = document.createElement("span");
    const deleteButton = document.createElement("span");

    taskName.innerText = inputText;
    deleteButton.innerText = "delete";

    taskName.classList.add("name");
    deleteButton.classList.add("delete");

    taskWrapper.appendChild(taskName);
    taskWrapper.appendChild(deleteButton);

    taskListContainer.appendChild(taskWrapper);
  });

  //delete task
  taskListContainer.addEventListener("click", (e) => {
    if (e.target.className == "delete") {
      const list = e.target.parentElement;

      list.parentElement.removeChild(list);
    }
  });

  //seach-task
  searchBox.addEventListener("keyup", (e) => {
    const keyword = searchBox.value.toLowerCase();

    const tasks = taskListContainer.querySelectorAll("li");

    tasks.forEach((task) => {
      const taskName = task.querySelector("span.name").textContent;

      if (taskName.toLocaleLowerCase().includes(keyword)) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  });
});
