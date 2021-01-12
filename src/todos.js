// utils
const getId = (value) => document.getElementById(value);
const getClasses = (value) => document.getElementsByClassName(value);
const getSelectorAll = (value) => document.querySelectorAll(value);

const getFocus = (target) => getId(target).focus();
const isBlank = (target) => getId(target).value.trim().length === 0;

const toJSON = (value) => JSON.parse(value);
const toStringify = (value) => JSON.stringify(value);

const getLocalStorage = (key) => localStorage.getItem(key);
const setLocalStorage = (types) => (key) => (value) => (localStorage.setItem(key, types(value)));

const setTodoStorage = setLocalStorage(toStringify)('todos');

const eventAdd = (target) => (type) => (func) => (value) => {
  getSelectorAll(target).forEach(done => done.addEventListener(type, () => func(done.getAttribute(value))));
}
const eventAddWithCurry = (target) => (type) => (func) => (value) => {
  getSelectorAll(target).forEach(done => done.addEventListener(type, () => func(done.getAttribute(value))(done.value)));
}

(() => {
  // load Todos
  const loadTodos = () => {
    const initTodos = toJSON(getLocalStorage('todos')) || [];
    let todos = '';
    let deadlineNotice = '';
    // map과 forEach의 차이점: 반환값 (map: 반환값이 존재(undefined가 발생할 수 있음 - 리턴), forEach: 반환값이 없음(행동))
    // map에서 forEach로 변경
    const now = new Date().getTime();
    initTodos.forEach((todo) => {
      todos +=
        `
        <li id=${todo.id}>
          <div class="viewPage">
            <label for="priority-${todo.id}">Priority</label>
            <select class="priorityChange" id="priority-${todo.id}" data-id="${todo.id}">
              <option value="0" ${todo.priority === '0' && 'selected'}>기본</option>
              <option value="1" ${todo.priority === '1' && 'selected'}>높음</option>
              <option value="2" ${todo.priority === '2' && 'selected'}>보통</option>
              <option value="3" ${todo.priority === '3' && 'selected'}>낮음</option>
            </select>
            /
            <label for="deadline-${todo.id}">Deadline</label>
            <input class="deadline" type="date" id="deadline-${todo.id}" value="${todo.deadline || ''}" data-id="${todo.id}" />
            /
            Title: ${todo.title} / Content: ${todo.content}
            /
            <label>
            <input class="done" type="checkbox" ${todo.done && 'checked'} data-id="${todo.id}" />
            Complete
            </label>
            <button class="open" data-id="${todo.id}">Edit</button>
            <button class="delete" data-id="${todo.id}">Delete</button>
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
      `;

      if (todo.deadline && Date.parse(todo.deadline) < now) {
        const overDay = Math.ceil(new Date(now - Date.parse(todo.deadline)) / (1000 * 3600 * 24)) - 1;

        deadlineNotice +=
          `
        <li>
          마감일 알림 : ${overDay === 0 ? '당일' : overDay + '일 경과'} / ${todo.title}
        </li>
        `
      }
    });

    getId('todos').innerHTML = '';
    getId('todos').innerHTML = todos;

    getId('notice').innerHTML = '';
    getId('notice').innerHTML = deadlineNotice;

    const addTodoButton = getId('addTodo');
    addTodoButton.addEventListener('click', addTodo);

    // const doneButton = getSelectorAll('.done');
    // doneButton.forEach(done => done.addEventListener('click', () => completeTodo(done.getAttribute('data-id'))));
    eventAdd('.done')('click')(completeTodo)('data-id');

    // const openEditButton = getSelectorAll('.open');
    // openEditButton.forEach(done => done.addEventListener('click', () => openEdit(done.getAttribute('data-id'))));
    eventAdd('.open')('click')(openEdit)('data-id');

    // const closeEditButton = getSelectorAll('.close');
    // closeEditButton.forEach(done => done.addEventListener('click', () => closeEdit(done.getAttribute('data-id'))));
    eventAdd('.close')('click')(closeEdit)('data-id');

    // const editButton = getSelectorAll('.edit');
    // editButton.forEach(done => done.addEventListener('click', () => updateTodo(done.getAttribute('data-id'))));
    eventAdd('.edit')('click')(updateTodo)('data-id');

    // const deleteButton = getSelectorAll('.delete');
    // deleteButton.forEach(done => done.addEventListener('click', () => deleteTodo(done.getAttribute('data-id'))));
    eventAdd('.delete')('click')(deleteTodo)('data-id');

    // const priorityChange = getSelectorAll('.priorityChange');
    // priorityChange.forEach(done => done.addEventListener('change', () => priorityChangeTodo(done.getAttribute('data-id'))(done.value)));
    eventAddWithCurry('.priorityChange')('change')(priorityChangeTodo)('data-id');

    // const deadlineChange = getSelectorAll('.deadline');
    // deadlineChange.forEach(done => done.addEventListener('change', () => deadlineChangeTodo(done.getAttribute('data-id'))(done.value)));
    eventAddWithCurry('.deadline')('change')(deadlineChangeTodo)('data-id');

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
    const priorityId = getId('priority');
    const deadlineId = getId('deadline');

    const initTodos = toJSON(getLocalStorage('todos')) || [];
    setTodoStorage([...initTodos,
    {
      id: new Date().toISOString(),
      title: titleId.value,
      content: contentId.value,
      done: false,
      priority: priorityId.value,
      deadline: deadlineId.value,
    }
    ]);

    titleId.value = '';
    contentId.value = '';
    priorityId.value = '0';
    deadlineId.value = '';

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
    getSelectorAll('.viewPage').forEach(edit => edit.classList.remove('hidden'));
    getSelectorAll('.editPage').forEach(edit => edit.classList.add('hidden'));

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

  // delete task
  const deleteTodo = (id) => {
    if (!confirm('Are you sure to delete?')) {
      return false;
    }

    const initTodos = toJSON(getLocalStorage('todos')) || [];
    setTodoStorage(initTodos.filter(todo => todo.id !== id));

    loadTodos();
  }

  // priority change
  const priorityChangeTodo = (id) => (value) => {
    const initTodos = toJSON(getLocalStorage('todos')) || [];
    setTodoStorage(
      initTodos.map((todo) => todo.id === id ? { ...todo, priority: value } : todo)
    );

    loadTodos();
  }

  // deadline change
  const deadlineChangeTodo = (id) => (value) => {
    const initTodos = toJSON(getLocalStorage('todos')) || [];
    setTodoStorage(
      initTodos.map((todo) => todo.id === id ? { ...todo, deadline: value } : todo)
    );

    loadTodos();
  }

  // Initial Data
  loadTodos();
})();
