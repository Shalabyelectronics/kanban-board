class AddTasks {
  constructor(addBtnClassName) {
    this.addBtnId = addBtnClassName;
    this.allAddBtns = document.querySelectorAll(this.addBtnId);
    this.allAddBtns.forEach((btn) =>
      btn.addEventListener("click", this.creatTaskEl.bind(this, btn))
    );
  }

  lockInput = (parenetElement) => {
    const inputField = parenetElement.firstElementChild;
    inputField.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      e.target.disabled = true;
    });
  };

  editTask = (editIconClassName) => {
    const editIconEle = document.querySelector(editIconClassName);
  };

  creatTaskEl = (addBtn) => {
    const creatLi = document.createElement("li");
    const addBtnParentId = addBtn.parentElement.querySelector("ul").id;
    const parentList = document.getElementById(addBtnParentId);
    creatLi.innerHTML = `
    <input class="task-input" type="text" placeholder="Task" />
        <i class="action-icon edit-task fa-regular fa-pen-to-square"></i>
        <i class="action-icon remove-task fa-sharp fa-solid fa-trash"></i>
    `;
    parentList.append(creatLi);
    this.lockInput(creatLi);
  };
}

class App {
  static init() {
    new AddTasks(".add-task-btn");
  }
}

App.init();
