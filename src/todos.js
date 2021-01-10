// utils
const getId = (value) => document.getElementById(value);
const getClasses = (value) => document.getElementsByClassName(value);
const getSelector = (value) => document.querySelectorAll(value);

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
    // map과 forEach의 차이점: 반환값 (map: 반환값이 존재(undefined가 발생할 수 있음 - 리턴), forEach: 반환값이 없음(행동))
    // map에서 forEach로 변경
    initTodos.forEach((todo) => todos += `
      <li id=${todo.id}>
        <div class="viewPage">
          Title: ${todo.title} / Content: ${todo.content}
          <label>
          <input class="done" type="checkbox" ${todo.done && 'checked'} data-id="${todo.id}" />
          Complete
          </label>
          <button class="open" data-id="${todo.id}">Edit</button>
        </div>
        <div class="editPage hidden">
          <label for="title-${todo.id}">Title</label>
          <input type="text" id="title-${todo.id}" value="${todo.title}" />
          <label for="content-${todo.id}">Content</label>
          <input type="text" id="content-${todo.id}" value="${todo.content}" />
          <button class="edit" data-id="${todo.id}">Update</button>
          <button class="close" data-id="${todo.id}">Close</button>
        </div>
      </li>
    `);

    getId('todos').innerHTML = '';
    getId('todos').innerHTML = todos;

    const addTodoButton = getId('addTodo');
    addTodoButton.addEventListener('click', addTodo);

    const doneButton = document.querySelectorAll('.done');
    doneButton.forEach(done => done.addEventListener('click', () => completeTodo(done.getAttribute('data-id'))));

    const openEditButton = document.querySelectorAll('.open');
    openEditButton.forEach(done => done.addEventListener('click', () => openEdit(done.getAttribute('data-id'))));

    const closeEditButton = document.querySelectorAll('.close');
    closeEditButton.forEach(done => done.addEventListener('click', () => closeEdit(done.getAttribute('data-id'))));

    const editButton = document.querySelectorAll('.edit');
    editButton.forEach(done => done.addEventListener('click', () => updateTodo(done.getAttribute('data-id'))));
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

  // complete task
  const completeTodo = (id) => {
    const initTodos = toJSON(getLocalStorage('todos')) || [];
    setTodoStorage(
      initTodos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo)
    );

    loadTodos();
  }

  // open edit
  const openEdit = (id) => {
    getSelector('.viewPage').forEach(edit => edit.classList.remove('hidden'));
    getSelector('.editPage').forEach(edit => edit.classList.add('hidden'));

    getId(id).childNodes[1].classList.add('hidden');
    getId(id).childNodes[3].classList.remove('hidden');
  }

  const closeEdit = (id) => {
    getId(id).childNodes[1].classList.remove('hidden');
    getId(id).childNodes[3].classList.add('hidden');
  }

  // update task
  const updateTodo = (id) => {
    const title = `title-${id}`;
    const content = `content-${id}`;

    if (isBlank(title)) {
      return getFocus(title);
    }

    if (isBlank(content)) {
      return getFocus(content);
    }

    const titleId = getId(title);
    const contentId = getId(content);

    const initTodos = toJSON(getLocalStorage('todos')) || [];
    setTodoStorage(initTodos.map(todo => todo.id === id ? {
      ...todo,
      title: titleId.value,
      content: contentId.value,
    } : todo)
    );

    titleId.value = '';
    contentId.value = '';

    loadTodos();
  }

  // Initial Data
  loadTodos();
})();
