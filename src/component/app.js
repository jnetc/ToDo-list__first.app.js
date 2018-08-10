class App {
  constructor(inputTxt, btnApp, bodyApp, toDoList) {
    this.inputTxt = document.querySelector('#new-task');
    this.btnApp = document.querySelector('#add-task');
    this.bodyApp = document.querySelector('#app');
    this.toDoList = document.querySelector('#list');
  }
}
export default App;

