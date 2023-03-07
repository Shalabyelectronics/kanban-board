class AddTasks {
  constructor(addBtnClassName) {
    this.addBtnId = addBtnClassName;
    this.allAddBtns = document.querySelectorAll(this.addBtnId);
    this.allAddBtns.forEach((btn) =>
      btn.addEventListener("click", this.creatTaskEl.bind(this, btn))
    );
  }

  lockInputByEnter = (parenetElement) => {
    const inputField = parenetElement.firstElementChild;
    inputField.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      e.target.disabled = true;
    });
    return inputField;
  };

  lockInputByBodyClick = () => {
    const allInpust = document.querySelectorAll("input");
    document.body.addEventListener("click", (e) => {
      if (["button", "i", "input"].includes(e.target.localName)) return;
      allInpust.forEach((input) => {
        input.disabled = true;
      });
    });
  };

  editInputField = (inputFieldElement) => {
    const editElement = inputFieldElement.nextElementSibling;

    editElement.addEventListener("click", (e) => {
      const input = e.target.parentElement.firstElementChild;
      input.disabled = false;
    });
    return editElement;
  };

  removeElement = (editElement) => {
    const removeElement = editElement.nextElementSibling;
    removeElement.addEventListener("click", (e) => {
      e.target.parentElement.remove();
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
    const inputField = this.lockInputByEnter(creatLi);
    const editElement = this.editInputField(inputField);
    this.removeElement(editElement);
    this.lockInputByBodyClick();
  };
}

class App {
  static init() {
    new AddTasks(".add-task-btn");
  }
}

App.init();
