const addTodo = () => {
  const newTodoTitle = document.getElementById('title');
  const newTodoContent = document.getElementById('content');

  let currentTodos = document.getElementById('todos').innerHTML;
  currentTodos += `<li>Title: ${newTodoTitle.value} / Content: ${newTodoContent.value}</li>`;
  document.getElementById('todos').innerHTML = currentTodos;

  newTodoTitle.value = '';
  newTodoContent.value = '';
}

const addTodoButton = document.getElementById('addTodo');
addTodoButton.addEventListener('click', addTodo);
