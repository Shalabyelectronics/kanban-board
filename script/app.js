class AddTasks {
  constructor(addBtnClassName) {
    this.addBtnId = addBtnClassName;
    this.allAddBtns = document.querySelectorAll(this.addBtnId);
    this.allAddBtns.forEach((btn) =>
      btn.addEventListener("click", this.creatTaskEl.bind(this, btn))
    );
  }

  lockInput = () => {};

  editTask = (editIconClassName) => {
    const editIconEle = document.querySelector(editIconClassName);
  };

  creatTaskEl = (addBtn) => {
    const creatLi = document.createElement("li");
    const addBtnParentId = addBtn.parentElement.querySelector("ul").id;
    const parentList = document.getElementById(addBtnParentId);
    creatLi.innerHTML = `
    <input class="task-input" type="text" placeholder="Task" />
    <span class="action-icon edit-task">
        <i class="fa-regular fa-pen-to-square"></i>
    </span>
    <span class="action-icon remove-task">
        <i class="fa-sharp fa-solid fa-trash"></i>
    </span>
    `;
    parentList.append(creatLi);
  };
}

class App {
  static init() {
    new AddTasks(".add-task-btn");
  }
}

App.init();
