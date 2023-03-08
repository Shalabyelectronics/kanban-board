class CreatTaskComponent {
  constructor(type, id) {
    this.type = type;
    this.parantTasksList = document.querySelector(`#${this.type}-tasks ul`);
    this.taskId = id;
  }
  creatTaskElement = () => {
    const creatTaskEl = document.createElement("li");
    creatTaskEl.id = this.taskId;
    creatTaskEl.setAttribute("draggable", "true");
    creatTaskEl.innerHTML = `
    <div class="task-container">
    <input class="task-input" type="text" placeholder="Task" required/>
    <i class="action-icon edit-task fa-regular fa-pen-to-square"></i>
    <i class="action-icon remove-task fa-sharp fa-solid fa-trash"></i>
    </div>
    <div class='error-box'>
    <small class="error-message"> Please Add a task </small>
    </div>
    `;
    this.parantTasksList.append(creatTaskEl);
    return creatTaskEl;
  };
}

class TaskItem {
  constructor(type, id, removeTaskHandler) {
    this.type = type;
    this.taskID = id;
    this.taskElement = new CreatTaskComponent(
      this.type,
      this.taskID
    ).creatTaskElement();
    this.removeTaskHandler = removeTaskHandler;
    this.lockInputByEnter();
    this.lockInputByBodyClick();
    this.editInputField();
    this.removeElement();
  }

  // 1
  lockInputByEnter = () => {
    const inputField = this.taskElement.querySelector("input");
    const error = this.taskElement.querySelector(".error-message");
    inputField.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      if (e.target.value.trim()) {
        e.target.disabled = true;
        error.classList.remove("show");
        inputField.classList.remove("input-error");
      } else {
        error.classList.add("show");
        inputField.classList.add("input-error");
      }
    });
  };

  // 2
  lockInputByBodyClick = () => {
    const inputField = this.taskElement.querySelector("input");
    const error = this.taskElement.querySelector(".error-message");
    document.body.addEventListener("click", (e) => {
      if (["button", "i", "input"].includes(e.target.localName)) return;
      if (inputField.value.trim()) {
        inputField.disabled = true;
        error.classList.remove("show");
        inputField.classList.remove("input-error");
      } else {
        error.classList.add("show");
        inputField.classList.add("input-error");
      }
    });
  };

  // 3
  editInputField = () => {
    const editElement = this.taskElement.querySelector(".edit-task");
    editElement.addEventListener("click", () => {
      const input = this.taskElement.querySelector("input");
      input.disabled = false;
    });
  };

  // 4
  removeElement = () => {
    const removeElement = this.taskElement.querySelector(".remove-task");
    removeElement.addEventListener("click", () => {
      this.taskElement.remove();
      this.removeTaskHandler(this.taskID);
    });
  };
}

class TasksList {
  tasks = [];
  constructor(type) {
    this.type = type;
    this.parantTasksList = document.querySelector(`#${this.type}-tasks`);
    this.taskList = this.parantTasksList.querySelector("ul");
    this.taskAddBtn = this.parantTasksList.querySelector("button");
    this.taskAddBtn.addEventListener("click", this.creatTaskEl.bind(this));
  }

  generateRandomID = () => `task-${Math.floor(Math.random() * 1000000)}`;

  removeTasksHandler(taskID) {
    if (this.tasks.find((id) => id === taskID)) {
      this.tasks = this.tasks.filter((id) => id !== taskID);
    }
  }

  creatTaskEl = () => {
    const taskID = this.generateRandomID();
    this.tasks.push(taskID);
    new TaskItem(this.type, taskID, this.removeTasksHandler.bind(this));
    console.log(this.tasks);
  };
}

class App {
  static init() {
    const startedTasksList = new TasksList("started");
    const progressTasksList = new TasksList("progress");
    const completedTasksList = new TasksList("completed");
  }
}

App.init();
