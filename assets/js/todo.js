let addBtn = document.querySelector('#todo-btn');
let addInputVal = document.querySelector('#todo-input');
let todoItemContainer = document.querySelector('.todo-items')
let statusCompleteBtns = [];
let todoArr = {completed_item:[], in_progress: []};
let isEdit = false;
let editItemIndex =  -1;

let addItemHandler = () => {
  if(!addInputVal.value) {
    addInputVal.style.borderColor = 'red';
    return false
  };
  let data = {
    completed: false,
    task: addInputVal.value
  }
  if(isEdit) {
    todoArr.in_progress[0].task = addInputVal.value;
  }else {
    todoArr.in_progress.push(data);
  }

  localStorage.setItem('todo_item', JSON.stringify(todoArr));

  domUpdateHandler(data);
  addInputVal.value = null;
}

function todoInputChange(event) {
  if(addInputVal.value) {
    addInputVal.style.borderColor = '#ced4da'
  }
}

const domUpdateHandler = (providedData = todoArr, type) => {
  todoItemContainer.innerHTML = '';
  if(!localStorage.getItem('todo_item')) {
    localStorage.setItem('todo_item', JSON.stringify({completed_item:[], in_progress: []}));
  }
  todoArr = JSON.parse(localStorage.getItem('todo_item'));
  providedData = todoArr;
  providedData.in_progress.forEach((item) => {
    createListEl(item)
  })

  checkItemStatus()
}

const createListEl= (item) => {
  let listItem = document.createElement('li')
  listItem.innerHTML = `
                <span class="flex-grow-1">${item.task}</span>
                <div>
                  <button class="btn check-btn">
                    <img src="https://img.icons8.com/material/24/000000/checkmark--v4.png"/>
                  </button>
                  <button class="btn complete-btn">
                    <img src="https://img.icons8.com/ios-filled/24/000000/edit--v1.png"/>
                  </button>
                </div>
  `
  todoItemContainer.append(listItem)
}

// Edit and complete
const checkItemStatus = () => {
  let items = Array.from(document.querySelectorAll('.check-btn'));

  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      // if(todoArr.in_progress.length) {
        todoArr.in_progress[index].completed = true;
        let completed = todoArr.in_progress.splice(index, 1);

        todoArr.completed_item.push(completed);
        localStorage.setItem('todo_item', JSON.stringify(todoArr));
        domUpdateHandler(todoArr);
      // }
    })
  })
}


domUpdateHandler(todoArr);
addBtn.addEventListener('click', addItemHandler);
