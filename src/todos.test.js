
describe('Todos', () => {
  test('Check addTodo able add todo to todoList', () => {
    document.body.innerHTML = `
    <input id="newTodo" />
    <button id="addTodo">Add todo</button>
    <ol id="todoList"></ol>
    `;

    const newTodo = document.getElementById('newTodo');
    const addTodo = document.getElementById('addTodo');
    const todolist = document.getElementById('todoList');

    require('./todos.js');

    newTodo.value = 'New todolist!';
    addTodo.click();

    expect(todolist.innerHTML).toBe('<li>New todolist!</li>');
  });

});
