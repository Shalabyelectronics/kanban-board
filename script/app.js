class CreatTaskComponent {
  constructor(type, id) {
    this.type = type;
    this.parantTasksList = document.querySelector(`#${this.type}-tasks ul`);
    this.taskId = id;
  }
  creatTaskElement = (taskValue, isDisabled = false) => {
    const creatTaskEl = document.createElement("li");
    creatTaskEl.id = this.taskId;
    creatTaskEl.setAttribute("draggable", "true");
    creatTaskEl.innerHTML = `
    <div class="task-container">
    <input class="task-input" type="text" placeholder="Task" value='${taskValue}' ${
      isDisabled ? "disabled" : ""
    } required/>
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

class DataStorage {
  static allData(started, progress, completed) {
    console.log(started, progress, completed);
  }
}

class TaskItem {
  constructor(
    type,
    id,
    removeTaskHandler,
    updateTaskValue,
    taskValue = "",
    isDisabled = false,
    submitTaskstatus = false
  ) {
    this.type = type;
    this.taskID = id;
    this.submitTask = submitTaskstatus;
    this.taskValue = taskValue;
    this.isDisabled = isDisabled;
    this.taskElement = new CreatTaskComponent(
      this.type,
      this.taskID
    ).creatTaskElement(this.taskValue, this.isDisabled);
    this.updateTaskValueHandler = updateTaskValue;
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
        if (this.submitTask) return;
        this.updateTaskValueHandler(this.taskElement, this.taskID);
        this.submitTask = true;
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
        if (this.submitTask) return;
        this.updateTaskValueHandler(this.taskElement, this.taskID);
        this.submitTask = true;
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
    this.getTasksFromLocalStorage();
  }

  generateRandomID = () => `task-${Math.floor(Math.random() * 1000000)}`;

  removeTaskHandler = (taskID) => {
    if (this.tasks.find((task) => task.id === taskID)) {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);
      this.saveTasksToLocalStorage();
    }
  };

  updateTaskValue = (taskElement, taskID) => {
    if (!this.tasks) return;
    const inputField = taskElement.querySelector("input");
    this.tasks.forEach((task) => {
      if (task.id === taskID) {
        task.input = inputField.value;
      }
    });
    this.saveTasksToLocalStorage();
  };

  saveTasksToLocalStorage = () => {
    if (!this.tasks) return;
    localStorage.setItem(
      `${this.type}TasksData`,
      JSON.stringify([...this.tasks])
    );
  };

  getTasksFromLocalStorage = () => {
    const tasksData = JSON.parse(localStorage.getItem(`${this.type}TasksData`));
    if (!tasksData) return;
    this.tasks = [...tasksData];
    this.tasks.forEach((task) => {
      new TaskItem(
        this.type,
        task.id,
        this.removeTaskHandler.bind(this),
        this.updateTaskValue.bind(this),
        task.input,
        true
      );
    });
  };

  recreateTasksFromStorage = () => {};

  creatTaskEl = () => {
    const taskID = this.generateRandomID();
    this.tasks.push({ id: taskID, input: "" });
    new TaskItem(
      this.type,
      taskID,
      this.removeTaskHandler.bind(this),
      this.updateTaskValue.bind(this)
    );
  };
}

class App {
  static init() {
    const startedTasksList = new TasksList("started");
    const progressTasksList = new TasksList("progress");
    const completedTasksList = new TasksList("completed");
    DataStorage.allData(
      startedTasksList.tasks,
      progressTasksList.tasks,
      completedTasksList.tasks
    );
  }
}

App.init();
