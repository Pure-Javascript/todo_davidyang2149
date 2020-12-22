const getId = (value) => document.getElementById(value);

const addTodo = () => {
  const newTodoTitle = getId('title');
  const newTodoContent = getId('content');

  let currentTodos = getId('todos').innerHTML;
  currentTodos += `<li>Title: ${newTodoTitle.value} / Content: ${newTodoContent.value}</li>`;
  getId('todos').innerHTML = currentTodos;

  newTodoTitle.value = '';
  newTodoContent.value = '';
}

const addTodoButton = getId('addTodo');
addTodoButton.addEventListener('click', addTodo);
