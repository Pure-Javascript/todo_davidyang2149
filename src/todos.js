// utils
const getId = (value) => document.getElementById(value);
const getFocus = (target) => getId(target).focus();
const isBlank = (target) => getId(target).value.trim().length === 0;

const toJSON = (value) => JSON.parse(value);
const toStringify = (value) => JSON.stringify(value);

const getLocalStorage = (key) => localStorage.getItem(key);
const setLocalStorage = (types) => (key) => (value) => (localStorage.setItem(key, types(value)));

const setTodoStorage = setLocalStorage(toStringify)('todos');

(() => {
  // load Todos
  const loadTodos = () => {
    const initTodos = toJSON(getLocalStorage('todos')) || [];
    let todos = '';
    initTodos.map((todo) => todos += `
      <li id=${todo.id}>
        Title: ${todo.title} / Content: ${todo.content}
        <label>
          <input type="checkbox" ${todo.done && 'checked'}/>
          Complete
        </label>
      </li>
    `);

    getId('todos').innerHTML = '';
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

    const titleId = getId(title);
    const contentId = getId(content);

    const initTodos = toJSON(getLocalStorage('todos')) || [];

    setTodoStorage([...initTodos,
    {
      id: new Date().toISOString(),
      title: titleId.value,
      content: contentId.value,
      done: false,
    }
    ]);

    titleId.value = '';
    contentId.value = '';

    loadTodos();
  }

  // Initial Data
  loadTodos();

  const addTodoButton = getId('addTodo');
  addTodoButton.addEventListener('click', addTodo);
})();
