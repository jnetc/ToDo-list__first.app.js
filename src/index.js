import App from './component/app';
const app = new App();

  // Global scope function
  // Глобальная функция для загрузки всех событий
globalEvents();

  // All events
function globalEvents() {

    // Load created tasks from LS
  window.addEventListener('DOMContentLoaded', loadLocalStarage);

    // Get value by press Button
  app.btnApp.addEventListener('click', getText);

    // Create new task by press Button
  app.btnApp.addEventListener('click', createEl);

    // Create index task by press Button
  app.btnApp.addEventListener('click', addIndex);

    // Delete task from tasklist
  app.toDoList.addEventListener('click', deleteTask);

    // Delete task from tasklist
  // app.toDoList.addEventListener('click', delValFromLocalStorage);
}

  // Get value by press Button
const getText = txt => app.inputTxt.value;

  // Create el by press Button
function createEl() {
  if (!getText() == '') {

      // Create empty array
    const storageTask = [];

      // Check LS if has key. If key not found, add this
    if (localStorage.getItem('tasks') == null) {

        // Adding input value in array 
      storageTask.push(getText());

        // Putting array in LS
      localStorage.setItem('tasks', JSON.stringify(storageTask));
    } else {

        // If LS has key, array. Getting & parsing this
      const getStorageArr = JSON.parse(localStorage.getItem('tasks'));

        // Adding new value from input
      getStorageArr.push(getText());

        // Putting array in LS
      localStorage.setItem('tasks', JSON.stringify(getStorageArr));
    }

      // Add new el in tasks
    newTask(getText());
    
      // Clear value by press Button
    app.inputTxt.value = '';
  }
}

// Create new task & arg 'inputTxt' for inset value
function newTask(inputTxt) {

  // Create task & put value
  const el = document.createElement('li');
  el.className = 'item';
  el.textContent = inputTxt;

    // Create task remove Button
  const delEl = document.createElement('span');
  delEl.className = 'delete-item';
  delEl.textContent = 'X';
  el.appendChild(delEl);

    //Add Class & put task in list
  app.toDoList.className = 'add-list';
  app.toDoList.appendChild(el);
}

  // Add index for tasks
function addIndex() {
  const arrTask = document.querySelectorAll('.item');
  const count = document.createElement('div');
  count.className = 'num-item';

    // Add count
  arrTask.forEach((item, index) => {
    count.textContent = index + 1;
    item.appendChild(count);
  });
}

  // Delete task & index
function deleteTask(e){
  if (e.target.className == 'delete-item') {

      // Target to 'li' element to remove it
    e.target.parentElement.remove();

      // Remove value from LS (target count number)
    delValFromLocalStorage(e.target.nextSibling.textContent);
  }

    // Remove count
  const arrItem = document.querySelectorAll('ul li.item');
  arrItem.forEach((item, index) => {
    item.children[1].textContent = index + 1;
  })
}
  // Delete value from LS array
function delValFromLocalStorage(removeTask){

    // Get array from LS
  const loadArr = JSON.parse(localStorage.getItem('tasks'));

    // Looping for each el in arr
  loadArr.forEach((val, index) => {

      // Add +1 because (count the same way like "count")
    const num = index + 1;

      // Check count 'li' & index arr
    if (removeTask == num) {

        // Back index for arr & remove this value from arr 
      loadArr.splice((num - 1), 1);

        // Push back to LS
      localStorage.setItem('tasks', JSON.stringify(loadArr));
    }
  })
}

  // Creating DOM from Local Storage
function loadLocalStarage() {

    // Getting from LS value & parse this
  const laodArr = JSON.parse(localStorage.getItem('tasks'));

    // Creating for each value task
  laodArr.forEach((item) => {
    newTask(item);
    addIndex();
  })
}