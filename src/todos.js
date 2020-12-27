// utils
const getId = (value) => document.getElementById(value);
const getFocus = (target) => getId(target).focus();
const isBlank = (target) => getId(target).value.trim().length === 0;

const toJSON = (value) => JSON.parse(value);
const toStringify = (value) => JSON.stringify(value);

const getLocalStorage = (key) => localStorage.getItem(key);
const setLocalStorage = (types) => (key) => (value) => (localStorage.setItem(key, types(value)));

const getTodosStorage = toJSON(getLocalStorage('todos')) || [];
const setTodoStorage = setLocalStorage(toStringify)('todos');

(() => {
  // load Todos
  const loadTodos = () => {
    const initTodos = getTodosStorage;

    let todos = getId('todos').innerHTML;
    initTodos.map((todo) => todos += `<li>Title: ${todo.title} / Content: ${todo.content}</li>`);
    getId('todos').innerHTML = todos;
  }

  // add Todo
  const addTodo = () => {
    const title = 'title';
    const content = 'content';

    if (isBlank(title)) {
      return getFocus(title);
    }

    if (isBlank(content)) {
      return getFocus(content);
    }

    const newTodoTitle = getId(title);
    const newTodoContent = getId(content);

    let currentTodos = getId('todos').innerHTML;
    currentTodos += `<li>Title: ${newTodoTitle.value} / Content: ${newTodoContent.value}</li>`;
    getId('todos').innerHTML = currentTodos;

    setTodoStorage([...getTodosStorage,
    { title: newTodoTitle.value, content: newTodoContent.value }
    ]);

    newTodoTitle.value = '';
    newTodoContent.value = '';
  }

  // Initial Data
  loadTodos();

  const addTodoButton = getId('addTodo');
  addTodoButton.addEventListener('click', addTodo);
})();
