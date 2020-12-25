const getId = (value) => document.getElementById(value);

const isBlank = (target) => getId(target).value.trim().length === 0;
const getFocus = (target) => getId(target).focus();

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

  newTodoTitle.value = '';
  newTodoContent.value = '';
}

const addTodoButton = getId('addTodo');
addTodoButton.addEventListener('click', addTodo);
